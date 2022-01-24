import {
  fetchData,
  insertDoc,
  insertData,
  setBatch,
  deleteData,
  deleteBatch,
  searchData,
} from "./firebase";

const FirebaseService = {
  fetchTodoList: async () => {
    return await fetchData("todo");
  },

  batchSetTodo: async (todos: Array<any>) => {
    await setBatch("todo", todos);
  },

  batchDeleteTodo: async (todos: Array<any>) => {
    await deleteBatch("todo", todos);
  },

  fetchMemoList: async () => {
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

  fetchWordQuiz: async (keyword: string) => {
    return await searchData("wordQuiz", keyword);
  },
};

export default FirebaseService;
