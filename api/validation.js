const errors = require('./error');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateCategory = (req, res, next) => {
	const { name, description } = req.body;
	let hasErrors = false;
	let errorMessages = {};

	if (!name || name.trim().length < 2) {
		hasErrors = true;
		errorMessages.name = errors.category.name;
	}
	if (description && description.trim().length < 10) {
		hasErrors = true;
		errorMessages.description = errors.category.description;
	}

	if (hasErrors) {
		return res.status(400).json(errorMessages);
	}
	next();
};

const validateSubCategory = (req, res, next) => {
	const { name, description } = req.body;
	let hasErrors = false;
	let errorMessages = {};

	if (!name || name.trim().length < 2) {
		hasErrors = true;
		errorMessages.name = errors.subCategory.name;
	}
	if (description && description.trim().length < 10) {
		hasErrors = true;
		errorMessages.description = errors.subCategory.description;
	}

	if (hasErrors) {
		return res.status(400).json(errorMessages);
	}
	next();
};

const validateBrand = (req, res, next) => {
	const { name } = req.body;
	let hasErrors = false;
	let errorMessages = {};

	if (!name || name.trim().length < 2) {
		hasErrors = true;
		errorMessages.name = errors.brand.name;
	}

	if (hasErrors) {
		return res.status(400).json(errorMessages);
	}
	next();
};

const validateBanner = (categories) => (req, res, next) => {
	let { season, title, subtitle, categoryId } = req.body;
	const parsedCategoryId = parseInt(categoryId, 10);
	const isValidCategoryId = categories.some((category) => category.id === parsedCategoryId);

	let hasErrors = false;
	let errorMessages = {};

	if (!isValidCategoryId) {
		hasErrors = true;
		errorMessages.categoryId = errors.banner.categoryId;
	}
	if (!season || season.trim().length < 2) {
		hasErrors = true;
		errorMessages.season = errors.banner.season;
	}
	if (!title || title.trim().length < 5) {
		hasErrors = true;
		errorMessages.title = errors.banner.title;
	}
	if (!subtitle || subtitle.trim().length < 5) {
		hasErrors = true;
		errorMessages.subtitle = errors.banner.subtitle;
	}

	if (hasErrors) {
		return res.status(400).json(errorMessages);
	}
	next();
};

const validateAbout = (req, res, next) => {
	const { name } = req.body;
	let hasErrors = false;
	let errorMessages = {};

	if (!name || name.trim().length < 2) {
		hasErrors = true;
		errorMessages.name = errors.about.name;
	}

	if (hasErrors) {
		return res.status(400).json(errorMessages);
	}
	next();
};

const validateContact = (req, res, next) => {
	const { name, telephone, email, address } = req.body;
	let hasErrors = false;
	let errorMessages = {};

	if (!name || name.trim().length < 2) {
		hasErrors = true;
		errorMessages.name = errors.contact.name;
	}
	if (!telephone || telephone.trim().length < 10 || isNaN(telephone)) {
		hasErrors = true;
		errorMessages.telephone = errors.contact.telephone;
	}
	if (!email || !/\S+@\S+\.\S+/.test(email)) {
		hasErrors = true;
		errorMessages.email = errors.contact.email;
	}
	if (!address || address.trim().length < 5) {
		hasErrors = true;
		errorMessages.address = errors.contact.address;
	}

	if (hasErrors) {
		return res.status(400).json(errorMessages);
	}
	next();
};

const validatePayment = (req, res, next) => {
	const { name } = req.body;
	let hasErrors = false;
	let errorMessages = {};

	if (!name || name.trim().length < 2) {
		hasErrors = true;
		errorMessages.name = errors.payment.name;
	}

	if (hasErrors) {
		return res.status(400).json(errorMessages);
	}
	next();
};

module.exports = {
	validateCategory,
	validateSubCategory,
	validateBrand,
	validateBanner,
	validateAbout,
	validateContact,
	validatePayment,
};
