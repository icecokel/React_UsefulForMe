import {
  fetchData,
  insertDoc,
  insertData,
  insertBatch,
  deleteData,
} from "./firebase";

const FirebaseService = {
  fetchMemo: async () => {
    return await fetchData("memo");
  },

  setMemo: async (param: any, collectionName?: string) => {
    if (collectionName) {
      await insertData("memo", collectionName, param);
    } else {
      await insertDoc("memo", param);
    }
  },

  deleteMemo: async (collectionName: string) => {
    deleteData("memo", collectionName);
  },

  test: async (texts: Array<string>) => {
    await insertBatch("memo", texts);
  },
};

export default FirebaseService;
