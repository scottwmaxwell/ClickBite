import executeMongoDBOperation from '../services/mongodb.conntector';
import { Request, RequestHandler, Response} from 'express';
const {ObjectId } = require('mongodb');

export const getUsers: RequestHandler = async(req: Request, res: Response)=>{

    try{
        let users;
        let userId = req.query.id;

        if(userId){
            try{
                users = await executeMongoDBOperation('users', 'find',{ _id: new ObjectId(userId) })
            }catch(e){
                console.log(e)
                res.status(200).json(
                    ["Invalid Id"]
                )
            }
            ;
        }else{
            users = await executeMongoDBOperation('users', 'find',{});
        }
       
        res.status(200).json(
            users
        );

    }catch(e){
        console.log(e)
    }   
}

export const getUsersByUsername: RequestHandler = async(req: Request, res: Response)=>{

    try{
        let users;
        let username = req.params.username;
        users = await executeMongoDBOperation('users', 'find', {username: username});
        res.status(200).json(
            users
        );

    }catch(e){
        console.log(e)
    }   
}

export const createUser: RequestHandler = async(req: Request, res: Response)=>{

    try{
        let users;
        
        let result = await executeMongoDBOperation('users', 'insert', req.body);
        console.log(result)

    }catch(e){
        console.log(e)
    }   
}

export const deleteUser: RequestHandler = async(req: Request, res: Response)=>{

    try{
        let userId = req.params.id
        let result = await executeMongoDBOperation('users', 'delete', { _id: new ObjectId(userId) });
        console.log(result)

    }catch(e){
        console.log(e)
    }   
}
