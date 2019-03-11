import { ObjectID, MongoClient, Server } from 'mongodb';
import config from '../src/config/config';
import { RegisterController } from '../src/controllers/register.controller';
import { UserDocument } from '../src/models/user.model';

const admin_role_id = new ObjectID();
const date = new Date();

const datas = [
  {
    "table": "roles",
    "datas": [
      {
        "_id": admin_role_id,
        "name": "admin",
        "paths": []
      },
      {
        "name": "user",
        "paths": []
      }
    ],
    "index": "name"
  },
  {
    "table": "users",
    "datas": [
      RegisterController.setPassword(<UserDocument>{
        "_id_role": admin_role_id,
        "lang": "en",
        "recoveryCode": "",
        "active": true,
        "email": "admin@admin.com",
        "password": "12345678",
        "lastname": "hemaidia",
        "firstname": "hatim",
        "birthdate": new Date("1993-11-24T00:00:00.000Z"),
        "username": "actarus",
        "createdAt": date,
        "updatedAt": date
      })
    ],
    "index": "email"
  }
];

async function add() {
  try {
    const client = await MongoClient.connect(config.db.mongodb, { useNewUrlParser: true });
    const db = client.db();
    for (let i = 0; i < datas.length; i++) {
      const el = datas[i];

      for (let x = 0; x < el.datas.length; x++) {
        const data = el.datas[x];
        const check = {};
        check[el.index] = data[el.index];
        await db.collection(el.table).update(
          check,
          {
            $setOnInsert: data
          },
          { upsert: true });
      }
    }
    process.exit();
  } catch (error) {
    console.log(error);
  }
}

add();