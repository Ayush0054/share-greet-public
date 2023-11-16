import { getDatabase, ref, onValue, child, get } from "firebase/database";
import { app } from "./firebase";

const db = getDatabase(app);
export default async function getData(collection: any, userId: any) {
  const dbRef = ref(getDatabase());
  var data;
  get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        data = snapshot.val();
        console.log(data);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
}
