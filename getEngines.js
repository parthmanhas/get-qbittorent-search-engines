const fs = require('fs');
const axios = require('axios');

fs.readFile("./searchEngineList.json", "utf8", function (err, data) {
    const list = JSON.parse(data);
    // to see how many files downloaded successfully
    let count = 0;
    console.log('total search engines ', list.length);
    list.forEach(async url => {
        let fileName = url.split('/');
        fileName = fileName[fileName.length - 1];
        await axios.get(url)
            .then(res => {
                fs.appendFile(fileName, res.data, () => console.log(fileName, ' saved'));
                console.log(++count);
            })
            .catch(e => {
                console.log(fileName, e.message);
            })
    })
});