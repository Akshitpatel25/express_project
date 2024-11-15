import express from "express";

const app = express();

const port = 7000;

// below, we are explisitly defining what the type of data we want.
app.use(express.json())

let teaData = [];
let nextID = 1;

// post is used to add 
app.post('/teas', (req,res)=> {
    /* 
    this req.body simple suggest what is inside {} in postman,
    so we can get name and price by req.body
    */
    const {name, price} = req.body
    const newtea = {
        id: nextID++,
        name,
        price
    }
    teaData.push(newtea)
    // this send will send newtea in json/ so we can see what we had added.
    res.status(200).send(newtea)
})

// get is used to list item
app.get('/teas', (req,res) => {
    res.status(201).send(teaData)
})

app.get("/teas/:id", (req,res) => {
    // below, "params" word is used to target request tab like http://local/tea/1
    const tea = teaData.find(f => f.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("tea not found")
    }
    res.status(200).send(tea)
})

// delete is used to delete an item from teaData array
app.delete('/teas/:id', (req,res) => {
    const index = teaData.filter((item)=> item.id === parseInt(req.params.id));

    teaData = teaData.filter((item)=> item.id !== index[0].id)
    res.status(200).send(teaData)
})

// put is used to update an item inside an arrray
app.put('/teas/:id', (req,res) =>{
    const index = teaData.filter((item)=> item.id === parseInt(req.params.id));
    // console.log(index);
    
    const {name, price} = req.body
    index[0].name = name;
    index[0].price = price;
    res.status(200).send(index)
})



app.listen(port, ()=> {
    console.log(`server is running at port ${port}...`);
})

// app.get('/', (req,res) => {
//     res.send("hello akshit great job!! keep it up")
// })
