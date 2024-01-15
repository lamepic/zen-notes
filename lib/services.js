import { firebaseDB } from "./firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { compareAsc, parseISO } from "date-fns";

export const createUser = async (user) => {
  try {
    const docRef = doc(firebaseDB, "users", user.id);
    await setDoc(
      docRef,
      { ...user, createdAt: new Date().toISOString() },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
};

export const createFolder = async (folder) => {
  try {
    await addDoc(collection(firebaseDB, "folders"), {
      ...folder,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFolder = async (folder) => {
  try {
    await deleteDoc(doc(firebaseDB, "folders", folder.id));
  } catch (error) {
    console.log(error);
  }
};

export const getFolders = async (userId) => {
  try {
    const data = query(
      collection(firebaseDB, "folders"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(data);
    const result = querySnapshot.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .sort((a, b) => compareAsc(parseISO(a.createdAt), parseISO(b.createdAt)));
    return result;
  } catch (error) {
    console.log(error);
  }
};
