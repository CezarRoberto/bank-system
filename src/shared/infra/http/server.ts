
import 'dotenv/config';
import { app } from './app';

app.listen(process.env.PORT || 4000, () => {
    console.log('Servidor is running!');
});