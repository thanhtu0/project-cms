const errors = {
	about: {
		name: 'The name must be at least 2 characters long',
	},
	contact: {
		name: 'Contact name must be at least 2 characters long.',
		telephone: 'Telephone number must be at least 10 digits long and contain only numbers.',
		email: 'Email must be a valid email address (e.g., user@example.com).',
		address: 'Address must be at least 5 characters long and cannot be empty.',
	},
	payment: {
		name: 'The name must be at least 2 characters long',
	},
	category: {
		name: 'The name must be at least 2 characters long',
		description: 'The description must be at least 10 characters long',
	},
	subCategory: {
		name: 'The name length should be at least 2 characters',
		description: 'The description length should be at least 10 characters',
	},
	brand: {
		name: 'The name length should be at least 2 characters',
	},
	banner: {
		categoryId: 'Invalid categoryId',
		season: 'Season is required and must be at least 2 characters',
		title: 'Title is required and must be at least 5 characters',
		subtitle: 'Subtitle is required and must be at least 5 characters',
	},
};

module.exports = errors;
