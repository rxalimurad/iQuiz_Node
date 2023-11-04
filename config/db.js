const mongoos = require('mongoose')

const connectDB = async () => {
    const conn = await mongoos.connect(process.env.MONGO_URL);

console.log(`MongoDB connected:${conn.connection.host}`);
};

module.exports = connectDB