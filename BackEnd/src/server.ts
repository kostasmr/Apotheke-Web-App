import express from "express";
import cors from "cors";
import { sample_products, sample_users } from "./data";
import jwt from "jsonwebtoken"

const app = express();
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.get("/api/products", (rew,res) => {
    res.send(sample_products);
});

app.get("/api/products/search/:searchTerm", (req, res) =>{
    const searchTerm = req.params.searchTerm;
    const products = sample_products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(products)
});

app.get("/api/products/:productId", (req, res) =>{
    const productId = req.params.productId;
    const product = sample_products.find(product => product.id == productId);
    res.send(product)
});

app.post("/api/users/login", (req, res) => {
    const {email, password} = req.body;
    const user = sample_users.find( user => user.email === email &&
        user.password === password);

        if(user){
            res.send(generateTokenResponse(user));
        }
        else{
            res.status(400).send("User name or password is not valid!");
        }
});

const generateTokenResponse = (user:any) => { 
    const token = jwt.sign({
        email:user.email, isAdmin:user.isAdmin
    }, "SomeRandomText", {
        expiresIn: "30d"
    });
    user.token = token;
    return user;
}

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
});