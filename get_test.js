const funcs = require("./func_db.js");

var data = funcs.records.board(123);
if(data)
  console.log("ttt");
//console.log(data[0].post_ID);
for(var i = 0;i < 2;i++)
{
  //console.log(data[i].post_ID + " " + data[i].post_title + " " + data[i].post_date + " " + data[i].post_writer);
}