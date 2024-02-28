import executeMongoDBOperation from '../services/mongodb.conntector';
import { Request, RequestHandler, Response} from 'express';

export const getBites: RequestHandler = async(req: Request, res: Response)=>{

    try{
        let bites;

        bites = await executeMongoDBOperation('bites', 'find',{});
        res.status(200).json(
            bites
        );

    }catch(e){
        console.log(e)
    }   
}

export const getBitesById: RequestHandler = async(req: Request, res: Response)=>{

    try{
        let bites;

        bites = await executeMongoDBOperation('bites', 'find',{});
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
        
        let result = await executeMongoDBOperation('bites', 'insert', req.body);
        console.log(result)

    }catch(e){
        console.log(e)
    }   
}

// Insert
