const {downloadIMG} = require('../download/download');
const treat = require('filenamify-url');

function setBuffer(array){
    setInterval(()=>{
        if(array[0]){
            let link = array.shift();
            let path = './results/' + treat(link);
            console.log('hit buffer:',path)
            downloadIMG(link,path,()=>{console.log('downloaded : ',path)});
        }
    },1)
}

module.exports = setBuffer;