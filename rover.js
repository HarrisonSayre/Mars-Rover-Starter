class Rover {
   // Write code here!
   constructor(position) {
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
   }
   receiveMessage(message){
      let transmissionLog = {};
      transmissionLog["message"] = message.name;
      transmissionLog["results"] = [];
      for(let i = 0; i < message.commands.length; i++){
         if(message.commands[i].commandType === "MOVE"){
            if(this.mode === "NORMAL"){
            //Add in check for low power mode and return false and don't move if so.
               transmissionLog.results.push({"completed": true});
               this.position = (message.commands[i].value);
            }else if (this.mode === "LOW_POWER"){
               transmissionLog.results.push({"completed": false});
            }
         }else if(message.commands[i].commandType === "MODE_CHANGE"){
            if(message.commands[i].value == "NORMAL" || message.commands[i].value === "LOW_POWER"){
               transmissionLog.results.push({"completed": true});
               this.mode = message.commands[i].value;
            }else{
               transmissionLog.results.push({"completed": false});
            }
         }else if(message.commands[i].commandType === "STATUS_CHECK"){
            transmissionLog.results.push({"completed": true, "roverStatus": {"mode": this.mode, "generatorWatts": this.generatorWatts, "position": this.position}});
         } 
      }
      return transmissionLog;
   }
}

module.exports = Rover;