import executeMongoDBOperation from '../services/mongodb.conntector';
import { Request, RequestHandler, Response} from 'express';
const {ObjectId } = require('mongodb');

export const getBites: RequestHandler = async(req: Request, res: Response)=>{

    try{
        let bites;
        let biteId = req.query.id;

        if(biteId){
            try{
                bites = await executeMongoDBOperation('bites', 'find',{ _id: new ObjectId(biteId) })
            }catch(e){
                console.log(e)
                res.status(200).json(
                    ["Invalid Id"]
                )
            }
            ;
        }else{
            bites = await executeMongoDBOperation('bites', 'find',{});
        }
       
        res.status(200).json(
            bites
        );

    }catch(e){
        console.log(e)
    }   
}

export const getBitesByUsername: RequestHandler = async(req: Request, res: Response)=>{

    try{
        let bites;
        let username = req.params.username;
        bites = await executeMongoDBOperation('bites', 'find', {username: username});
        res.status(200).json(
            bites
        );

    }catch(e){
        console.log(e)
    }   
}

export const createBite: RequestHandler = async(req: Request, res: Response)=>{

    try{
        let bites;
        
        let result = await executeMongoDBOperation('bites', 'insert', req.body, null);
        console.log(result)

    }catch(e){
        console.log(e)
    }   
}

export const updateBite: RequestHandler = async(req: Request, res: Response)=>{

    try{
        let biteId = req.params.id
        let result = await executeMongoDBOperation('bites', 'update', req.body, { _id: new ObjectId(biteId) }, );
        console.log(result)

    }catch(e){
        console.log(e)
    }   
}

export const deleteBite: RequestHandler = async(req: Request, res: Response)=>{

    try{
        let biteId = req.params.id
        let result = await executeMongoDBOperation('bites', 'delete', { _id: new ObjectId(biteId) });
        console.log(result)

    }catch(e){
        console.log(e)
    }   
}
