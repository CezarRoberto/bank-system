import 'reflect-metadata';
import 'dotenv/config';
import { app } from './app';

app.listen(4000, () => {
    console.log('Servidor is running!');
});