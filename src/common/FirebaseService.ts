import { fetchData, insertData } from "./firebase";

const FirebaseService = {
  fetchMemo: async () => {
    return await fetchData("memo");
  },

  saveMemo: async (params: any) => {
    return await insertData("memo", params);
  },
};

export default FirebaseService;
