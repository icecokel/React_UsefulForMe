import {
  fetchData,
  insertDoc,
  insertData,
  setBatch,
  deleteData,
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

  batchSetTodo: async (todos: Array<string>) => {
    await setBatch("todo", todos);
  },

  batchDeleteTodo: async (texts: Array<string>) => {
    // await insertBatch("memo", texts);
  },
};

export default FirebaseService;
