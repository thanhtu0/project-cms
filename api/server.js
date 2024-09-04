const jsonServer = require('json-server');
const multer = require('multer');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		let uploadPath = 'public/images/';
		if (req.body.type === 'product') {
			uploadPath += req.body.category === 'men' ? 'products/men' : 'products/women';
		} else if (req.body.type === 'employee') {
			uploadPath += 'employees';
		} else if (req.body.type === 'customer') {
			uploadPath += 'customers';
		} else if (req.body.type === 'brands') {
			uploadPath += 'brands';
		} else {
			uploadPath += 'default';
		}
		cb(null, uploadPath);
	},
	filename: function (req, file, cb) {
		let date = new Date();
		let imageFilename = date.getTime() + '_' + file.originalname;
		req.body.imageFilename = imageFilename;
		cb(null, imageFilename);
	},
});

const bodyParser = multer({ storage: storage }).any();

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(bodyParser);
server.post('/categories', (req, res, next) => {
	let hasErrors = false;
	let errors = {};

	if (req.body.name.length < 2) {
		hasErrors = true;
		errors.name = 'The name length should be at least 2 characters';
	}
	if (req.body.description.length < 10) {
		hasErrors = true;
		errors.description = 'The description length should be at least 2 characters';
	}

	if (hasErrors) {
		// return bad request (400) with validationnode cls errors
		res.status(400).jsonp(errors);
		return;
	}

	// Continue to JSON Server router
	next();
});

// Use default router
server.use(router);
server.listen(4000, () => {
	console.log('JSON Server is running');
});
