const express = require('express'); 
const app = express();
const cors = require('cors');
const connectDB = require('./db/connect');
require('dotenv').config();

app.use(cors());    
app.use(express.json());

const mainRoutes = require('./Routes/main'); 

app.use('/api/v1', mainRoutes);


const port = process.env.PORT || 5000;  
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('Database connected');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();