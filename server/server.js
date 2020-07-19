// For REST API
const express = require("express");

// Parse request and create request.body object
const bodyParser = require("body-parser");

// Enable CORS.
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
}

// Middleware: CORS support
app.use(cors(corsOptions));

// Middleware: Parse requests of content-type application-json
app.use(bodyParser.json());

// Parse requests of application type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the database
const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

// Routes:
// /api/posts: GET, POST, DELETE
// /api/posts/:id: GET, PUT, UPDATE
// /apt/posts/published: GET

// Simple routing
/*app.get("/", (request, result) => {
    result.json({ message: "Welcome to the app!" });
});*/

// Routes
require("./app/routes/post.routes")(app);

// Set port, listen for requests.
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});