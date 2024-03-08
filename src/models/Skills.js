import mongoose from 'mongoose';

const {Schema} = mongoose;


const skillSchema = new Schema({
        name: String,
    }, {timestamps: true}
);

const skillModel = mongoose.model('skills', skillSchema)

export default skillModel
