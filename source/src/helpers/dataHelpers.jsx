// getCategoryName Helper
export const getCategoryName = (categoryId, categories) => {
    if (!Array.isArray(categories)) return 'Unknown';

    const parsedCategoryId = parseInt(categoryId, 10);
    if (isNaN(parsedCategoryId)) return 'Unknown';

    const category = categories.find((cat) => cat.id === parsedCategoryId);
    return category ? category.name : 'Unknown';
};

// getBrandName Helper
export const getBrandName = (brandId, brands) => {
    if (!Array.isArray(brands)) return 'Unknown';

    const parsedBrandId = parseInt(brandId, 10);
    if (isNaN(parsedBrandId)) return 'Unknown';

    const brand = brands.find((b) => b.id === parsedBrandId);
    return brand ? brand.name : 'Unknown';
};

// getProductName Helper
export const getProductName = (productId, products) => {
    if (!Array.isArray(products)) return 'Unknown';

    const parsedProductId = parseInt(productId, 10);
    if (isNaN(parsedProductId)) return 'Unknown';

    const product = products.find((p) => p.id === parsedProductId);
    return product ? product.name : 'Unknown';
};

// splitAboutLinks Helper
export const splitAboutLinks = (aboutLinks, splitPoint = 5) => {
    const leftLinks = aboutLinks.slice(0, splitPoint);
    const rightLinks = aboutLinks.length > splitPoint ? aboutLinks.slice(splitPoint) : [];
    return { left: leftLinks, right: rightLinks };
};
