// slug Helper
export const createSlug = (name) => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

// getCategoryName Helper
export const getCategoryName = (categoryId, categories) => {
    const category = categories?.find((cat) => cat.id === parseInt(categoryId));
    return category ? category.name : 'Unknown';
};
