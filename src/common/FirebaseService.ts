import { fetchData, insertData } from "./firebase";

const FirebaseService = {
  fetchMemo: async () => {
    return await fetchData("memo");
  },

  saveMemo: async (text: string) => {
    const params = { text: text };

    return await insertData("memo", params);
  },
};

export default FirebaseService;
