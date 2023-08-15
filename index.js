import express from 'express';
import bodyParser from 'body-parser';
import {JSDOM} from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = dom.window;
global.document = window.document;


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get('/', (req, res)=>{
    res.render('index.ejs', {
        list: toDoList,
        dayText: dayText,
        title: listTitle,
        month: month,
        day: day
    });
});


let toDoList = [];
app.post('/add', (req, res)=> {
    var todo = req.body['todo'];
    toDoList.push(todo);
    res.redirect('/');
});

document.addEventListener('change', function () {
    //save
})

app.post('/update-line', (req, res)=>{
    var theLineIndex = parseInt(req.body['update']); 
    toDoList[theLineIndex] = "I want to make this update";
    res.redirect('/');
})



app.post('/remove', (req, res)=>{
    var index = parseInt(req.body['remove']);
    toDoList.splice(index, 1);
    res.redirect('/');
});


var dayText = ""
var month = ""
var day = ""
var listTitle = ""
var previousDate = "choose date"
app.post('/update', (req, res)=>{
    var date = new Date(req.body['date']);
    if (date === NaN) {
        date = previousDate
    } else {
        previousDate = date;
        var dayTextIndex = date.getDay();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        dayText = days[dayTextIndex]
        month = date.getMonth() + 1;
    
        if (date.getDate() === 31) {
            day = date.getDate();
        } else {
            day = date.getDate() + 1;
        }
    }

    listTitle = req.body['title'];

    res.redirect('/');
});


app.listen(port, ()=>{
    console.log(`Server is running on ${port}.`);
});

