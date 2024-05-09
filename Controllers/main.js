const multer = require('multer');
const {statusCodes} = require('http-status-codes');
const User = require('../Models/Login');
const AdminUser = require('../Models/AdminLogin');
const ChwUser = require('../Models/ChwLogin');

const storage  =  multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

//const upload = multer({storage: storage});   

const Login = async(req, res) => {
    
    try {

        const {email, password} = req.body;

        

       const user =  await User.findOne({email});

       if(!user){
           return res.status(404).json({msg: 'User not found'});
       }

     const isPasswordMatch = await user.comparePassword(password); 
     
     if(!isPasswordMatch){
        return res.status(400).json({msg: 'Invalid credentials'});
     }

     const token = user.createJWT();
     
    res.status(200).json({user: {email: user.email}, token: token, msg: 'Login successful'});

        
    } catch (error) {
        res.status(500).json({msg: error});

        console.log(error);
        
    }
}

const adminLogin = async(req, res) => {

    const {email, password} = req.body;
    const body = req.body;

    console.log(email,  password ); 

    try {

        const user = await AdminUser.findOne({email});

        if(!user){
            return res.status(404).json({msg: 'User not found'});
        }

        const isPasswordMatch = await user.comparePassword(password);

        if(!isPasswordMatch){
            return res.status(400).json({msg: 'Invalid credentials'});
        }

        const token = user.createJWT();

        res.status(200).json({user: {email: user.email}, adminToken: token, msg: 'Login successful'});

        
    } catch (error) {
        
        res.status(500).json({msg: error});

        console.log(error);
        
    }
   

}

const ChwLogin = async(req, res) => {
    
        const {email, password} = req.body;
    
       try {
        
        const {email, password} = req.body;

        console.log(email,  password );

        const user = await ChwUser.findOne({email});

        if(!email){
            return res.status(404).json({msg: 'User not found'});
        }

        const isPasswordMatch = await user.comparePassword(password);

        if(!isPasswordMatch){
            return res.status(400).json({msg: 'Invalid credentials'});
        }

        const token = user.createJWT();

        res.status(200).json({user: {email: user.email}, chwToken: token, msg: 'Login successful'});

       } catch (error) {

        res.status(500).json({msg: error});

        console.log(error);
        
       }
}
module.exports = {
    Login,
    adminLogin,
    ChwLogin
};