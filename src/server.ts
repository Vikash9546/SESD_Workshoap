import { App } from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = parseInt(process.env.PORT || '5000', 10);
const app = new App(port);

app.listen();
