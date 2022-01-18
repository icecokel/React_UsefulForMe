import {
  fetchData,
  insertDoc,
  insertData,
  setBatch,
  deleteData,
  deleteBatch,
} from "./firebase";

const FirebaseService = {
  fetchTodoList: async () => {
    return await fetchData("todo");
  },

  setTodo: async (param: any, collectionName?: string) => {
    if (collectionName) {
      await insertData("todo", collectionName, param);
    } else {
      await insertDoc("todo", param);
    }
  },

  deleteTodo: async (collectionName: string) => {
    await deleteData("todo", collectionName);
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
};

export default FirebaseService;
