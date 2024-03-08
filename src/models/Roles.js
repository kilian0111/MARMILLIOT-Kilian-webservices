import mongoose from 'mongoose';

const {Schema} = mongoose;

const authorizationsSchema = new Schema({
    ressource: String,
    permissions: [String]
});


const roleSchema = new Schema({
    name: String,
    authorizations: [authorizationsSchema]
}, {timestamps: true});

const roleModel = mongoose.model('roles', roleSchema)

export default roleModel

export {roleSchema, authorizationsSchema, roleModel}
