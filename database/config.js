const mongoose = require('mongoose');

require('dotenv').config();



const dbConection = async()=>{
   await mongoose.connect(
     process.env.MONGODB_CNN,
     { useNewUrlParser: true },
     (err, res) => {
       if (err) throw err;

       console.log("Base de Datos ONLINE");
     }
   );




}


module.exports={
    dbConection
}