// validation.js

const validateCategory = (req, res, next) => {
	const { name, description } = req.body;
	let hasErrors = false;
	let errors = {};

	if (!name || name.length < 2) {
		hasErrors = true;
		errors.name = 'The name length should be at least 2 characters';
	}
	if (description && description.length < 10) {
		hasErrors = true;
		errors.description = 'The description length should be at least 10 characters';
	}

	if (hasErrors) {
		return res.status(400).jsonp(errors);
	}
	next();
};

const validateSubCategory = (req, res, next) => {
	const { name, description } = req.body;
	let hasErrors = false;
	let errors = {};

	if (!name || name.length < 2) {
		hasErrors = true;
		errors.name = 'The name length should be at least 2 characters';
	}
	if (description && description.length < 10) {
		hasErrors = true;
		errors.description = 'The description length should be at least 10 characters';
	}

	if (hasErrors) {
		return res.status(400).jsonp(errors);
	}
	next();
};

const validateBrand = (req, res, next) => {
	const { name } = req.body;
	let hasErrors = false;
	let errors = {};

	if (!name || name.length < 2) {
		hasErrors = true;
		errors.name = 'The name length should be at least 2 characters';
	}

	if (hasErrors) {
		return res.status(400).jsonp(errors);
	}
	next();
};

const validateBanner = (req, res, next) => {
	const { name, category } = req.body;
	let hasErrors = false;
	let errors = {};

	if (!name || name.length < 2) {
		hasErrors = true;
		errors.name = 'The name length should be at least 2 characters';
	}
	if (!category || (category !== 'men' && category !== 'women')) {
		hasErrors = true;
		errors.category = 'Category must be either "men" or "women"';
	}

	if (hasErrors) {
		return res.status(400).jsonp(errors);
	}
	next();
};

module.exports = {
	validateCategory,
	validateSubCategory,
	validateBrand,
	validateBanner,
};
