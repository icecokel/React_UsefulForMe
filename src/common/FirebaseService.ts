import { fetchData, insertDoc, insertData } from "./firebase";

const FirebaseService = {
  fetchMemo: async () => {
    return await fetchData("memo");
  },

  saveMemo: async (text: string, collectionName?: string) => {
    const params = { text: text };

    if (collectionName) {
      return await insertData("memo", collectionName, params);
    } else {
      return await insertDoc("memo", params);
    }
  },
};

export default FirebaseService;
