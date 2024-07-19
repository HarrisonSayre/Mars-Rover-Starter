class Message {
   // Write code here!
   constructor(name, commands) {
      this.name = name;
      if (!name) {
        throw Error("Name required.");
      }
      //SEEMS TOO SIMPLE... CAN LEAVE COMMAND UNDEFINED. DON'T THINK WE CAN ALLOW THIS
      this.commands = commands;
    }

   
}

//let message1 = new Message ("Hello");
//console.log(message1);

module.exports = Message;