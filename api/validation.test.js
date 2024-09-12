const request = require('supertest');
const jsonServer = require('json-server');
const app = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const { validateCategory, validateSubCategory, validateBrand, validateBanner } = require('./validation');

app.use(middlewares);
app.use(jsonServer.bodyParser);

// Routes and middlewares for tests
app.post('/categories', validateCategory, (req, res) => {
	res.status(201).json(req.body);
});

app.post('/subcategories', validateSubCategory, (req, res) => {
	res.status(201).json(req.body);
});

app.post('/brands', validateBrand, (req, res) => {
	res.status(201).json(req.body);
});

app.post('/banners', validateBanner([]), (req, res) => {
	res.status(201).json(req.body);
});

describe('POST /categories', () => {
	it('should validate category data', async () => {
		const response = await request(app).post('/categories').send({ name: 'A', description: 'Short desc' });

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('name');
		expect(response.body).not.toHaveProperty('description');
		expect(response.body.name).toBe('The name must be at least 2 characters long');
	});
});

describe('POST /subcategories', () => {
	it('should validate subcategory data', async () => {
		const response = await request(app).post('/subcategories').send({ name: 'A', description: 'Short desc' });

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('name');
		expect(response.body).not.toHaveProperty('description');
		expect(response.body.name).toBe('The name length should be at least 2 characters');
	});
});

describe('POST /brands', () => {
	it('should validate brand data', async () => {
		const response = await request(app).post('/brands').send({ name: 'A' });

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('name');
	});
});

describe('POST /banners', () => {
	it('should validate banner data', async () => {
		const response = await request(app).post('/banners').send({
			season: 'Summer 2024 Collection',
			title: 'New Collection',
			subtitle: 'Best Deals',
			categoryId: 1,
		});

		console.log('Response:', response.body);
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('message', 'Banner created successfully');
		expect(response.body).toHaveProperty('banner');
		expect(response.body.banner).toHaveProperty('season', 'Summer 2024 Collection');
		expect(response.body.banner).toHaveProperty('title', 'New Collection');
		expect(response.body.banner).toHaveProperty('subtitle', 'Best Deals');
	});
});
