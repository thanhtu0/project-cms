// slug Helper
export const createSlug = (name) => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

// getCategoryName Helper
export const getCategoryName = (categoryId, categories) => {
    if (!Array.isArray(categories)) return 'Unknown';

    const parsedCategoryId = parseInt(categoryId, 10);
    if (isNaN(parsedCategoryId)) return 'Unknown';

    const category = categories.find((cat) => cat.id === parsedCategoryId);
    return category ? category.name : 'Unknown';
};
