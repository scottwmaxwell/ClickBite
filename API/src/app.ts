import express, {Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const app = express();

app.get('/', (req: Request, res: Response)=>{
    res.send('Hellooo!');
});

app.listen(port, ()=>{
    console.log("Running in " + process.env.ENV + " mode")
    console.log('Listening on http://localhost:' + port)
});