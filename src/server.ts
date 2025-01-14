import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import paymentRoutes from './api/process-payment';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api', paymentRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});