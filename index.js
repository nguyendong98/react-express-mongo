require('dotenv').config(); // --------> require package xử lí biến môi trường
//----------------require các module đã cài đặt trong package.json---------------------------
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose');
//--------------------------------------------------------------------------------------------
const app = express();
const port = process.env.PORT || 5000; //------> cổng kết nối 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());   //------> body-parser(package để post dữ liệu nhập từ bàn phím lên server)

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URL;

mongoose.connect(uri, {     
    useNewUrlParser: true,   
    useCreateIndex: true, 
    useUnifiedTopology: true})
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
}) // ------------> connect mongodb 
// --------- required route -------------------------------------------
var productRoute = require('./routes/Product.route');

// app.use('/exercise', exerciseRoute);
app.use('/product', productRoute);



app.get('/', (req, res, next) => {
    res.send('Đây là trang chủ');
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  
  }

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})