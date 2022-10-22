const addToCardModel = require('../Model/addToCard_Model');
const addItemModel = require('../../Additem/Model/addItem_Model');

// addToCard_post
exports.addToCard_post=(req,res)=>{
    console.log(req.body);

    new addToCardModel({
        customerName:req.body.customerName,
        customerNumber:req.body.customerNumber,
        orderItems:req.body.orderItems,
        totalPrice:req.body.totalPrice,
    }).save().then(addToCardProducts=>{
        console.log('addToCardProducts',addToCardProducts);
        return res.status(200).json({
            status: 'success',
            result: addToCardProducts,
            message: "Card Products Data Submitted"
        });
    }).catch(err=>{
        console.log('addToCardProducts ERROR :',err);
        return res.status(400).json({
            status: 'failed',
            message: "Card Products Data can't Submitted"
        });
    })


    // const ID = req.params.id;
    // console.log(ID);
    // addItemModel.findById({_id:ID}).then(findAddItem=>{
    //     console.log('orderItem Body',req.body);
    //     new addToCardModel({
    //         orderItems:req.body.orderItems
    //     }).save().then(orderItem=>{
    //         console.log('orderItem',orderItem);
    //     }).catch(err=>{
    //         console.log('orderItem ERROR :',err);
    //     })
    // })


    // const cookieData = req.cookies.cartData;
    // // console.log(cookieData);


    // if (cookieData) {
    //     if (cookieData.some(e => e.productId === ID)) {
    //         const filterData = cookieData.filter(i => i.productId === ID);
    //         const indexNum = cookieData.findIndex(j => j.productId === ID);
    //         cookieData.splice(indexNum, 1);
    //         let newProduct = { productId: filterData[0].productId, qty: filterData[0].qty + 1 }
    //         res.cookie('cartData', [...cookieData, newProduct])
    //         // return res.redirect('/')
    //         res.redirect('back');
    //     }
    //     const otherCartData = { productId: ID, qty: 1 }
    //     res.cookie('cartData', [...cookieData, otherCartData])
    // } else {
    //     const otherCartData = { productId: ID, qty: 1 }
    //     res.cookie('cartData', [otherCartData])
    // }
    // res.redirect('/')
}