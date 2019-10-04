const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');
const slugify = require('slugify');

///////////////////////////////////////////
//files
//////////////////////////////////////////
// const hello = "Hello World";

// ** reading and writing file synchronously ** //

// reading the file
// const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textInput);

// writing to file

// const textOutput = `this is what we know about avacado: ${textInput}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textOutput);
// console.log('file written!');

// ** reading and writing file asynchronously ** //

// reading a file
//in readfile function  we have 3 arg url, type and callbackfunction

// fs.readFile('./txt/start.txt', 'utf-8' , (err, data1)=>{
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8' , (err, data2)=>{
//         console.log(data2);
//     });
// });

/////////////////////////////////////
// ** creating a webserver ** //
////////////////////////////////////

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);

console.log(slugify('Fresh Avacado', { lower: true }));
const server = http.createServer((req, res) => {
  //console.log(req);
  //console.log(req.url);
  const { query, pathname } = url.parse(req.url, true);
  const pathName = req.url;

  //Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    //Product page
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //Api
  } else if (pathname === '/api') {
    //gettingthe response
    res.writeHead(200, { 'Content-type': 'application/json' });
    //showing data
    res.end(data);

    //Not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html'
      /// this header and 404 error should always be send before request
    });
    res.end('<h1>Page not found!</h1>');
  }
});

//listening to incoming request fronm client
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000');
});

// 127.0.0.1 is standard ip address of localhost
