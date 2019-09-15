const readInput = require('./input/fileParser');
const setBuffer = require('./buffer/buffer');
const {downloadHtml} = require('./download/download');


//get list of links from file
let inputLinks = readInput();

//implement "Buffer"
let buffer = [];
setBuffer(buffer);


//for each link, request body and save img tags to buffer
inputLinks.forEach(link => downloadHtml(link,buffer));



