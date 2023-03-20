const userDB = {
  user: require("../model/users.json"),
  setUsers: function (data) {
    this.user = data
  },
}
const fsPromises = require("fs").promises
const path = require("path")
const bcrypt = require("bcrypt")

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body
  //checking user and password are not emty.
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ 'message': "Username and password are required" })
  }

  //checking for duplicates in database
  const duplicate = userDB.user.find((person) => person.usernanme === user)
  if (duplicate) {
    return res.sendStatus(409)
  }

  //for unique user.
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10)
    //store the new user.
    const newUser = {
      'username': user,
      'password': hashedPwd,
    }

    userDB.setUsers([...userDB.user, newUser])
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.user)
    )
    console.log(userDB.user)
    res.status(201).json({
      'success': `New user with ${user} created.`,
    })
  } catch (err) {
    res.status(500).json({
      'message': err.message
    })
  }
}

module.exports = {
  handleNewUser,
}
