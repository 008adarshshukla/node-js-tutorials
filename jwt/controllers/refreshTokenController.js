const userDB = {
  user: require("../model/users.json"),
  setUsers: function (data) {
    this.user = data
  },
}
const jwt = require("jsonwebtoken")
require("dotenv").config()

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies
  //if we have cookies then we are checking if we have jwt property.
  if (!cookies?.jwt) {
    return res.sendStatus(401) //Unauthorised
  }
  console.log(cookies.jwt)
  const refreshToken = cookies.jwt
  const foundUser = userDB.user.find(
    (person) => person.refreshToken === refreshToken
  )
  if (!foundUser) {
    console.log("vould not find")
    return res.sendStatus(403) //Forbidden
  }

  //evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      return res.sendStatus(403)
    }

    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    )

    res.json({ accessToken })
  })
}

module.exports = {
  handleRefreshToken,
}
