const express = require('express');
const categoryController = require('../Controller/category_Controller');
const categoryMiddileware = require('../Middileware/category_Middileware');
const categoryActionController = require('../Controller/categoryAction');
const multer = require('multer');


const response_post = multer();
const categoryRoute = express.Router();

// GET METHODS
categoryRoute.get('/addCategory',categoryController.addCategory)


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
const storagecategoryImage = multer.diskStorage({
    destination:'public/upload/categoryImage',
    filename: function(req, file, cb){
        cb(null, Date.now() + "__" + file.originalname)
    }
});

  const categoryImage = multer({ storage: storagecategoryImage, fileFilter: fileFilter }).fields(
    [
      { 
        name: 'categoryImage', 
        maxCount: 1 
      }
    ]
  )
categoryRoute.post('/addCategory_post',categoryImage,categoryMiddileware.inputCategoryCheck,categoryController.addCategory_post)


// ACTION STATEMENTS
categoryRoute.get('/categoryDelete/:id',categoryActionController.categoryDelete)

categoryRoute.post('/activetionStatusCategory/:id',response_post.any(),categoryActionController.activetionStatusCategory)
categoryRoute.post('/categoryUpdate_post',categoryImage,categoryMiddileware.inputCategoryCheck,categoryActionController.categoryUpdate_post)


// EXPORTS SETCTION 
module.exports = categoryRoute