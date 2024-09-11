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
		const type = req.body.type || '';

		// Check if type is valid
		if (!type || !['brand', 'banner', 'employee', 'product', 'customer'].includes(type)) {
			return cb(new Error('Invalid type or missing directory'));
		}

		// Handle category-specific directories
		if (type === 'banner' || type === 'product') {
			const category = req.body.category || '';
			if (!['men', 'women'].includes(category.toLowerCase())) {
				return cb(new Error('Invalid category'));
			}
			uploadPath += `${type}s/${category.toLowerCase()}/`;
		} else {
			uploadPath += `${type}s/`;
		}

		// Ensure the directory exists
		if (!fs.existsSync(uploadPath)) {
			fs.mkdirSync(uploadPath, { recursive: true });
		}

		cb(null, uploadPath);
	},
	filename: (req, file, cb) => {
		const allowedMimeTypes = ['image/jpeg', 'image/png'];
		if (!allowedMimeTypes.includes(file.mimetype)) {
			return cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'));
		}
		const timestamp = Date.now();
		const imageFilename = `${timestamp}-${file.originalname}`;
		req.body.imageFilename = imageFilename;
		cb(null, imageFilename);
	},
});

// Create multer instance with the defined storage
const bodyParser = multer({ storage: storage }).any();

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(bodyParser);

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

// Validation middleware for '/banners'
server.post('/banners', validateBanner, (req, res) => {
	const bannerData = {
		name: req.body.name,
		description: req.body.description || '',
		category: req.body.category,
		imageUrl: req.body.imageFilename || '',
	};

	const banners = router.db.get('banners');
	banners.push(bannerData).write();

	res.status(201).json({ message: 'Banner created successfully', banner: bannerData });
});
// Validation middleware for PATCH on '/banners/:id'
server.patch('/banners/:id', validateBanner, (req, res) => {
	const bannerId = req.params.id;
	const banners = router.db.get('banners');
	const banner = banners.find({ id: parseInt(bannerId) }).value();

	if (!banner) {
		return res.status(404).json({ message: 'Banner not found' });
	}

	const updatedBanner = {
		...banner,
		name: req.body.name || banner.name,
		description: req.body.description || banner.description,
		category: req.body.category || banner.category,
		imageUrl: req.body.imageFilename || banner.imageUrl,
	};

	banners
		.find({ id: parseInt(bannerId) })
		.assign(updatedBanner)
		.write();

	res.status(200).json({ message: 'Banner updated successfully', banner: updatedBanner });
});

// Use default router
server.use(router);
server.listen(4000, () => {
	console.log('JSON Server is running');
});
