const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// const db = require("./app/models");
// const Role = db.role;
// const Ukm = db.ukms;
// const Prodi = db.prodis;
// const Recuitmen = db.recuitmen;

// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and Resync Db');
//     initial();
// });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Jayen application." });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/ukm.routes')(app);
require('./app/routes/event.routes')(app);
require('./app/routes/prodi.routes')(app);
require("./app/routes/recuitmen.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});



// function initial() {
//     Role.create({
//         id: 1,
//         name: "user"
//     });

//     Role.create({
//         id: 2,
//         name: "moderator"
//     });

//     Role.create({
//         id: 3,
//         name: "admin"
//     });

//     Ukm.create({
//         id: 1,
//         name: "FUTSAL"
//     });

//     Ukm.create({
//         id: 2,
//         name: "DANCE"
//     });

//     Ukm.create({
//         id: 3,
//         name: "ESPRIME"
//     });

//     Prodi.create({
//         id: 1,
//         name: "SI"
//     });

//     Prodi.create({
//         id: 2,
//         name: "IF"
//     });

//     Prodi.create({
//         id: 3,
//         name: "SIA"
//     });
// }