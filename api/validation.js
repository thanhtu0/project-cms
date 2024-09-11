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

	const { season, title, subtitle, categoryId } = req.body;
	let hasErrors = false;
	let errors = {};

	const isValidCategoryId = categories && categories.some((category) => category.id === parseInt(categoryId, 10));

	if (!season || season.trim().length < 10) {
		hasErrors = true;
		errors.season = 'Season is required and must be at least 10 characters';
	}
	if (!title || title.trim().length < 10) {
		hasErrors = true;
		errors.title = 'Title is required and must be at least 10 characters';
	}
	if (!subtitle || subtitle.trim().length < 10) {
		hasErrors = true;
		errors.subtitle = 'Subtitle is required and must be at least 10 characters';
	}
	if (!categoryId || !isValidCategoryId) {
		hasErrors = true;
		errors.categoryId = 'Invalid category ID';
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
