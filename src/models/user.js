const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const userSchema = new  mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength:50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
               throw new Error("Invalid email", +value);
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min:18
    },
    gender: {
        type: String,
        validate(value){
            if(!["male" , "female", "others"].includes(value)){
                throw new Error("Gender data is not valid");
                
            }
        }
    },
    photoUrl: {
        type: String,
        default:"https://www.google.com/imgres?q=dummy%20user%20full%20photo%20image&imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2014%2F04%2F02%2F17%2F07%2Fuser-307993_640.png&imgrefurl=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fuser%2F&docid=rmmzhVPJUKwfiM&tbnid=vRDIJTCuhTXBrM&vet=12ahUKEwiky-yFkviIAxUZR2wGHaSrCWoQM3oECFsQAA..i&w=639&h=640&hcb=2&ved=2ahUKEwiky-yFkviIAxUZR2wGHaSrCWoQM3oECFsQAA",
        validate(value){
            if(!validator.isURL(value)){
               throw new Error("invalid url", +value);
            }
        } 
    },
    about: {
        type: String,
        default: "default intro"

    }, 
    skills: {
type:[String]
    }
}, 
{timestamps: true});

userSchema.methods.getJWT = async function(){
    const user = this;

    const token = await jwt.sign({ _id: user._id }, "Dev@Tinder123", { expiresIn: '7d' });
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this; 
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser , passwordHash);
    return isPasswordValid;
}

const User = mongoose.model("User" , userSchema);

module.exports = User;
