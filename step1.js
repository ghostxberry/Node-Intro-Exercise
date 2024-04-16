const fs = require('fs');

const cat = (path) => {
    try {
        const data = fs.readFileSync(path, 'utf8');
        console.log(`File contents of ${path}:`);
        console.log(data);
    } catch (err) {
        console.error(err);
    }
};

module.exports = cat;
