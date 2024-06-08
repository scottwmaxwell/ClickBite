import { MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

if(process.env.ENV == 'production'){
  const uri = "mongodb+srv://clickbiteadmin:"+ process.env.PASS +"@cluster0.byarc1e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
}else{
  const uri = process.env.LOCALDB
}


const client = new MongoClient('mongodb://localhost:27017', {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const executeMongoDBOperation = async (collectionName:string, operation:string, data:any, id?:any) =>{

    await client.connect();
    const database = client.db('ClickBite');
    const collection = database.collection(collectionName);

    try{
        switch (operation) {
            case 'find':
              return await collection.find(data).toArray();
            case 'insert':
              await collection.insertOne(data);
              return 'Insert successful';
            case 'update':
              await collection.updateOne(data, data);
              return 'Update successful';
            case 'delete':
              await collection.deleteOne(data);
              return 'Delete successful'
            default:
              console.log(operation)
              throw new Error('Invalid operation specified');
          }
    }finally{
        await client.close()
    }
}

export default executeMongoDBOperation;