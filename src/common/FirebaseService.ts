import { fetchData, searchData } from "./firebase";

const FirebaseService = {
  fetchMemo: async () => {
    return await fetchData("memo");
  },
};

export default FirebaseService;
