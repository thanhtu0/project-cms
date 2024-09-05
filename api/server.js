const jsonServer = require('json-server');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Multer storage configuration
// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		let uploadPath = 'public/images/';
// 		const type = req.body.type;

// 		if (!type) {
// 			console.log('Type is missing');
// 			cb(new Error('Invalid type or missing directory'));
// 			return;
// 		}

// 		switch (type) {
// 			case 'brand':
// 				uploadPath += 'brands/';
// 				break;
// 			// case 'employee':
// 			// 	uploadPath += 'employees/';
// 			// 	break;
// 			// case 'product':
// 			// 	uploadPath += req.body.category === 'men' ? 'products/men/' : 'products/women/';
// 			// 	break;
// 			// case 'customer':
// 			// 	uploadPath += 'customers/';
// 			// 	break;
// 			default:
// 				console.log(`Invalid type: ${type}`);
// 				cb(new Error('Invalid type or missing directory')); // Return error if type is invalid
// 				return;
// 		}

// 		// Ensure the directory exists
// 		if (!fs.existsSync(uploadPath)) {
// 			fs.mkdirSync(uploadPath, { recursive: true });
// 		}

// 		console.log(`Upload path: ${uploadPath}`);
// 		cb(null, uploadPath);
// 	},
// 	// Determine the filename
// 	filename: function (req, file, cb) {
// 		let imageFilename = file.originalname;
// 		req.body.imageFilename = imageFilename; // Store filename in body
// 		cb(null, imageFilename); // Pass the filename to multer
// 	},
// });
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/images/');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

// Create multer instance with the defined storage
const bodyParser = multer({ storage: storage }).any();

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(bodyParser);

// Validation middleware for '/categories'
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
		res.status(400).jsonp(errors);
		return;
	}

	next();
});
// Validation middleware for PATCH on '/categories/:id'
server.patch('/categories/:id', (req, res, next) => {
	let hasErrors = false;
	let errors = {};

	if (req.body.name.length < 2) {
		hasErrors = true;
		errors.name = 'The name length should be at least 2 characters';
	}
	if (req.body.description.length < 10) {
		hasErrors = true;
		errors.description = 'The description length should be at least 10 characters';
	}

	if (hasErrors) {
		res.status(400).jsonp(errors);
		return;
	}

	next();
});

// Validation middleware for '/subcategories'
server.post('/subcategories', (req, res, next) => {
	let hasErrors = false;
	let errors = {};

	if (req.body.name.length < 2) {
		hasErrors = true;
		errors.name = 'The name length should be at least 2 characters';
	}
	if (req.body.description.length < 10) {
		hasErrors = true;
		errors.description = 'The description length should be at least 10 characters';
	}

	if (hasErrors) {
		res.status(400).jsonp(errors);
		return;
	}

	next();
});
// Validation middleware for PATCH on '/subcategories/:id'
server.patch('/subcategories/:id', (req, res, next) => {
	let hasErrors = false;
	let errors = {};

	if (req.body.name.length < 2) {
		hasErrors = true;
		errors.name = 'The name length should be at least 2 characters';
	}
	if (req.body.description.length < 10) {
		hasErrors = true;
		errors.description = 'The description length should be at least 10 characters';
	}

	if (hasErrors) {
		res.status(400).jsonp(errors);
		return;
	}

	next();
});

// Validation middleware for '/brands'
server.post('/brands', (req, res, next) => {
	console.log('Request body:', req.body);

	let hasErrors = false;
	let errors = {};

	if (req.body.name.length < 2) {
		hasErrors = true;
		errors.name = 'The name length should be at least 2 characters';
	}

	if (hasErrors) {
		res.status(400).jsonp(errors);
		return;
	}

	next();
});

// Use default router
server.use(router);
server.listen(4000, () => {
	console.log('JSON Server is running');
});
