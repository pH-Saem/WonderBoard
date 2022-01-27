const express = require('express');
const mysql = require('mysql2');

const router = express.Router();
const app = express();

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'phsaem',
	database: 'database_development',
	multipleStatements: true,
	debug: false,
});

// public 디렉토리를 static으로 기억한다.
// public 내부의 파일들을 localhost:3000/파일명 으로 브라우저에서 불러올 수 있다.
app.use(express.static(__dirname + '/public'));

// POST 방식으로 받은 요청의 body 확인을 위한 파싱
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
	console.log('BodyParser Test');

	const paramID = req.body.id || req.query.id;
	const paramPW = req.body.pw || req.query.pw;

	console.log(`ID : ${paramID} PW : ${paramPW}`);
	next();
});

router.use((req, res, next) => {
	next();
});

router.get('/', (req, res) => {
	const sql1 = 'SELECT * FROM board_table;';
	const sql2 =
		'SELECT post_category, post_title, post_date, post_ID FROM post_table;';
	db.query(sql1 + sql2, (err, results) => {
		console.log(results);
		res.render('home', { boards: results[0], posts: results[1] });
	});
});

router.get('/board/:num', (req, res) => {
	const sql1 = 'SELECT * FROM board_table;';
	const sql2 =
		'SELECT post_title, post_date, post_ID FROM post_table WHERE post_category = ?;';
	const sql = sql1 + mysql.format(sql2, req.params.num);
	db.query(sql, (err, results) => {
		console.log(results);
		res.render('board', {
			boards: results[0],
			category: req.params.num,
			data: results[1],
		});
	});
});

router.get('/view/:num', (req, res) => {
	const sql = 'SELECT * FROM post_table where post_id = ?';
	db.query(sql, req.params.num, (err, result) => {
		[post] = result;
		console.log(post);
		res.render('view', {
			data: post,
		});
	});
});

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use('/', router);

// 3000 포트로 서버 오픈
app.listen(3000, () => {
	console.log('start! express server on port 3000');
});

module.exports = app;
