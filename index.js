#!/usr/bin/env node

const prompt = require('prompt');
const { leave, park, createParkingLot, getRegIdByColor, getSlotByColor, getSlotByRegNumber,status } = require('./controller');



function execCommand(command) {
    let splitCmd = command.split(' ');
    switch (splitCmd[0]) {
        case "create_parking_lot":
            createParkingLot(splitCmd[1])
            break;
        case "park":
            park(splitCmd[1], splitCmd[2])
            break;
        case "leave":
            leave(splitCmd[1])
            break;
        case "registration_numbers_for_cars_with_colour":
            getRegIdByColor(splitCmd[1]);
            break;
        case "slot_numbers_for_cars_with_colour":
            getSlotByColor(splitCmd[1])
            break;
        case "slot_number_for_registration_number":
            getSlotByRegNumber(splitCmd[1])
            break;
        case "status":
            status();
            break;
        default:
            break;
    }
}
function askForCommand() {
    prompt.start();
    prompt.get(['command'], function (err, result) {
        if (err) { return onErr(err); }
        console.log('Command-line input received:');
        console.log('  command: ' + result.command);
        if (result.command == "exit") {
            return;
        } else {
            execCommand(result.command)
            askForCommand()
        }
    });
}
if(process.argv.length>2){
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(process.argv[2])
      });
      
      lineReader.on('line', function (line) {
        execCommand(line)
      });
}else{
    askForCommand()
}

function onErr(err) {
    console.log(err);
    return 1;
}