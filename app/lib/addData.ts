import { getDatabase, push, ref, set, update } from "firebase/database";
import { app } from "./firebase";

const db = getDatabase(app);
//@ts-ignore
export default async function addData(colllection, userId, data) {
  let result = null;
  let error = null;

  try {
    result = await set(ref(db, "users/" + userId), data);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
//@ts-ignore
export async function addData2(colllection, userId, data) {
  let result = null;
  let error = null;

  try {
    result = await push(ref(db, "comments/" + userId), data);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
