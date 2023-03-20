const {logEvents} = require("./logEvents");

const EventEmmitter = require("events");
//Note - EventEmitter here is a class.

class MyEmitter extends EventEmmitter {}

//initialising the object of the class
const myEmitter = new MyEmitter();

//add listner to the log event
//listens to the event named "log"

/*myEmitter.on("log", (msg) => logEvents(msg));*/
myEmitter.on("log", (msg) => {
    logEvents(msg)
})

setTimeout(() => {
  //emit or create an event
  myEmitter.emit("log", "Log event emitted");
  //"log" is the name of the event
}, 2000);

//Note - listener of emitter event should be defined above it. beacuse it only calls
//the previously registered events(there can be multiple registerd events previously) 
