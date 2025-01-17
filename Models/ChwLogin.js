const mongoose = require('mongoose');   
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ChwLoginSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],unique: true,
    
    },
    password:{
        type: String,
        required: [true, 'Please provide a password'],
    }
})

ChwLoginSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

ChwLoginSchema.methods.createJWT = function () {
    return jwt.sign(
        {user: this._id, email:this.email},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRY}
    )
}

ChwLoginSchema.methods.comparePassword = async function (candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)

    return isMatch
}

module.exports = mongoose.model('ChwLogin', ChwLoginSchema)