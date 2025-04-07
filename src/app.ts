import express from 'express';
import cors from 'cors';
import livroRoutes from './routes/livroRoutes';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json'; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', livroRoutes);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;

