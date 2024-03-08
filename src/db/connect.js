import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
//https://netbasal.com/node-js-v20-6-0-introducing-built-in-env-file-support-fb1b1de4f1fa

const {
    MONGO_CLUSTER,
    MONGO_DATABASE,
    MONGO_USER,
    MONGO_PWD
} = process.env
// mongodb+srv://<username>:<password>@cluster0.qgk4x.mongodb.net/?retryWrites=true&w=majority
const MONGO_URI_STRING = [
    "mongodb+srv://",
    MONGO_USER,
    ":",
    MONGO_PWD,
    "@",
    MONGO_CLUSTER,
    "/",
    MONGO_DATABASE,
    "?retryWrites=true&w=majority"
].join('')

const connect = () => {

    mongoose.connect(MONGO_URI_STRING)
        .then(() => {
            return console.info(`Successfully connected to ${MONGO_CLUSTER}@${MONGO_DATABASE}`);
        })
        .catch(error => {
            console.error('Error connecting to database: ', error);
            return process.exit(1);
        });

    mongoose.connection.on('disconnected', connect);
};
export default connect
