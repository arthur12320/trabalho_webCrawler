const fs = require('fs');

function ParseText(input){
    let results;
    try {
        results = JSON.parse(input)
        if (!results.links) {
            console.log('please put links inside "links": param as array')
            process.kill(process.pid)
        }
        results = results.links;
    } catch (err) {
        results = input.replace('\n', '').replace('\a', '').split(',');
    }
    return results;
}

function readInput(){
    //inport links in txt or json
    let contents;
    if(fs.existsSync('./links.txt')){
        contents = fs.readFileSync('./links.txt', 'utf8');
        
    }else if(fs.existsSync('./links.json')){
        contents = fs.readFileSync('./links.json', 'utf8');
    }
    return ParseText(contents);

}

module.exports = readInput;