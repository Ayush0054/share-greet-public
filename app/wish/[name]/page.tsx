"use client";
import getData from "@/app/lib/getData";
import React, { FormEvent, use, useEffect, useState } from "react";
import { getDatabase, ref, onValue, child, get } from "firebase/database";
import { app } from "@/app/lib/firebase";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image,
  Link,
  ScrollShadow,
  Textarea,
} from "@nextui-org/react";
import { User } from "@/app/types/types";
import addData, { addData2 } from "@/app/lib/addData";
// import { app } from "./firebase";
interface Params {
  params: { name: string };
}
interface CommentProps {
  comments: any;
  setComments: any;
}
const db = getDatabase(app);
function Page({ params }: Params) {
  const [comment, setComment] = useState("");
  const [data, setData] = useState<User>();
  const [comments, setComments] = useState();
  const getPosts = async () => {
    // const ndata = await getData("users", params.name);
    const dbRef = ref(getDatabase(app));

    get(child(dbRef, `users/${params.name}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getComments = async () => {
    const dbRef = ref(getDatabase(app));
    const database = getDatabase();
    const commentRef = ref(database, "comments/" + params.name);

    onValue(commentRef, (snapshot) => {
      const data = snapshot.val();
      setComments(data);
      if (!!data) {
      } else {
        console.log("Data not found");
      }
    });
  };

  useEffect(() => {
    getPosts();
    getComments();
  }, []);
  const db = getDatabase();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const newComment = {
      comment: comment,
      time: Date.now(),
    };
    if (newComment.comment.replaceAll(" ", "") === "") {
      alert("empty comment");
      return;
    }
    const ndata = { comments: newComment };

    const name = params.name;

    const { result, error } = await addData2(
      "comments",
      name.replace(/\s/g, ""),
      ndata
    );
    setComment("");
    if (error) {
      console.log(error);
    }
  };
  return (
    <Card className=" p-5 m-3 md:w-[700px]  ">
      <h1 className=" text-xl md:text-3xl font-bold text-center">
        {data?.wish}
      </h1>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center gap-5">
        <div className=" flex justify-center gap-10 items-center">
          <h1 className=" text-md md:text-xl font-semibold">{data?.name}</h1>
          <Link
            isExternal
            className="  text-md md:text-xl font-semibold"
            href={data?.social}
          >
            social
          </Link>
        </div>
        <h1 className="  text-md md:text-xl font-semibold">
          {data?.wishDetail}
        </h1>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex flex-row justify-center  ">
        <Image
          alt="image"
          className="object-cover rounded-xl flex justify-center  max-h-[200px] md:max-h-[300px] "
          src={data?.image}
        />
      </CardBody>
      {/* <Accordion>
        <AccordionItem key="1" aria-label="comments" title="comments"> */}
      <ScrollShadow
        hideScrollBar
        className="  p-5 bg-slate-50 md:h-[240px] max-h-[100px] md:max-h-[240px] "
      >
        <ul className=" grid gap-2">
          {comments &&
            Object.keys(comments).map((key) => (
              <li key={key}>
                <h1 className=" flex gap-2">
                  <Chip></Chip>
                  {
                    //@ts-ignore
                    comments[key].comments.comment
                  }
                </h1>
              </li>
            ))}
        </ul>
      </ScrollShadow>
      {/* </AccordionItem>
      </Accordion> */}
      <CardBody className="grid  gap-2 ">
        <Textarea
          placeholder="Comment here"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button onClick={handleSubmit}>comment</Button>
      </CardBody>
    </Card>
  );
}

export default Page;
