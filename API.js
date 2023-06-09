const express = require('express')
const app = express()
const port = 3000


/*
app.get('/user/:id', (req, res) => {
    const p=req.params;
    console.log(p);
})
*/
app.get('/user/:id', (req, res) => {
    const q = req.query;
    console.log(q);
})

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/dog', function (req, res) {
    res.send("<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Dog_coat_variation.png/330px-Dog_coat_variation.png'></img><h1>강아지</h1>")//{'sonud' : '멍멍'}
  })

app.get('/cat', function (req, res) {
    res.send({'sonud' : '야옹'})
})
app.get('/pig', function (req, res) {
    res.send({'sonud' : '꿀꿀'})
})


app.listen(port , () => {
    console.log(`Example app listening on port ${port}`)
})