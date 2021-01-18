const http = require('http');
const fs = require('fs');
const sass = require('sass');

function renderScss(){
  const renderedScss = sass.renderSync({
    file: 'scss/index.scss',
    // includePaths: [__dirname +'/scss'],
    outFile: __dirname + '/my-css.css',
    outputStyle: 'compressed'
  })
  fs.writeFileSync(__dirname + '/my-css.css', renderedScss.css);
}


const server = http.createServer((req, res)=>{
  if(req.url === '/'){
    renderScss();

    const html = fs.readFileSync(__dirname + '/index.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(html);
  } else {
    if(fs.existsSync(__dirname + '/' +req.url)){
      res.writeHead(200, { 'Content-Type': 'text/css' });
      const r = fs.readFileSync(__dirname + '/' +req.url);
      res.write(r)
    } else {
      res.writeHead(404)
    }

  }
  res.end();
})
server.listen(5000);
console.log('Open http://localhost:5000')
