const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
// 이미지 파일 전송하기 위한 변수
const fs = require('fs');

//게임 종료시 팀 순위 나타내기 위한 배열 생성
var teamscore = [];
teamscore[0] = 30;
teamscore[1] = 70;
teamscore[2] = 60;
teamscore[3] = 20;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("disconnect", function(){
    console.log("user disconnected");
  })

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

//카드 누르기
io.on('connection', (socket) => {
    socket.on('pick card', ({row, col}) => {
        io.emit('success pick card', {row, col, cardNum: 1, uid: 100});
        io.emit('success match', {teamscore: 10, team:0});
        // io.emit('fail match', );
    });
    //새로운 라운드
    io.emit('new round', {round: 3});
    //시간 세기
    io.emit('count time', {time: 2});

    //게임 종료
    io.emit('gameover', {teamscore});
  });