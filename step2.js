const fs = require('fs');
const axios = require('axios');
const process = require('process') 

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
        let resp = await axios.get(URL)
        console.log(resp.data);
    }   
    catch(err){
        console.error(`Error fetching url`);
        process.exit(1);
    }
}

const args = process.argv.slice(2);

if (args.length === 0) {
    console.error("Please provide a file path or URL as an argument.");
    process.exit(1); 
} else {
    
    if (args[0].startsWith('http://') || args[0].startsWith('https://')) {
        webCat(args[0]);
    } else {
        cat(args[0]);
    }
}

module.exports = { cat, webCat };