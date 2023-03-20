const userDB = {
  user: require("../model/users.json"),
  setUsers: function (data) {
    this.user = data
  },
}
const fsPromises = require("fs").promises
const path = require("path")

const handleLogOut = async (req, res) => {
  //on client also delete the access token
  const cookies = req.cookies
  //if we have cookies then we are checking if we have jwt property.
  if (!cookies?.jwt) {
    return res.sendStatus(204) //successful but no content
  }
  const refreshToken = cookies.jwt

  //is refresh token in db.
  const foundUser = userDB.user.find(
    (person) => person.refreshToken === refreshToken
  )
  if (!foundUser) {
    //erase the cookie.
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    })
    return res.sendStatus(204) //successful but no content
  }
  //delete the refresh token in db
  const otherUsers = userDB.user.filter(person => person.refreshToken !== foundUser.refreshToken)

  const currentUser = {...foundUser, refreshToken: ''}
  userDB.setUsers([...otherUsers, currentUser])

  await fsPromises.writeFile(
    path.join(__dirname, '..', 'model', 'users.json'),
    JSON.stringify(userDB.user)
  )

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  })
  res.sendStatus(204)//successful but no content
}

module.exports = {
  handleLogOut,
}
