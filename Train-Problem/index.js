const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000
const {getOrderedTrain} = require('./routers/train_info');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/trains',getOrderedTrain);

app.listen(3000,async ()=>{
    console.log(`server started on port ${port}`);
    
});
