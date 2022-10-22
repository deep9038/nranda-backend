const express = require('express');
const addOnItemController = require('../Controller/addOnItem_Controller');
const addOnItemActionController = require('../Controller/addOnItemAction_Controller')
const addOnItemMiddileware = require('../Middileware/addOnItem_Middileware');

const multer = require('multer')
const response_post = multer();

const addOnItemRoute = express.Router();

// GET METHODS
addOnItemRoute.get('/addOnItem',addOnItemController.addOnItem)


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
const storageaddOnItemImage = multer.diskStorage({
    destination:'public/upload/addOnItemImage',
    filename: function(req, file, cb){
        cb(null, Date.now() + "__" + file.originalname)
    }
});

  const addOnItemImage = multer({ storage: storageaddOnItemImage, fileFilter: fileFilter }).fields(
    [
      { 
        name: 'addOnItemImage', 
        maxCount: 1 
      }
    ]
  )
addOnItemRoute.post('/addOnItem_post',response_post.any(),addOnItemMiddileware.inputAddOnItemCheck,addOnItemController.addOnItem_post)


// ACTION STATEMENT ROUTES
addOnItemRoute.get('/deleteAddOnItem/:id',addOnItemActionController.deleteAddOnItem);
addOnItemRoute.get('/editAddOnItem/:id',addOnItemActionController.editAddOnItem);
addOnItemRoute.post('/updateAddOnItem',response_post.any(),addOnItemActionController.updateAddOnItem);



// EXPORTS SECTION
module.exports = addOnItemRoute;

