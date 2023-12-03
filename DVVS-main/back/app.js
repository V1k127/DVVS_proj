const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const postRoutes = require('./api/routes/postRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/', postRoutes);

const PORT =  8080;
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
