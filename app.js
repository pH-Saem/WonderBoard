const express = require('express');

const router = express.Router();
const app = express();

const url = 'localhost:3000';

// public 디렉토리를 static으로 기억한다.
// public 내부의 파일들을 localhost:3000/파일명 으로 브라우저에서 불러올 수 있다.
app.use(express.static('public'));

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

app.use((req, res, next) => {
	console.log('첫 번째 미들웨어에서 요청을 처리함.');
	next();
});
/*
// request 와 response 라는 인자를 줘서 콜백 함수를 만든다.
// localhost:3000 브라우저에 res.sendFile() 내부의 파일이 띄워진다.
app.get("/", (req, res) => {
	console.log("Router : /");
	res.sendFile(__dirname + "/home.html");
});
*/

router.use((req, res, next) => {
	next();
});

const home_data = {
	data: [
		{
			board_name: '자유게시판',
			posts: [
				{ post_title: 'CrossCode', post_date: '2022-01-24' },
				{ post_title: 'Hollow Knight', post_date: '2021-08-04' },
				{ post_title: 'Terraria', post_date: '2020-12-16' },
				{
					post_title: 'Phoenotopia Awakening',
					post_date: '2022-01-22',
				},
			],
		},
		{
			board_name: '공략게시판',
			posts: [
				{ post_title: 'CrossCode', post_date: '2022-01-24' },
				{ post_title: 'Hollow Knight', post_date: '2021-08-04' },
				{ post_title: 'Terraria', post_date: '2020-12-16' },
				{
					post_title: 'Phoenotopia Awakening',
					post_date: '2022-01-22',
				},
			],
		},
		{
			board_name: '구인게시판',
			posts: [
				{ post_title: '샤로나이트 광산', post_date: '2012-01-24' },
				{ post_title: '검은바위산', post_date: '2017-08-04' },
				{ post_title: '운명의 산', post_date: '1720-12-16' },
				{ post_title: '에레보르', post_date: '2012-01-22' },
			],
		},
		{
			board_name: '홍보게시판',
			posts: [
				{ post_title: 'CrossCode', post_date: '2022-01-24' },
				{ post_title: 'Hollow Knight', post_date: '2021-08-04' },
				{ post_title: 'Terraria', post_date: '2020-12-16' },
				{
					post_title: 'Phoenotopia Awakening',
					post_date: '2022-01-22',
				},
			],
		},
	],
};

const board_data = [
	{
		post_title: 'Celeste',
		post_date: '1231-12-21',
		post_writer: 'Madeline',
	},
	{
		post_title: 'FTL: Faster Than Light',
		post_date: '1231-12-21',
		post_writer: 'Madeline',
	},
	{
		post_title: 'Ori and the Blind Forest',
		post_date: '1231-12-21',
		post_writer: 'Ori',
	},
	{
		post_title: 'Ori and the Will of the Wisps',
		post_date: '1231-12-21',
		post_writer: 'Ori',
	},
	{
		post_title: 'Rhythm Doctor',
		post_date: '1231-12-21',
		post_writer: 'Madeline',
	},
];

const boards = ['자유게시판', '공략게시판', '구인게시판', '홍보게시판'];

router.get('/', (req, res) => {
	res.render('home', home_data);
});

router.get('/board/:num', (req, res) => {
	res.render('board', {
		board_name: boards[req.params.num],
		data: board_data,
	});
});

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use('/', router);

// 3000 포트로 서버 오픈
app.listen(3000, () => {
	console.log('start! express server on port 3000');
});
