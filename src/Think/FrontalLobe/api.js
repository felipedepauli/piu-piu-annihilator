// // Importing required libraries
// const express = require('express');
// const multer = require('multer');
// const router = express.Router();
// const PersonController = require('./controllers/PersonController');

// // Setting up multer for file storage
// const storage = multer.diskStorage({
//     // Setting the destination for file storage
//     destination: function(req, file, cb) {
//       cb(null, '/app/faces_bd/');
//     },
//     // Setting the filename for the stored file
//     filename: function(req, file, cb) {
//       cb(null, file.originalname);
//     }
// });

// // Initializing multer with the storage settings
// const upload = multer({ storage: storage });

// // Defining the routes for the API
// router.post   ('/memory/add'            , upload.single('photo'), PersonController.addPerson);
// router.get    ('/memory/get_all_people' , PersonController.getAllPeople);
// router.get    ('/memory/auth'           , PersonController.authPerson);
// router.delete ('/memory/forget'         , PersonController.forgetPerson);

// // Exporting the router for use in other modules
// module.exports = router;


const express = require('express');
const router = express.Router();
const CommandController = require('./CommandController');


// Defining the routes for the API
router.post('/command/shoot',       CommandController.shoot);
router.post('/command/left',       CommandController.left);
router.post('/command/right',      CommandController.right);
router.post('/command/up',         CommandController.up);
router.post('/command/down',       CommandController.down);
router.post('/command/centralize', CommandController.centralize);

// Exporting the router for use in other modules
module.exports = router;
