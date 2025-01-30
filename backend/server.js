import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productsRoutes from "./routes/product.route.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());// permite o uso do json no req.body

app.use("/api/products", productsRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Servidor ouvindo em http://localhost:" + PORT)
});

/*app.get("/", (req,res) => {
    res.send("Servidor esta pronto");
});*/

//8Om2hcOvPi3KqQ9S