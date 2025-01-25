import express from 'express'
import postData from './db.js';

import cors from 'cors'


const port = 8080

function logRequest(req, res, next) {
    console.log(`Received a ${req.method} from ${req.ip}`);
    next();
}

const app = express()
app.use(logRequest)
app.use(cors())
app.use(express.json())


app.options('*', cors())

app.get('/events', (req, res, next) => {
    res.send('hello world')
})

app.post('/api/post/form', async (req, res) => {
    try {
        await postData(req.body.name, req.body.address)
        res.status(201).send('Posted successfully')
    } catch (err) {
        res.status(500).send("Error posting data")
    }
})


app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`);
});

