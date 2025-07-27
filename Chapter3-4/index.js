const logEvents = require("./logEvents");

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}
//nesneyi baslatiyoruz
const myEmitter = new MyEmitter();
//günlük olayı için dinleyici ekle
myEmitter.on("log", (message) => logEvents(message));

setTimeout(() => {
  //log olayını tetikle
  myEmitter.emit("log", "loglar tutuluyor");
}, 1000);
