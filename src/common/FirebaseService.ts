import {
  fetchData,
  insertDoc,
  insertData,
  setBatch,
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
    await deleteData("memo", collectionName);
  },

  batchSetMemo: async (memos: Array<string>) => {
    await setBatch("memo", memos);
  },

  batchDeleteMemo: async (texts: Array<string>) => {
    // await insertBatch("memo", texts);
  },
};

export default FirebaseService;
