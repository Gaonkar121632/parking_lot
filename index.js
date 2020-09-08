#!/usr/bin/env node

const prompt = require('prompt');
const { leave, park, createParkingLot, getRegIdByColor, getSlotByColor, getSlotByRegNumber, status } = require('./controller');



function execCommand(command) {
    let splitCmd = command.split(' ');
    let result = ''
    switch (splitCmd[0]) {
        case "create_parking_lot":
            result = createParkingLot(splitCmd[1])
            break;
        case "park":
            result = park(splitCmd[1], splitCmd[2])
            break;
        case "leave":
            result = leave(splitCmd[1])
            break;
        case "registration_numbers_for_cars_with_colour":
            result = getRegIdByColor(splitCmd[1]);
            break;
        case "slot_numbers_for_cars_with_colour":
            result = getSlotByColor(splitCmd[1])
            break;
        case "slot_number_for_registration_number":
            result = getSlotByRegNumber(splitCmd[1])
            break;
        case "status":
            result = status();
            break;
        default:
            break;
    }
    console.log(result);
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
if (process.argv.length > 2) {
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(process.argv[2])
    });

    lineReader.on('line', function (line) {
        execCommand(line)
    });
} else {
    askForCommand()
}

function onErr(err) {
    console.log(err);
    return 1;
}