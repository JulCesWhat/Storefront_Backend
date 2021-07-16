import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import productRoutes from './handlers/product';
import userRoutes from './handlers/user'

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(bodyParser.json());

app.get('/', function (_req: Request, res: Response) {
    res.send('Hello World!')
});

productRoutes(app);
userRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});