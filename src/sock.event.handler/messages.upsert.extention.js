const fs = require('fs');

const saveMediaToFile = (path, filename, data) => {

    fs.writeFile(`${path}\\${filename}`, data, err => {
        if (err) {
            console.log(err);
        }
    });

}

const saveStringBase64ToFile = (path, filename, data) => {

    fs.writeFile(`${path}\\${filename}`, data, 'base64', err => {
        if (err) {
            console.log(err);
        }
    });

}

const saveStream = async (path, filename, stream) => {    
    try {
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }

        // save to file
        const fileContent = new Buffer.from(buffer, 'base64')
        saveMediaToFile(path, filename, fileContent);

    } catch (error) {
        console.log(`saveMedia::ex: ${error}`);
    }
}

const saveStringBase64 = async (path, filename, stringBase64) => {    
    try {
        saveStringBase64ToFile(path, filename, stringBase64);
    } catch (error) {
        console.log(`saveStringBase64::ex: ${error}`);
    }
}

module.exports = { saveMediaToFile, saveStream, saveStringBase64 };