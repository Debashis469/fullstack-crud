import express from "express";
const app = express() ;
const PORT = 5000 ;

app.get("/" , (req,res) => {
    res.send("App is running") ;
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})