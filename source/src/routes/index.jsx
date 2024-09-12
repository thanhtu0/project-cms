// Pages
import { Home } from '~/pages/client';
import { AdminHome } from '~/pages/admin';
import { Authentication, ForgotPassword } from '~/pages/auth';

// Layouts
import { AdminLayout, ProductDetail } from '~/components/layouts';
import { ProductList, CreateProduct, EditProduct } from '~/pages/admin/products';
import { CreateInfo, EditInfo, InfoList } from '~/pages/admin/information';
import { CategoryList, CreateCategory, EditCategory } from '~/pages/admin/categories';
import { CreateSubCategory, EditSubCategory, SubCategoryList } from '~/pages/admin/subcategories';
import { CreateEmployee, EditEmployee, EmployeeList } from '~/pages/admin/employees';
import { BrandList, CreateBrand, EditBrand } from '~/pages/admin/brands';
import NotFound from '~/pages/error/NotFound';
import { BannerList, CreateBanner, EditBanner } from '~/pages/admin/banner';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/men', component: Home },
    { path: '/women', component: Home },
    { path: '/product/:{id}', component: Home, layout: ProductDetail },
    { path: '/login', component: Authentication, layout: null },
    { path: '/register', component: Authentication, layout: null },
    { path: '/password_reset', component: ForgotPassword },

    // Not found
    { path: '*', component: NotFound, layout: null },
];

// Private routes
const privateRoutes = [
    { path: '/admin', component: AdminHome, layout: AdminLayout },
    { path: '/admin/*', component: NotFound, layout: AdminLayout },

    { path: '/admin/products', component: ProductList, layout: AdminLayout },
    { path: '/admin/product/create', component: CreateProduct, layout: AdminLayout },
    { path: '/admin/product/edit/edit/:id', component: EditProduct, layout: AdminLayout },

    { path: '/admin/info', component: InfoList, layout: AdminLayout },
    { path: '/admin/info/create', component: CreateInfo, layout: AdminLayout },
    { path: '/admin/info/edit/edit/:id', component: EditInfo, layout: AdminLayout },

    { path: '/admin/brands', component: BrandList, layout: AdminLayout },
    { path: '/admin/brand/create', component: CreateBrand, layout: AdminLayout },
    { path: '/admin/brand/edit/:id', component: EditBrand, layout: AdminLayout },

    { path: '/admin/banners', component: BannerList, layout: AdminLayout },
    { path: '/admin/banner/create', component: CreateBanner, layout: AdminLayout },
    { path: '/admin/banner/edit/:id', component: EditBanner, layout: AdminLayout },

    { path: '/admin/categories', component: CategoryList, layout: AdminLayout },
    { path: '/admin/category/create', component: CreateCategory, layout: AdminLayout },
    { path: '/admin/category/edit/:id', component: EditCategory, layout: AdminLayout },

    { path: '/admin/subcategories', component: SubCategoryList, layout: AdminLayout },
    { path: '/admin/subcategory/create', component: CreateSubCategory, layout: AdminLayout },
    { path: '/admin/subcategory/edit/:id', component: EditSubCategory, layout: AdminLayout },

    { path: '/admin/employees', component: EmployeeList, layout: AdminLayout },
    { path: '/admin/employee/create', component: CreateEmployee, layout: AdminLayout },
    { path: '/admin/employee/edit/:id', component: EditEmployee, layout: AdminLayout },
];

export { publicRoutes, privateRoutes };
