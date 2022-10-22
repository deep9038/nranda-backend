require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');
const AccessControl = require('express-ip-access-control');

const app = express();

const PORT = process.env.port ||2000;

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(express.urlencoded({extended:true}));

app.use(cors());

app.use(express.static(path.join(__dirname,'public')));



// IP RESTRICTED SECTION


// var options = {
// 	mode: 'allow',
// 	denys: [""],
// 	allows: ["::ffff:192.168.29.234","192.168.29.97",'::ffff:192.168.138.47',"::ffff:127.0.0.1","::ffff:192.168.29.202","::ffff:192.168.16.201","::ffff:192.168.29.222"],
// 	forceConnectionAddress: false,
// 	log: function(clientIp, access) {
// 		console.log(clientIp + (access ? ' accessed.' : ' denied.'));
// 	},
// 	statusCode: 401,
// 	redirectTo: '',
// 	message: 'Unauthorized'
// };


// // Create middleware.
// var middleware = AccessControl(options);

// // Or directly load it into the app.
// app.use(AccessControl(options));

// // app.use((req,res,next)=>{
// //     if(req.socket.remoteAddress=='::ffff:192.168.29.234'){
// //         return res.send("Your Ip is not Allow")
// //     }
// //     console.log('zzzzz',req.socket.remoteAddress);
// //     next();
// // })

// // console.log(options);

// app.get('/',(req,res)=>{
//     res.send("Hello World")
// })



// 





//ITEM ROUTER REQUIRE
const addItemRoute = require('./src/Additem/Router/addItem_Route');
app.use('/api',addItemRoute);

//CATEGORY ROUTER REQUIRE
const addCategoryRoute = require('./src/Category/Router/category_Router');
app.use('/api',addCategoryRoute);

//CUSTOMER ROUTER REQUIRE
const addCustomerRoute = require('./src/Customer/Router/Customer_Router');
app.use('/api',addCustomerRoute);

//addToCardRoute ROUTER REQUIRE
const addToCardRoute = require('./src/AddToCard/Router/addToCard_Router');
app.use('/api',addToCardRoute);

//addOnItemRoute ROUTER REQUIRE
const addOnItemRoute = require('./src/AddOnItem/Router/addOnItem_Route');
app.use('/api',addOnItemRoute);


const DB_Pass =process.env.DBLINK
// console.log('DB_Pass',process.env.DBLINK);
// const dbDrive ='mongodb+srv://nayan:nayan123@cluster0.o2qoh.mongodb.net/PosSystem'
mongoose.connect(DB_Pass,{useNewUrlParser:true,useUnifiedTopology:true}).then(connect=>{
    console.log('success fully connect with server');
    app.listen(PORT,()=>{
        console.log(`For API :http://127.0.0.1:${PORT}`);
    })
}).catch(err=>{
    console.log('server not connect : ERROR :'+err);
})