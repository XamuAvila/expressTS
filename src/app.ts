import express, { NextFunction, Request, Response } from "express";

const app = express();

app.use(express.json());
app.use(showPath);

function showPath(req:Request, res:Response, next:NextFunction){
    console.log(req.path);
    next()
}

app.get("/", (req, res) => {
    return res.send("Hello Express");
})

app.post("/api/product", (req, res) => {
    console.log(req.body);
    return res.send("Produto adicionado")
})

app.get("/api/interfaces", (req: Request, res: Response) => {
    return res.send("Utilizando interfaces")
})

app.get("/api/json", (req: Request, res: Response) => {
    return res.json({
        name: "Shirt",
        price: 30,
        sizes: ["M", "P", "G"]
    })
})

app.get("/api/product/:id", (req: Request, res: Response) => {
    console.log(req.params);
    res.send("Req received")
})

function getUser(req:Request, res: Response){
    console.log(req.params);
    return res.send("ok");
}

app.get("/api/user/:id", getUser)

app.get("/api/product/:id/review/:reviewId", (req: Request, res: Response) => {
    console.log(req.params);
    return res.send("ok");
})

function checkUser(req:Request, res:Response, next:NextFunction){
    console.log("middleware");
    next()
}

app.get("/api/user/:id/access", checkUser, (req:Request, res:Response)=>{
    return res.send("ok");
})

app.get("/api/user/:id/details/:name", (req:Request<{id:number, name:string}>, res:Response<{status:boolean}>)=>{
    console.log(`ID:  ${req.params.id}`)
    console.log(`name:  ${req.params.name}`)

    return res.json({
        status: true
    })
})


app.listen(3000, () => {
    console.log("Aplicação de TS rodando")
})
