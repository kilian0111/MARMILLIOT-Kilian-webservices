import mongoose from 'mongoose';
import {roleSchema} from "#src/models/Roles";

const {Schema} = mongoose;


const userSchema = new Schema({
        lastName: String,
        firstName: String,
        email: {type: String, required: 'un email est obligatoire:)', unique: true},
        password: {type: String},
        roles: [{
            ref: 'roles',
            type: mongoose.Schema.Types.ObjectId
        }],
        skills: [{
            ref: 'skills',
            type: mongoose.Schema.Types.ObjectId
        }],
        refreshToken: String
    },
    {timestamps: true}
);

const userModel = mongoose.model('users', userSchema)

export default userModel
