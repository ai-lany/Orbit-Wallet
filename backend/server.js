const express = require('express');
const cors = require('cors')
const axios = require('axios');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const path = require('path')

const mongoose = require('mongoose');
const User = require('./models/userModel');
require("dotenv").config()
mongoose.connect(process.env.MONGODB_URI,
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
      firstName: req.body.firstName,
      lastName: req.body.lastName,
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
				firstName: user.firstName,
        lastName: user.lastName,
				email: user.email,
			},
			'secretkey123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})




app.get('/api/favorite', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secretkey123')
		const email = decoded.email
		const user = await User.findOne({ email: email })

		return res.json({ status: 'ok', watchlist: user.watchlist, widgets: user.widgets})
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.get('/api/widget', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secretkey123')
		const email = decoded.email
		const user = await User.findOne({ email: email })

		return res.json({ status: 'ok', widgets: user.widgets })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.post('/api/favorite', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secretkey123')
		const email = decoded.email
    const user = await User.findOne({ email: email })
    if(user.watchlist.includes(req.body.watchlist)){
      await User.updateOne(
        { email: email },
        { $pull: { watchlist: req.body.watchlist } }
      )
    }else{
      await User.updateOne(
        { email: email },
        { $push: { watchlist: req.body.watchlist } }
      )
    }
	

		return res.json({ status: 'ok' , watchlist: user.watchlist})
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
});



app.post('/api/widget', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secretkey123')
		const email = decoded.email
    const user = await User.findOne({ email: email })
	if(user.widgets.includes(req.body.widgets)){
      await User.updateOne(
        { email: email },
        { $pull: { widgets: req.body.widgets } }
      )
    }else{
      await User.updateOne(
        { email: email },
        { $push: { widgets: req.body.widgets } }
      )
    }

		return res.json({ status: 'ok' , watchlist: user.widgets})
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
});


app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});