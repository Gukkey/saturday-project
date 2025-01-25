import express from 'express'
import { findUser, postData, userSignup } from './db.js';
import bcrypt from "bcrypt"
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
        res.status(500).send(`Error posting data ${err}`)
    }
})

app.post("/api/signup", async (req, res, next) => {
    try {
        const username = req.body.username
        const password = req.body.password
        const hashedPassword = await bcrypt.hash(password, 10)
        await userSignup(username, hashedPassword)
        res.status(201).send("User created successfully")
    } catch (err) {
        res.status(500).send(`Error creating user ${err}`)
    }
})

app.post("/api/verify/user", async (req, res, next) => {
    try {
        const username = req.body.username
        const password = req.body.password
        const hashedPassword = await findUser(username).then(res => res[0].hashed_password)
        const check = await bcrypt.compare(password, hashedPassword)
        if (check) {
            res.status(200).send("Verified")
        } else {
            res.status(401).send("Not verified")
        }
    } catch (err) {
        res.status(500).send(`Error verifying the user ${err}`)
    }
})


app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`);
});

