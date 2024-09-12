const jsonServer = require('json-server');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { validateCategory, validateSubCategory, validateBrand, validateBanner } = require('./validation');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Multer storage configuration
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		let uploadPath = 'public/images/';
		const type = req.body.type;
		const categories = router.db.get('categories').value();
		const category = categories.find((cate) => cate.id === parseInt(req.body.categoryId));

		// Function to sanitize category name (remove spaces, special characters)
		const sanitizeCategoryName = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, '');

		// Determine the upload path based on the type
		switch (type) {
			case 'brand':
				uploadPath += 'brands/';
				break;
			case 'banner':
				uploadPath += `banners/${sanitizeCategoryName(category.name)}/`;
				break;
			case 'employee':
				uploadPath += 'employees/';
				break;
			case 'product':
				uploadPath += req.body.category === 'men' ? 'products/men/' : 'products/women/';
				break;
			case 'customer':
				uploadPath += 'customers/';
				break;
			default:
				return cb(new Error('Invalid type or missing directory'));
		}

		if (!fs.existsSync(uploadPath)) {
			fs.mkdirSync(uploadPath, { recursive: true });
		}

		cb(null, uploadPath);
	},
	filename: (req, file, cb) => {
		const imageFilename = file.originalname;
		req.body.imageFilename = imageFilename;
		cb(null, imageFilename);
	},
});

// Define multer with file filter for images only
const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		const fileTypes = /jpeg|jpg|png/;
		const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
		const mimetype = fileTypes.test(file.mimetype);

		if (mimetype && extname) {
			return cb(null, true);
		} else {
			cb('Error: Only image files are allowed!');
		}
	},
}).single('image');

// You can use the one used by JSON Server
server.use(upload);

// Validation middleware for '/categories'
server.post('/categories', validateCategory);
// Validation middleware for PATCH on '/categories/:id'
server.patch('/categories/:id', validateCategory);

// Validation middleware for '/subcategories'
server.post('/subcategories', validateSubCategory);
// Validation middleware for PATCH on '/subcategories/:id'
server.patch('/subcategories/:id', validateSubCategory);

// Validation middleware for '/brands'
server.post('/brands', validateBrand);
// Validation middleware for PATCH on '/brands/:id'
server.patch('/brands/:id', validateBrand);

// Validation middleware for get '/categories/:id/banners'
server.get('/banners/:id', (req, res) => {
	const bannerId = parseInt(req.params.id, 10);
	const banner = router.db.get('banners').find({ id: bannerId }).value();

	if (!banner) {
		return res.status(404).json({ message: 'Banner not found' });
	}

	res.status(200).json({ banner });
});

// Validation middleware for '/banners'
const categories = router.db.get('categories').value();
server.post('/banners', validateBanner(categories), (req, res) => {
	const banners = router.db.get('banners').value();
	const newId = banners.length ? Math.max(...banners.map((b) => b.id)) + 1 : 1;

	const newBanner = {
		id: newId,
		season: req.body.season,
		title: req.body.title,
		subtitle: req.body.subtitle,
		categoryId: parseInt(req.body.categoryId, 10),
		imageUrl: req.body.imageFilename || '',
	};

	router.db.get('banners').push(newBanner).write();

	res.status(201).json({
		message: 'Banner created successfully',
		banner: newBanner,
	});
});

// Validation middleware for PATCH on '/banners/:id'
server.patch('/banners/:id', upload, validateBanner(categories), (req, res) => {
	console.log('Request Body:', req.body);
	console.log('Uploaded File:', req.file);

	const bannerId = parseInt(req.params.id);
	const banners = router.db.get('banners');
	const bannerIndex = banners.findIndex({ id: bannerId }).value();

	if (bannerIndex === -1) {
		console.error('Banner not found:', bannerId);
		return res.status(404).json({ message: 'Banner not found' });
	}

	const updatedBanner = {
		...banners.get(bannerIndex).value(),
		...req.body,
	};

	if (req.file) {
		console.log('Updating image URL:', req.file.filename);
		updatedBanner.imageUrl = req.file.filename;
	}

	banners.get(bannerIndex).assign(updatedBanner).write();

	res.status(200).json({
		message: 'Banner updated successfully',
		banner: updatedBanner,
	});
});

// Error handling middleware
server.use((err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		console.error('Multer error:', err);
		res.status(400).json({ error: 'Invalid file upload: ' + err.message });
	} else if (err.message) {
		console.error('Error:', err.message);
		res.status(400).json({ error: 'Validation error: ' + err.message });
	} else {
		console.error('Unexpected error:', err);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Use default router
server.use(router);
server.listen(4000, () => {
	console.log('JSON Server is running');
});
