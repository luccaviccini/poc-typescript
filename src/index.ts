import express, {Request, Response, json} from 'express';
import {config} from 'dotenv';
import tasksRoutes from './routes/tasks.routes.js';


config();

const app = express();
app.use(json());

app.use(tasksRoutes);






app.get('/health', (req: Request , res: Response) => {
  res.send('Everything is fine, you are doing great!');
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

