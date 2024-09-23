const routes = {
    // Client
    home: '/',
    men: '/men',
    women: '/women',
    product_detail: '/product:{id}',
    login: '/login',
    register: '/register',
    forgotPassword: '/password_reset',
    error: '*',

    // Admin
    admin: '/admin',
    admin_error: '/admin/*',

    information: '/admin/information',

    brands: '/admin/brands',
    create_brand: '/admin/brand/create',
    update_brand: '/admin/brand/edit/:id',

    banners: '/admin/banners',
    create_banner: '/admin/banner/create',
    update_banner: '/admin/banner/edit/:id',

    categories: '/admin/categories',
    create_category: '/admin/category/create',
    update_category: '/admin/category/edit/:id',

    subcategories: '/admin/subcategories',
    create_subcategory: '/admin/subcategory/create',
    update_subcategory: '/admin/subcategory/edit/:id',

    products: '/admin/products',
    create_product: '/admin/product/create',
    update_product: '/admin/product/edit/:id',

    employees: '/admin/employees',
    create_employee: '/admin/employee/create',
    update_employee: '/admin/employee/edit/:id',
};

export default routes;
