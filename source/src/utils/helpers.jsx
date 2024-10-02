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

// getCategoryName Helper
export const getBrandName = (brandId, brands) => {
    if (!Array.isArray(brands)) return 'Unknown';

    const parsedBrandId = parseInt(brandId, 10);
    if (isNaN(parsedBrandId)) return 'Unknown';

    const brand = brands.find((b) => b.id === parsedBrandId);
    return brand ? brand.name : 'Unknown';
};

// toggleVisibility Helper
export const toggleVisibility = (prevState, section) => ({
    ...prevState,
    [section]: !prevState[section],
});

// splitAboutLinks Helper
export const splitAboutLinks = (aboutLinks, splitPoint = 5) => {
    const leftLinks = aboutLinks.slice(0, splitPoint);
    const rightLinks = aboutLinks.length > splitPoint ? aboutLinks.slice(splitPoint) : [];
    return { left: leftLinks, right: rightLinks };
};
