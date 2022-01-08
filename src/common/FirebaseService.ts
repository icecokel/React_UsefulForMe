import {
  fetchData,
  insertDoc,
  insertData,
  setBatch,
  deleteData,
} from "./firebase";

const FirebaseService = {
  fetchTodoList: async () => {
    return await fetchData("memo");
  },

  setTodo: async (param: any, collectionName?: string) => {
    if (collectionName) {
      await insertData("memo", collectionName, param);
    } else {
      await insertDoc("memo", param);
    }
  },

  deleteTodo: async (collectionName: string) => {
    await deleteData("memo", collectionName);
  },

  batchSetTodo: async (memos: Array<string>) => {
    await setBatch("memo", memos);
  },

  batchDeleteTodo: async (texts: Array<string>) => {
    // await insertBatch("memo", texts);
  },
};

export default FirebaseService;
