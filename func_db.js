const models = require("./models");

const member = {};
const post = {};

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

exports.member = member;
exports.post = post;