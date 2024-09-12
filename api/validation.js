const validateCategory = (req, res, next) => {
	const { name, description } = req.body;
	let hasErrors = false;
	let errors = {};

	if (!name || name.trim().length < 2) {
		hasErrors = true;
		errors.name = 'The name must be at least 2 characters long';
	}
	if (description && description.trim().length < 10) {
		hasErrors = true;
		errors.description = 'The description must be at least 10 characters long';
	}

	if (hasErrors) {
		return res.status(400).json(errors);
	}
	next();
};

const validateSubCategory = (req, res, next) => {
	const { name, description } = req.body;
	let hasErrors = false;
	let errors = {};

	if (!name || name.trim().length < 2) {
		hasErrors = true;
		errors.name = 'The name length should be at least 2 characters';
	}
	if (description && description.trim().length < 10) {
		hasErrors = true;
		errors.description = 'The description length should be at least 10 characters';
	}

	if (hasErrors) {
		return res.status(400).json(errors);
	}
	next();
};

const validateBrand = (req, res, next) => {
	const { name } = req.body;
	let hasErrors = false;
	let errors = {};

	if (!name || name.trim().length < 2) {
		hasErrors = true;
		errors.name = 'The name length should be at least 2 characters';
	}

	if (hasErrors) {
		return res.status(400).json(errors);
	}
	next();
};

const validateBanner = (categories) => (req, res, next) => {
	console.log('Request Body:', req.body);

	let { season, title, subtitle, categoryId } = req.body;
	// Convert categoryId to a number for validation
	const parsedCategoryId = parseInt(categoryId, 10);
	console.log('Parsed categoryId:', parsedCategoryId);

	// Check if the parsed categoryId is valid
	const isValidCategoryId = categories.some((category) => category.id === parsedCategoryId);
	console.log('Is valid categoryId:', isValidCategoryId);

	let hasErrors = false;
	let errors = {};

	if (!isValidCategoryId) {
		hasErrors = true;
		errors.categoryId = 'Invalid categoryId';
	}

	if (!season || season.trim().length < 2) {
		hasErrors = true;
		errors.season = 'Season is required and must be at least 2 characters';
	}
	if (!title || title.trim().length < 5) {
		hasErrors = true;
		errors.title = 'Title is required and must be at least 5 characters';
	}
	if (!subtitle || subtitle.trim().length < 5) {
		hasErrors = true;
		errors.subtitle = 'Subtitle is required and must be at least 5 characters';
	}

	console.log('Validation Errors:', errors);

	if (hasErrors) {
		return res.status(400).json(errors);
	}
	next();
};

module.exports = {
	validateCategory,
	validateSubCategory,
	validateBrand,
	validateBanner,
};
