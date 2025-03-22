import express from 'express';
import cors from 'cors';
import router from "./router";

import 'dotenv/config'

const app = express();

app.use(cors());
app.use(router);


const port = process.env.PORT || '5000';

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
