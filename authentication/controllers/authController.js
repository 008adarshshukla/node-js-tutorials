const userDB = {
  user: require("../model/users.json"),
  setUsers: function (data) {
    this.user = data
  },
} 
const bcrypt = require('bcrypt')

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body
    //checking user and password are not emty.
    if (!user || !pwd) {
      return res
        .status(400)
        .json({ message: "Username and password are required" })
    }

    const foundUser = userDB.user.find(person => person.username === user)
    if(!foundUser) {
      console.log('vould not find');
        return res.sendStatus(401)//Unauthorised
    }

    const match = await bcrypt.compare(pwd, foundUser.password)
    if(match) {
         res.json({'success': `User ${user} is logged in.`});
    } else {
        res.sendStatus(401)
    }
}

module.exports = {
    handleLogin
}