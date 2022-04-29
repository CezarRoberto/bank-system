import 'dotenv/config';
import 'reflect-metadata';
import { app } from './app';

app.listen(4000, () => {
    console.log('Servidor is running!');
});