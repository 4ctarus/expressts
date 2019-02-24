import { ObjectID, MongoClient, Server } from 'mongodb';

const admin_role_id = new ObjectID();

const datas = [
  {
    "table": "roles",
    "datas": [
      {
        "id": admin_role_id,
        "name": "admin",
        "paths": []
      }
    ]
  },
  /*{
    "table": "users",
    "datas": [
      {
        "name": "admin"
      }
    ]
  }*/
];

async function add() {
  try {
    const db = await MongoClient.connect("mongodb://localhost:27017/test");
  } catch (error) {
    
  }
} 