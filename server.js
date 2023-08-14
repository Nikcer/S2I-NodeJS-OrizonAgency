const app = require('./app');
const connectDB = require("./database");


connectDB();

app.listen(3000, () => console.log("Il server è in ascolto sulla porta 3000"));
