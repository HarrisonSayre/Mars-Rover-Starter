const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!

  //7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let testRover = new Rover (1);
    expect(testRover.position).toBe(1);
    expect(testRover.mode).toBe("NORMAL");
    expect(testRover.generatorWatts).toBe(110);
  });
  //8
  it("response returned by receiveMessage contains the name of the message", function() {
    let testRover = new Rover(1);
    expect((testRover.receiveMessage(new Message ("NAME", [(new Command ("MOVE", 2))]))).message).toBe("NAME");
  });
  //9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let testRover = new Rover(1);
    expect((testRover.receiveMessage(new Message ("NAME", [(new Command ("MOVE", 2)), (new Command ("MODE_CHANGE", "NORMAL"))])).results.length)).toBe(2);
  });
  //10
  it("responds correctly to the status check command", function() {
    let testRover = new Rover(1);
    expect(testRover.receiveMessage(new Message ("NAME", [(new Command ("STATUS_CHECK"))])).results[0].roverStatus.mode).toBe(testRover.mode);
    expect(testRover.receiveMessage(new Message ("NAME", [(new Command ("STATUS_CHECK"))])).results[0].roverStatus.generatorWatts).toBe(testRover.generatorWatts);
    expect(testRover.receiveMessage(new Message ("NAME", [(new Command ("STATUS_CHECK"))])).results[0].roverStatus.position).toBe(testRover.position);
  });
  //11
  it("responds correctly to the mode change command", function() {
    let testRover = new Rover(1);
    expect(testRover.receiveMessage(new Message ("NAME", [(new Command ("MODE_CHANGE", "LOW_POWER"))])).results[0].completed).toBe(true);
    expect(testRover.receiveMessage(new Message ("NAME", [(new Command ("MODE_CHANGE", "NORMAL"))])).results[0].completed).toBe(true);
    expect(testRover.receiveMessage(new Message ("NAME", [(new Command ("MODE_CHANGE", "WHOOPS"))])).results[0].completed).toBe(false);
  });
  //12
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let testRover = new Rover(1);
    testRover.receiveMessage(new Message ("NAME", [(new Command ("MODE_CHANGE", "LOW_POWER"))]));
    expect(testRover.receiveMessage(new Message ("NAME", [(new Command ("MOVE", 2))])).results[0].completed).toBe(false);
  });
  //13
  it("responds with the position for the move command", function() {
    let testRover = new Rover(1);
    testRover.receiveMessage(new Message ("NAME", [(new Command ("MOVE", 2))]));
    expect(testRover.position).toBe(2);
    testRover.receiveMessage(new Message ("NAME", [(new Command ("MOVE", "4"))]));
    expect(testRover.position).toBe(2);
  });
});
