import { firebaseDB } from './firebase';
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
} from 'firebase/firestore';
import { compareAsc, parseISO } from 'date-fns';

export const createUser = async (user) => {
  try {
    const docRef = doc(firebaseDB, 'users', user.id);
    await setDoc(docRef, { ...user, createdAt: new Date().toISOString() }, { merge: true });
  } catch (error) {
    console.log(error);
  }
};

export const createFolder = async (folder) => {
  try {
    await addDoc(collection(firebaseDB, 'folders'), {
      ...folder,
      createdAt: new Date().toUTCString(),
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFolder = async (folder) => {
  try {
    await deleteDoc(doc(firebaseDB, 'folders', folder.id));
  } catch (error) {
    console.log(error);
  }
};

export const updateFolder = async (folder) => {
  try {
    await updateDoc(doc(firebaseDB, 'folders', folder.id), {
      name: folder.name,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFolders = async (userId) => {
  try {
    const data = query(collection(firebaseDB, 'folders'), where('userId', '==', userId));
    const querySnapshot = await getDocs(data);
    const result = querySnapshot.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .sort((a, b) => compareAsc(parseISO(a.createdAt), parseISO(b.createdAt)));
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getNotes = async (folderId) => {
  try {
    const data = query(collection(firebaseDB, 'notes'), where('folderId', '==', folderId));
    const querySnapshot = await getDocs(data);
    const result = querySnapshot.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .sort((a, b) => compareAsc(parseISO(a.createdAt), parseISO(b.createdAt)));
    return result;
  } catch (error) {
    throw error;
  }
};

export const getNote = async (noteId) => {
  try {
    const docRef = doc(firebaseDB, 'notes', noteId);
    const result = await getDoc(docRef);
    if (result.data()) {
      return { ...result.data(), id: result.id };
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const saveNote = async (note, noteId) => {
  let _noteId = noteId;
  try {
    if (_noteId) {
      await setDoc(doc(firebaseDB, 'notes', _noteId), {
        ...note,
        updatedAt: new Date().toISOString(),
      });
    } else {
      const docRef = await addDoc(collection(firebaseDB, 'notes'), {
        ...note,
        createdAt: new Date().toISOString(),
      });
      _noteId = docRef.id;
    }
    return _noteId;
  } catch (error) {
    console.log(error);
  }
};

export const deleteNote = async (noteId) => {
  try {
    await deleteDoc(doc(firebaseDB, 'notes', noteId));
  } catch (error) {
    console.log(error);
  }
};
