import mongoose from 'mongoose';
import "dotenv/config"

const uri = process.env.MONGO_URI
// console.log("uri: ", uri);

async function run() {
    try {
        await mongoose.connect(uri, {
            dbName: 'cruddb',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            retryWrites: false // Add this line
        });
    } catch (err) {
        console.log("Mongodb connection error", err);
        process.exit(1);
    }
}

run().catch(console.dir);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', async function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    await mongoose.connection.close();

    console.log('Mongoose default connection closed');
    process.exit(0);
    
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////