const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
/* 
it works, but formatting is messed up

const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' })
  fs.createReadStream('index.html').pipe(res)
})

server.listen(process.env.PORT = 3000, () => {
  console.log(`Server is listening on port: http://localhost:${process.env.PORT}/`)
})
*/

// app.use(express.static(path.join(__dirname, "../build")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static('public'))
app.use('/public', express.static(path.resolve(__dirname, 'public')))

const apiRouter = router.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve('./index.html'));
});

app.use('/', apiRouter);

app.use((req, res) => {
  res.status(404).send('This is the 404 page you\'re looking for...');
});

// app.use('/', apiRouters);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`Server is listening on port: http://localhost:${port}/`)
})