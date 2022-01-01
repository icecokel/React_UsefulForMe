import { fetchData, insertDoc, insertData, insertBatch } from "./firebase";

const FirebaseService = {
  fetchMemo: async () => {
    return await fetchData("memo");
  },

  saveMemo: async (param: any, collectionName?: string) => {
    if (collectionName) {
      await insertData("memo", collectionName, param);
    } else {
      await insertDoc("memo", param);
    }
  },

  test: async (texts: Array<string>) => {
    await insertBatch("memo", texts);
  },
};

export default FirebaseService;
