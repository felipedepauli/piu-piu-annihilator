const fs = require('fs');

const FIFO_PATH = '/tmp/synapse';
const FIFO_PATH_RETURN = '/tmp/synapse_return'

const sendCommand = (command) => {
    fs.writeFileSync(FIFO_PATH, command, { flag: 'a' });
};

exports.shoot = (req, res) => {
    sendCommand('shoot');
    console.log("[CommandController::Info] shooting");

    // Read the response from the FIFO
    setTimeout(() => {
        let response = fs.readFileSync(FIFO_PATH_RETURN, 'utf8').trim();
        console.log("Class =", response)

        
        // Send the response to the client
        res.send({ message: 'Command shoot sent.', detectedClass: response });
    }, 300)
};

exports.left = (req, res) => {
    sendCommand('left');
    console.log("[CommandController::Info] lefting")
    res.send('Command left sent.');
};

exports.right = (req, res) => {
    sendCommand('right');
    console.log("[CommandController::Info] righting")
    res.send('Command right sent.');
};

exports.up = (req, res) => {
    sendCommand('up');
    console.log("[CommandController::Info] uping")
    res.send('Command up sent.');
};

exports.down = (req, res) => {
    sendCommand('down');
    console.log("[CommandController::Info] downing")
    res.send('Command down sent.');
};

exports.centralize = (req, res) => {
    sendCommand('centralize');
    console.log("[CommandController::Info] centralizing")
    res.send('Command centralize sent.');
};
