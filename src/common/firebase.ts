import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
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
    result.push(doc.data());
    // console.log(`${doc.id} => ${doc.data()}`);
  });

  return result;
};

const searchData = async (docName: string, keyword: string) => {
  const docRef = doc(db, docName, keyword);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
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
  const docRef = await addDoc(collection(db, docName), params);

  console.log(docRef);
};

export { fetchData, searchData, insertData, insertDoc };
