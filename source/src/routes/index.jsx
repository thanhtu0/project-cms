import { Home } from '~/pages/client';
import { AdminHome } from '~/pages/admin';
import { Authentication, ForgotPassword } from '~/pages/auth';
import { AdminLayout, ProductDetail } from '~/layouts';
import { EditFashion, EditFashionPhoto, FashionList } from '~/pages/admin/Fashion';
import { ProductList, CreateProduct, EditProduct } from '~/pages/admin/Product';
import { CategoryList, CreateCategory, EditCategory } from '~/pages/admin/Category';
import { CreateSubCategory, EditSubCategory, SubCategoryList } from '~/pages/admin/SubCategory';
import { CreateEmployee, EditEmployee, EmployeeList } from '~/pages/admin/Employee';
import { BrandList, CreateBrand, EditBrand } from '~/pages/admin/Brand';
import { BannerList, CreateBanner, EditBanner } from '~/pages/admin/Banner';
import NotFound from '~/pages/error/NotFound';
import config from '~/config';
import Information from '~/pages/admin/Information';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.men, component: Home },
    { path: config.routes.women, component: Home },
    { path: config.routes.product_detail, component: Home, layout: ProductDetail },
    { path: config.routes.login, component: Authentication, layout: null },
    { path: config.routes.signin, component: Authentication, layout: null },
    { path: config.routes.forgotPassword, component: ForgotPassword },

    // Not found
    { path: config.routes.error, component: NotFound, layout: null },
];

// Private routes
const privateRoutes = [
    { path: config.routes.admin, component: AdminHome, layout: AdminLayout },
    { path: config.routes.admin_error, component: NotFound, layout: AdminLayout },

    { path: config.routes.fashions, component: FashionList, layout: AdminLayout },
    { path: config.routes.update_fashion, component: EditFashion, layout: AdminLayout },
    { path: config.routes.update_fashion_photo, component: EditFashionPhoto, layout: AdminLayout },

    { path: config.routes.products, component: ProductList, layout: AdminLayout },
    { path: config.routes.create_product, component: CreateProduct, layout: AdminLayout },
    { path: config.routes.update_product, component: EditProduct, layout: AdminLayout },

    { path: config.routes.information, component: Information, layout: AdminLayout },

    { path: config.routes.brands, component: BrandList, layout: AdminLayout },
    { path: config.routes.create_brand, component: CreateBrand, layout: AdminLayout },
    { path: config.routes.update_brand, component: EditBrand, layout: AdminLayout },

    { path: config.routes.banners, component: BannerList, layout: AdminLayout },
    { path: config.routes.create_banner, component: CreateBanner, layout: AdminLayout },
    { path: config.routes.update_banner, component: EditBanner, layout: AdminLayout },

    { path: config.routes.categories, component: CategoryList, layout: AdminLayout },
    { path: config.routes.create_category, component: CreateCategory, layout: AdminLayout },
    { path: config.routes.update_category, component: EditCategory, layout: AdminLayout },

    { path: config.routes.subcategories, component: SubCategoryList, layout: AdminLayout },
    { path: config.routes.create_subcategory, component: CreateSubCategory, layout: AdminLayout },
    { path: config.routes.update_subcategory, component: EditSubCategory, layout: AdminLayout },

    { path: config.routes.employees, component: EmployeeList, layout: AdminLayout },
    { path: config.routes.create_employee, component: CreateEmployee, layout: AdminLayout },
    { path: config.routes.update_employee, component: EditEmployee, layout: AdminLayout },
];

export { publicRoutes, privateRoutes };
