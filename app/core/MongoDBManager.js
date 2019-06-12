const DATASTORE = require('react-native-local-mongodb')
const DATABASE_FILE_NAME = "TodoApp_Database_File_Name";
const DATABASE_ID_NAME = "TodoList"

export default class MongoDBManager {
  static instance = undefined

  static getInstance(): MongoDBManager {
    if (this.instance == undefined) {
      this.instance = new MongoDBManager()
    }

    return this.instance;
  }

  database: DATASTORE = undefined;

  constructor() {
    this.database = new DATASTORE({ filename: DATABASE_FILE_NAME, autoload: true });
  }

  updateList(list: Array) {
    this.database.update(
      { name: DATABASE_ID_NAME },
      { $set: { data: list }}
    )
  }

  insertList(list: Array) {
    this.database.insert({
      name: DATABASE_ID_NAME,
      data: list
    });
  }

  saveList(list: Array) {
    this.getList().then(docs => {
      if (Array.isArray(docs) && docs.length > 0) {
        this.updateList(list);
      }
      else {
        this.insertList(list);
      }
    }).catch(_ => {
      this.insertList(list);
    });
  }

  getList(): Promise {
    return new Promise((resolve, rejects) => {
      this.database.find({name: DATABASE_ID_NAME}, (error, docs) => {
        if (error) {
          rejects(error);
        }
        else {
          resolve(docs);
        }
      });
    });
  }
}