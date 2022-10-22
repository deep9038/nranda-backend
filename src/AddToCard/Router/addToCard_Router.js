const express = require('express');
const addToCardController = require('../Controller/addToCard_Controller');

const addToCardRoute = express.Router();

// POST METHOD
addToCardRoute.post('/addToCard_post',addToCardController.addToCard_post)





// EXPORTS SECTION
module.exports = addToCardRoute;

