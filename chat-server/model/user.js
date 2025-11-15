const moongose = require('mongoose')
const schema = moongose.Schema;

const UserSchema = new schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type:String,
        required: true
    }
},{
    timestamps: true
})

module.exports = moongose.model('User', UserSchema)