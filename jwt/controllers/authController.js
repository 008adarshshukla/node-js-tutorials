const userDB = {
  user: require("../model/users.json"),
  setUsers: function (data) {
    this.user = data
  },
}
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const fsPromises = require("fs").promises
const path = require("path")

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body
  //checking user and password are not emty.
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required" })
  }

  const foundUser = userDB.user.find((person) => person.username === user)
  if (!foundUser) {
    console.log("vould not find")
    return res.sendStatus(401) //Unauthorised
  }

  const match = await bcrypt.compare(pwd, foundUser.password)
  if (match) {
    //create jwt
    const accessToken = jwt.sign(
      //payload
      {
        "username": foundUser.username
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '30s'
      }
    )
    const refreshToken = jwt.sign(
      //payload
      {
        "username": foundUser.username
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '1d'
      }
    )

    //saving the refresh token in db to allow to create a log out route.
    const otherUsers = userDB.user.filter(person => person.username !== foundUser.username)

    const currentUser = {
      ...foundUser,
      refreshToken
    }

    userDB.setUsers([...otherUsers, currentUser])

    //putting refresh token with current user into a file or db
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(userDB.user)
    )
    //do not use cookies that can be accessed via javascript for storing the access token while store it in memory.
    //use http only cookies to send access token which is not accessible via javascript.
    res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24*60*60*1000})
    res.json({accessToken})
  } else {
    res.sendStatus(401)
  }
}

module.exports = {
  handleLogin,
}
