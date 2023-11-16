"use client";
import React, { FormEvent, useState } from "react";
import { Button, Card } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import addData from "../lib/addData";
import { useRouter } from "next/navigation";
import { randomUUID } from "crypto";
import getData from "../lib/getData";
function Landing() {
  const { push } = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    image: "",
    social: "",
    wish: "",
    wishDetail: "",
    comments: [],
  });
  const handleInputChange = (field: string, value: string): void => {
    setData((prevData) => {
      return { ...prevData, [field]: value };
    });
  };
  const handleSubmit = async (event: FormEvent) => {
    if (
      data.name.replaceAll(" ", "") === "" ||
      data.email.replaceAll(" ", "") === "" ||
      data.image.replaceAll(" ", "") === "" ||
      data.social.replaceAll(" ", "") === "" ||
      data.wish.replaceAll(" ", "") === "" ||
      data.wishDetail.replaceAll(" ", "") === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    const ndata = {
      name: data.name,
      image: data.image,
      email: data.email,
      social: data.social,
      wish: data.wish,
      wishDetail: data.wishDetail,
    };
    const name = data.name;

    const name2 =
      name.replace(/\s/g, "").toLowerCase() +
      Math.floor(Math.random() * 100000 + 1);
    console.log(name2);

    const { result, error } = await addData("users", name2, ndata);
    push(`/wish/${name2}`);
    if (error) {
      console.log(error);
    }
  };
  return (
    <Card
      className=" border-none bg-background/60 dark:bg-default-100/50  flex justify-center items-center m-5 bg  "
      isBlurred
    >
      <div className="md:m-24 m-5  md:gap-5 gap-3 grid w-3/4  ">
        <h1 className=" text-3xl text-center  ">Share-Greet</h1>
        <Input
          placeholder="Enter your name"
          value={data.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("name", e.target.value)
          }
        />
        <Input
          placeholder="Enter your email"
          value={data.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("email", e.target.value)
          }
        />
        <Input
          placeholder="Enter Image link"
          value={data.image}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("image", e.target.value)
          }
        />
        <Input
          placeholder="Enter social media link"
          value={data.social}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("social", e.target.value)
          }
        />
        <Input
          placeholder="Enter wish"
          value={data.wish}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("wish", e.target.value)
          }
        />
        <Textarea
          placeholder="Enter wish in detail"
          value={data.wishDetail}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("wishDetail", e.target.value)
          }
        />
        <Button onClick={handleSubmit}>Make Page -&gt; </Button>
      </div>
    </Card>
  );
}

export default Landing;
