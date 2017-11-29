const express = require('express');
//const router = express.Router();
//const bodyParser = require('body-parser');

const app = express();

//app.use(express.static('public'));

app.get('/users', (req, res) => {
    //find the service number in the database
    //

});

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server listening on port ${process.env.PORT || 8080}`);
});