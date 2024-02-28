import { MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const uri = "mongodb+srv://clickbiteadmin:"+ process.env.PASS +"@cluster0.byarc1e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const executeMongoDBOperation = async (collectionName:string, operation:string, data:any) =>{

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
            // Add more cases for other operations as needed
            default:
              throw new Error('Invalid operation specified');
          }
    }finally{
        await client.close()
    }
}

export default executeMongoDBOperation;