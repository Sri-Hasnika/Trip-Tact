const exp=require('express')
const app=exp()
const userApp=require('../../backend-mongoose-demo/Apis/userApi');
const productApp=require('../../backend-mongoose-demo/Apis/productApi');
const mongoose=require('mongoose');
app.use('/user-api',userApp);
app.use('/product-api',productApp);

//DB connection
mongoose.connect('mongodb://localhost:27017/test-vnr')
.then(()=>{
    console.log('DB connection success')
    //port number
app.listen(3000,()=>console.log("server on post 3000..."));
})
.catch((err)=>console.log("err in DB connection", err))
