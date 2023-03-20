
/*
1.pakage.json is the file which contains the details of the dependencies
2.node module folder contains the dependencies and subdependencies. These are not meant
  to be pushed to the github so we can ignore it it gitignore file.
3. run npm install to install the npm modules present in package.json
4. installing nodemon as devDependency - "npm i nodemon -D"
5. ^ means not updating major versions but updating  minor versions and patches.
6. ~ means updating only the patches.
7. No sign before the version means using the preset version.
8. Mentioning * instead of a version means always using the latest version.
9. For installing a specific version use command "npm i dependencyName@3.4.2"
10. For uninstalling a  dependency use command "npm rm depedencyName -flag"
11. If we have some dependency installed that is present in script then after
    uninstalling it update the script as well.
*/


//to see all the methods present in the dependencies.
/*
const dateModule = require('date-fns')
console.log(dateModule)
*/

const { format } = require('date-fns')
const { v4: uuid } = require('uuid')

const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`
  console.log(logItem);

  try {
    if (!fs.existsSync(path.join(__dirname, 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, 'logs'))
    }
    await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem)
  } catch (error) {
    console.log(error);
  }
}

module.exports =  {
  logEvents
}

// console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'))
// //logs different id.
// console.log(uuid());