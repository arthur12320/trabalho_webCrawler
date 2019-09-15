const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio');




const downloadIMG = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        const contentType = res.headers['content-type']
        console.log('content-type:', contentType);
        console.log('content-length:', res.headers['content-length']);
        if(contentType.substring(0,contentType.indexOf('/'))=='image'){
            let fileType = '.'+contentType.substring(contentType.indexOf('/')+1,contentType.length);
            if(fileType.includes('svg')){fileType = '.svg'}
            request(uri).pipe(fs.createWriteStream(filename+fileType)).on('close', callback);
        }   
    });
};

const downloadHtml = function (link,buffer){
    request.get(link,(err,res,body)=>{

        $ = cheerio.load(body);
        $('img').each(function(a, b) {
            let imglink = $(this).attr('src')
            if(!imglink.startsWith('http')){
                let firstPart = link.match(/^.*\//);
                imglink = firstPart + imglink;
            }
            console.log('found in html:',imglink);
            buffer.push(imglink);
        })
    })
}

module.exports = {downloadIMG,downloadHtml};