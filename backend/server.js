const express = require('express');
const cors = require('cors')
const axios = require('axios');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const path = require('path')

const mongoose = require('mongoose');
const User = require('./models/userModel');
require("dotenv").config()
mongoose.connect(process.env.MONGODB_CONNECTION_STRING,
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
).then(() => console.log("MongoDB has been started.")).catch((err) => console.log(err))


const app = express();
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use(express.static(path.resolve(__dirname, "../frontend/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

  
app.listen(PORT, function(){
    console.log("Server is running on port "+ PORT)
    
});



app.post('/api/register', async (req, res) => {
  console.log(req.body)

  try {
    const newPassword = await bcrypt.hash(req.body.password, 10)
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: newPassword
    })
    res.json({status: 'ok'})
  } catch (err) {
    res.json({status: 'err', error: 'Username or email is already in use.'})
    
  }
  
})


app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				username: user.username,
				email: user.email,
			},
			'secretkey123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})


app.get('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secretkey123')
		const email = decoded.email
		const user = await User.findOne({ email: email })

		return res.json({ status: 'ok', quote: user.quote })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.post('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secretkey123')
		const email = decoded.email
    const user = await User.findOne({ email: email })
		await User.updateOne(
			{ email: email },
			{ $set: { quote: req.body.quote } }
		)

		return res.json({ status: 'ok' , quote: user.quote})
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})
