import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import bitesRouter from './bites/bites.routes';
import reviewsRouter from './reviews/reviews.routes';
import usersRouter from './users/users.routes';

dotenv.config();

const port = process.env.PORT;
const app = express();


app.use(express.json());                        // Parse JSON bodies
app.use(express.urlencoded({ extended: true})); // Parse URL-Encoded bodies
app.use(cors());                                // allows cross-origin
app.use(helmet());    

// Set EJS as the view engine
app.set('view engine', 'ejs');


// Specify the directory where your views/templates are located
app.set('views', __dirname + '/views');

// Routers
app.use('/', [bitesRouter, reviewsRouter, usersRouter]);

app.get('/', (req: Request, res: Response)=>{
    res.render('index');
});

app.listen(port, ()=>{
    console.log("Running in " + process.env.ENV + " mode")
    console.log('Listening on http://localhost:' + port)
});