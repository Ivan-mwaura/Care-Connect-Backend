const express = require ('express');
const router = express.Router();
const {
    Login,
    adminLogin,
    ChwLogin

} = require('../Controllers/main') ;


router.route('/login').post(Login) ;
router.route('/admin').post(adminLogin) ;  
router.route('/chw').post(ChwLogin) 

module.exports = router;  