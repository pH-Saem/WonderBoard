const models = require("./models");

var mysql = require('mysql');

//각자 컴퓨터에 맞춰 수정 필요
var db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'potato',
  database : 'database_development'
});

db.connect();

const member = {};
const post = {};
const board = {};
const records = {};

// member 테이블에 새 레코드 추가(회원 가입)
member.add = function(name, ID, PW)
{
    models.Member.create({
        member_name: name,
        member_ID: ID,
        member_PW: PW
    }).then(_ => console.log("New member data is added."));
}

// member 테이블의 모든 레코드 검색
member.searchAll = function()
{
    models.Member.findAll().then(console.log);
}

// member 테이블에서 레코드 삭제
member.delete = function(ID)
{
    models.Member.destroy({where: {member_ID: ID}})
    .then(_=> console.log("Member data was deleted."));
}

// member 테이블에서 레코드 갱신(비밀 번호 수정)
member.update = function(ID, PW)
{
    models.Member.findOne({where: {member_ID: ID}})
    .then(result => {
        if(result)
        {
            result.update({member_PW: PW})
            .then(_=> console.log("Member data is updated."));
        }
    });
}

// member 테이블에서 ID로 검색(ID 중복 검사)
member.searchByID = function(ID)
{
    models.Member.findAll({where: {member_ID: ID}}).then(console.log);
}

// post 테이블에 새 레코드 추가(글쓰기)
post.add = function(ID, title, date, writer, category, content)
{
    models.Post.create({
        post_ID: ID,
        post_title: title,
        post_date: date,
        post_writer: writer,
        post_category: category,
        post_content: content
    }).then(_=> console.log("New post data is added."));
}

// post 테이블에서 레코드 삭제(글 삭제)
post.delete = function(ID)
{
    models.Post.destroy({where: {post_ID: ID}})
    .then(_=> console.log("Post data was deleted."));
}

// post 테이블에서 레코드 갱신(글 수정)
post.update = function(ID, title, content)
{
    models.Post.findOne({where: {post_ID: ID}})
    .then(result => {
        if(result)
        {
            result.update({post_title: title}, {post_content: content})
            .then(_=> console.log("Post data is updated."));
        }
    });
}

// post 테이블의 모든 레코드 검색
post.searchAll = function()
{
    models.Post.findAll().then(console.log);
}

// post 테이블에서 ID로 검색
post.searchByID = function(ID)
{
    models.Post.findAll({where: {post_ID: ID}}).then(console.log);
}

// post 테이블에서 title로 검색
post.searchByTitle = function(title)
{
    models.Post.findAll({where: {post_title: title}}).then(console.log);
}

// post 테이블에서 writer로 검색
post.searchByWriter = function(writer)
{
    models.Post.findAll({where: {post_writer: writer}}).then(console.log);
}

// post 테이블에서 category로 검색
post.searchByCategory = function(category)
{
    models.Post.findAll({where: {post_category: category}}).then(console.log);
}

// board 테이블에 새 레코드 추가
board.add = function(name, ID)
{
    models.Board.create({
        Board_name: name,
        Board_ID: ID
    }).then(_ => console.log("New board data is added."));
}

// board 테이블의 모든 레코드 검색
board.searchAll = function()
{
    models.Board.findAll().then(console.log);
}

// board 테이블에서 레코드 삭제
board.delete = function(ID)
{
    models.Board.destroy({where: {board_ID: ID}})
    .then(_=> console.log("Board data was deleted."));
}

// board 테이블에서 ID로 검색
board.searchByID = function(ID)
{
    models.Board.findAll({where: {board_ID: ID}}).then(console.log);
}

// board 테이블에서 레코드 갱신
board.update = function(ID, name)
{
    models.Board.findOne({where: {board_ID: ID}})
    .then(result => {
        if(result)
        {
            result.update({board_name: name})
            .then(_=> console.log("Board data is updated."));
        }
    });
}

// 1번 페이지
records.home = function()
{
    var data = [];

    db.query("select * from board_table", function(errorb, boards){
        if(errorb) throw errorb;
        for(var i = 0;i < boards.length;i++)
        {
            data[i].board_name = boards[i].board_name;
            db.query("select post_ID, post_title, post_date from post_table where post_category = ?", boards[i].board_ID, function(errorp, posts){
                if(errorp) throw errorp;
                data[i].posts = posts;
            });
        }
    });

    return data;
}

// 4번 페이지
records.board = function(ID)
{
    var data;

    db.query("select post_ID, post_title, post_date, post_writer from post_table where post_category = ?", ID, function(error, result){
        if(error) throw error;
        data = result;
        console.log(data[0].post_ID);
    });
    return data;
}

// 5번 페이지
records.view = function(ID)
{
    var data;
    
    db.query("select * from post_table where post_ID = ?", ID, function(error, result){
        if(error) throw error;
        data = result;
    });

    return data;
}

exports.member = member;
exports.post = post;
exports.board = board;
exports.records = records;