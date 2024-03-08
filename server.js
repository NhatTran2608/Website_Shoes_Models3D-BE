const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const cors = require('cors');
const route = require('./src/routes');
const db = require('./src/config/db');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
const compression = require('compression');
const multer = require('multer');
// Connect to DB
db.connect();
dotenv.config();
const app = express();
const port = process.env.PORT || 3001

app.use(cors());
// Use static folder
app.use(express.static("src/public"));
// app.use(bodyParser.json({ limit: "10000kb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "10000kb", extended: true }));

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(compression())

// Routes init

route(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);