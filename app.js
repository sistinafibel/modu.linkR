global.__base = __dirname + '/'; //절대경로 확인용도 처리

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

let compression = require('compression') //gzip 설정

//라우팅설정
let indexRouter = require('./routes/main/mainController');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(compression()); //gzip 설정

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/script', express.static(__dirname + "/script"));

//commons는 모든 데이터를 경로로 가져옴. 경로 추가시켜줘야함 (http://127.0.0.1:8080/img/test.jpg)
app.use('/commons', express.static(__dirname + "/commons"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  console.error("> ********************************************");
  console.error("> ERROR MESSAGE : " , err.message);
  console.error("> ERROR STATUS CODE : " , err.status || 500);
  console.error("> ********************************************");

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.error2 = err.status || 500;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

