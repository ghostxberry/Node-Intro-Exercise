const fs = require('fs');
const axios = require('axios');
const process = require('process');

const cat = (path) => {
    try {
        const data = fs.readFileSync(path, 'utf8');
        console.log(`File contents of ${path}:`);
        console.log(data);
    } catch (err) {
        console.error(err);
    }
};

const webCat = async (URL) => {
    try {
        const resp = await axios.get(URL);
        console.log(resp.data);
    } catch(err) {
        console.error(`Error fetching URL: ${URL}`);
        process.exit(1);
    }
};

const args = process.argv.slice(2);

if (args.length === 0) {
    console.error("Please provide a file path or URL as an argument.");
    process.exit(1); 
} else {
    if (args[0] === '--out' && args.length >= 3) {
        const outputPath = args[1];
        const source = args[2];
        if (source.startsWith('http://') || source.startsWith('https://')) {
            const data = await axios.get(source).then(response => response.data);
            fs.writeFile(outputPath, data, (err) => {
                if (err) {
                    console.error(`Couldn't write ${outputPath}:`);
                    console.error(err);
                    process.exit(1);
                }
                console.log(`${outputPath} was written successfully.`);
            });
        } else {
            cat(source);
            const data = fs.readFileSync(source, 'utf8');
            fs.writeFile(outputPath, data, (err) => {
                if (err) {
                    console.error(`Couldn't write ${outputPath}:`);
                    console.error(err);
                    process.exit(1);
                }
                console.log(`${outputPath} was written successfully.`);
            });
        }
    } else {
        if (args[0].startsWith('http://') || args[0].startsWith('https://')) {
            webCat(args[0]);
        } else {
            cat(args[0]);
        }
    }
}

module.exports = { cat, webCat };
