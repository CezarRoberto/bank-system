const PORT = process.env.PORT || 3000;
import 'dotenv/config';
import { app } from './app';

app.listen(PORT, () => {
    console.log('Servidor is running!');
});