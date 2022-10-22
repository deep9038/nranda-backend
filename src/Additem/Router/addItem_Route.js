const express = require('express');
const addItemController = require('../Controller/addItem_Controller');
const addItemActionController = require('../Controller/addItemAction_Controller'); 
const addItemMiddileware = require('../Middileware/addItem_Middileware');
const multer =require('multer');
const request_param = multer();


const addItemRoute = express.Router();

//GET METHODS
addItemRoute.get('/Items',addItemController.Items);
addItemRoute.get('/itemOfCategory/:id',addItemController.itemOfCategory);


// FOR IMG AND POST METHODS
//stape4 file type
const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes("png") || file.mimetype.includes("webp") || file.mimetype.includes("jpg") || file.mimetype.includes("jpeg")) {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

// step5 storage
const storageItemImage = multer.diskStorage({
    destination:'public/upload/itemImage',
    filename: function(req, file, cb){
        cb(null, Date.now() + "__" + file.originalname)
    }
});

  const itemImage = multer({ storage: storageItemImage, fileFilter: fileFilter }).fields(
    [
      { 
        name: 'Image', 
        maxCount: 1 
      }
    ]
  )
addItemRoute.post('/addItem_post',itemImage,addItemMiddileware.inputItemCheck,addItemController.addItem_post)



// ACTION STATEMENTS
addItemRoute.get('/itemDelete/:id',addItemActionController.itemDelete);
addItemRoute.get('/itemEditData/:id',addItemActionController.itemEditData);

addItemRoute.post('/activetionStatusItem/:id',request_param.any(),addItemActionController.activetionStatusItem);
addItemRoute.post('/itemUpdate_post',itemImage,addItemMiddileware.inputItemCheck,addItemActionController.itemUpdate_post)


// EXPORTS SETCTION 
module.exports = addItemRoute
