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
  updateDoc,
  getDoc,
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

export const updateFolder = async (folder) => {
  try {
    await updateDoc(doc(firebaseDB, "folders", folder.id), {
      name: folder.name,
    });
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

export const getNotes = async (folder) => {
  try {
    const data = query(
      collection(firebaseDB, "notes"),
      where("folderId", "==", folder.id)
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

export const getNote = async (note) => {
  try {
    const docRef = doc(firebaseDB, "notes", note.id);
    const result = await getDoc(docRef);
    return { ...result.data(), id: result.id };
  } catch (error) {
    console.log(error);
  }
};

export const saveNote = async (note, id) => {
  try {
    if (id) {
      await setDoc(doc(firebaseDB, "notes", id), {
        ...note,
        updatedAt: new Date().toISOString(),
      });
    } else {
      await addDoc(collection(firebaseDB, "notes"), {
        ...note,
        createdAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.log(error);
  }
};
