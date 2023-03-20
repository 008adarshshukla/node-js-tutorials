const fs = require('fs');
const path = require('path')

/*
All the file related functions are asynchronus if we want them to occur in order
expected then we can put other method in the callback of the first.
*/

// fs.readFile(path.join(__dirname, 'starter.txt'), (err, data) => {
//   if (err) throw err;
//   console.log(data.toString());
// });

//creates a new file if it does not exists
// fs.writeFile(path.join(__dirname, 'reply.txt'), 'Nice to meet you', (err) => {
//   if (err) throw err;
//   console.log("successfuly wrote to the reply file.");

//   //creates a new file if it does not exists.
//   fs.appendFile(
//     path.join(__dirname, "reply.txt"),
//     "Testing to append",
//     (err) => {
//       if (err) throw err;
//       console.log("successfuly appended to the reply file.");
//     }
//   );
// })

/*
Writing another function in the call back of the other leads to the condition 
called callback hell. This can be avoided by the use of the aysnc and await.
*/

const fsPromises = require('fs').promises

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(path.join(__dirname, 'starter.txt'), 'utf8')
    console.log('read from the file');
    console.log(data);
    await fsPromises.writeFile(path.join(__dirname,'reply.txt'),'New text')
    console.log('wrote to the file');
    await fsPromises.appendFile(path.join(__dirname, "reply.txt"), "\n\nNew text2");
    console.log('appended to the file');
  } catch (error) {
    console.error(error);
  }
}

fileOps()



