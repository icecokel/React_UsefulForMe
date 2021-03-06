import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  writeBatch,
  deleteDoc,
} from "firebase/firestore/lite";

const {
  REACT_APP_FIREBASE_APP_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_APP_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

// 모든 문서 가져오기
const fetchData = async (docName: string) => {
  const querySnapshot = await getDocs(collection(db, docName));

  const result = [] as any;
  querySnapshot.forEach((doc) => {
    let temp = doc.data();
    temp.id = doc.id;
    result.push(temp);
    // console.log(`${doc.id} => ${doc.data()}`);
  });

  return result;
};

const searchData = async (docName: string, keyword: string) => {
  const docRef = doc(db, docName, keyword);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

const insertData = async (
  docName: string,
  collectionName: string,
  params: any
) => {
  await setDoc(doc(db, docName, collectionName), params);
};

const insertDoc = async (docName: string, params: any) => {
  await addDoc(collection(db, docName), params);
};

/**
 * @todo 첫번째 배치 작업은 실행가능 두번 째 배치 작업 때 실패함. 원인 분석 필요
 */
const setBatch = async (docName: string, paramList: Array<any>) => {
  // Get a new write batch
  const batch = writeBatch(db);
  paramList.forEach((param) => {
    const docRef = doc(db, docName, param.id);
    const params = { ...param };
    delete params.id;
    batch.set(docRef, params);
  });
  await batch.commit();
};

const deleteBatch = async (docName: string, paramList: Array<any>) => {
  // Get a new write batch
  const batch = writeBatch(db);

  paramList.forEach((param) => {
    const docRef = doc(db, docName, param.id);
    batch.delete(docRef);
  });
  await batch.commit();
};

const deleteData = async (docName: string, collectionName: string) => {
  await deleteDoc(doc(db, docName, collectionName));
};

export {
  fetchData,
  searchData,
  insertData,
  insertDoc,
  setBatch,
  deleteData,
  deleteBatch,
};
