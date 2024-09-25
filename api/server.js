const jsonServer = require('json-server');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
	validateCategory,
	validateSubCategory,
	validateBrand,
	validateBanner,
	validateContact,
} = require('./validation');
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

		if (!type) {
			return cb(new Error('Type is required'));
		}

		if (type !== 'brand' && !req.body.categoryId) {
			return cb(new Error('CategoryId is missing'));
		}

		let category;
		if (type !== 'brand') {
			const categories = router.db.get('categories').value();
			category = categories.find((cate) => cate.id === parseInt(req.body.categoryId));

			if (!category) {
				return cb(new Error('Invalid categoryId'));
			}
		}

		// Function to sanitize category name (remove spaces, special characters)
		const sanitizeCategoryName = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, '');

		// Determine the upload path based on the type
		switch (type) {
			case 'brand':
				uploadPath += 'brands/';
				break;
			case 'banner':
				if (category) {
					uploadPath += `banners/${sanitizeCategoryName(category.name)}/`;
				}
				break;
			case 'employee':
				uploadPath += 'employees/';
				break;
			case 'product':
				if (req.body.category === 'men') {
					uploadPath += 'products/men/';
				} else if (req.body.category === 'women') {
					uploadPath += 'products/women/';
				} else {
					return cb(new Error('Invalid product category'));
				}
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

module.exports = multer({ storage });

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

// Validation middleware for '/categories' and PATCH on 'categories/:id
server.post('/categories', validateCategory);
server.patch('/categories/:id', validateCategory);

// Validation middleware for '/subcategories' and PATCH on '/subcategories/:id'
server.post('/subcategories', validateSubCategory);
server.patch('/subcategories/:id', validateSubCategory);

// Validation middleware for '/brands' and for PATCH on '/brands/:id'
server.post('/brands', validateBrand, (req, res) => {
	const brands = router.db.get('brands').value();
	const newId = brands.length ? Math.max(...brands.map((b) => b.id)) + 1 : 1;

	const newBrands = {
		id: newId,
		name: req.body.name,
		imageUrl: req.body.imageFilename || '',
	};

	router.db.get('brands').push(newBrands).write();

	res.status(201).json({
		message: 'Brands updated successfully',
		brand: newBrands,
	});
});
server.patch('/brands/:id', validateBrand, (req, res) => {
	const brandId = parseInt(req.params.id, 10);
	const { name } = req.body;
	const imageFilename = req.file ? req.file.filename : req.body.imageFilename;

	const brand = router.db.get('brands').find({ id: brandId }).value();

	if (!brand) {
		return res.status(404).json({ message: 'Banner not found' });
	}

	const updateBrand = {
		...brand,
		name: name || brand.name,
		imageUrl: imageFilename || brand.imageUrl,
	};

	router.db.get('brands').find({ id: brandId }).assign(updateBrand).write();

	res.status(200).json({
		message: 'Brand updates successfully',
		brand: updateBrand,
	});
});

// Validation middleware for '/contact'
server.patch('/contacts/:id', validateContact, (req, res) => {
	try {
		const contactId = parseInt(req.params.id, 10);
		if (isNaN(contactId)) {
			return res.status(400).json({ message: 'Invalid contact ID' });
		}

		const contact = router.db.get('contacts').find({ id: contactId }).value();
		if (!contact) {
			return res.status(404).json({ message: 'Contact not found' });
		}

		const { name, telephone, email, address } = req.body;

		if (!name || !telephone || !email || !address) {
			return res.status(400).json({ message: 'All fields are required' });
		}

		const updatedContact = {
			...contact,
			name: name || contact.name,
			telephone: telephone || contact.telephone,
			email: email || contact.email,
			address: address || contact.address,
		};

		router.db.get('contacts').find({ id: contactId }).assign(updatedContact).write();

		res.status(200).json({
			message: 'Contact updated successfully',
			contact: updatedContact,
		});
	} catch (error) {
		console.error('Error updating contact:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

// Validation middleware for get '/categories/:id/banners'
server.get('/banners/:id', (req, res) => {
	const bannerId = parseInt(req.params.id, 10);
	const banner = router.db.get('banners').find({ id: bannerId }).value();

	if (!banner) {
		return res.status(404).json({ message: 'Banner not found' });
	}

	res.status(200).json({ banner });
});

// Validation middleware for '/banners' and PATCH on '/banners/:id'
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
server.patch('/banners/:id', validateBanner(categories), (req, res) => {
	const bannerId = parseInt(req.params.id, 10);
	const { season, title, subtitle, categoryId } = req.body;
	const imageFilename = req.file ? req.file.filename : req.body.imageFilename;

	const banner = router.db.get('banners').find({ id: bannerId }).value();

	if (!banner) {
		return res.status(404).json({ message: 'Banner not found' });
	}

	const updatedBanner = {
		...banner,
		season: season || banner.season,
		title: title || banner.title,
		subtitle: subtitle || banner.subtitle,
		categoryId: parseInt(categoryId, 10) || banner.categoryId,
		imageUrl: imageFilename || banner.imageUrl,
	};

	router.db.get('banners').find({ id: bannerId }).assign(updatedBanner).write();

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
