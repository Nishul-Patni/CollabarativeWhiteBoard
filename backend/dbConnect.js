const mongoose = require("mongoose")


function connectToDb() {
    return new Promise((resolve, reject) => {
      mongoose.connect("mongodb+srv://nishulpatni2:z7OOphPhUco8zAMO@cluster0.mtgejk4.mongodb.net/ChatApplication");
  
      const db = mongoose.connection;
  
      db.on('error', (err) => {
        console.error('Error connecting to MongoDB:', err);
        reject(err);
      });
  
      db.once('open', () => {
        console.log('Connected to MongoDB successfully');
        resolve(db);
      });
    });
  }

module.exports = connectToDb;