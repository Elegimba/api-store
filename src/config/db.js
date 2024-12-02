const mongoose = require('mongoose');

/* mongoose.connect('mongodb://localhost:27017/store'); */ // La base de datos "store" se va a crear solar 

mongoose.connect(process.env.MONGO_URL); //cambiamos la líne 3 por esta para usar la BD online

