import executeMongoDBOperation from '../services/mongodb.conntector';
import { Request, RequestHandler, Response} from 'express';
const {ObjectId } = require('mongodb');

export const getReviews: RequestHandler = async(req: Request, res: Response)=>{

    try{
        let reviews;
        let reviewId = req.query.id;

        if(reviewId){
            try{
                reviews = await executeMongoDBOperation('reviews', 'find',{ _id: new ObjectId(reviewId) })
            }catch(e){
                console.log(e)
                res.status(200).json(
                    ["Invalid Id"]
                )
            }
            ;
        }else{
            reviews = await executeMongoDBOperation('reviews', 'find',{});
        }
       
        res.status(200).json(
            reviews
        );

    }catch(e){
        console.log(e)
    }   
}

export const getReviewsByUsername: RequestHandler = async(req: Request, res: Response)=>{

    try{
        let reviews;
        let username = req.params.username;
        reviews = await executeMongoDBOperation('reviews', 'find', {username: username});
        res.status(200).json(
            reviews
        );

    }catch(e){
        console.log(e)
    }   
}

export const getReviewsByUserId: RequestHandler = async(req: Request, res: Response)=>{

    try{
        let reviews;
        let userId = req.params.userId;
        reviews = await executeMongoDBOperation('reviews', 'find', {"userId": userId});
        res.status(200).json(
            reviews
        );

    }catch(e){
        console.log(e)
    }   
}

export const createReview: RequestHandler = async(req: Request, res: Response)=>{

    try{
        let reviews;
        
        let result = await executeMongoDBOperation('reviews', 'insert', req.body);
        console.log(result)

    }catch(e){
        console.log(e)
    }   
}

export const deleteReview: RequestHandler = async(req: Request, res: Response)=>{

    try{
        let reviewId = req.params.id
        let result = await executeMongoDBOperation('reviews', 'delete', { _id: new ObjectId(reviewId) });
        console.log(result)

    }catch(e){
        console.log(e)
    }   
}
