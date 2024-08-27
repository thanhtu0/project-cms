// Pages
import { Home } from '~/pages/user';
import { AdminHome } from '~/pages/admin';
import NotFound from '~/pages/NotFound';
import { ForgotPassword, Login, Register } from '~/pages/account';

// Layouts
import { AdminLayout, ProductDetail } from '~/components/layouts';
import { ProductList, CreateProduct, EditProduct } from '~/pages/admin/products';
import { CreateInfo, EditInfo, InfoList } from '~/pages/admin/information';
import { CategoryList, CreateCategory, EditCategory } from '~/pages/admin/categories';
import { CreateSubCategory, EditSubCategory, SubCategoryList } from '~/pages/admin/subcategories';
import { CreateEmployee, EditEmployee, EmployeeList } from '~/pages/admin/employees';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/product/:{id}', component: Home, layout: ProductDetail },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/password_reset', component: ForgotPassword },

    // Not found
    { path: '*', component: NotFound },
];

// Private routes
const privateRoutes = [
    { path: '/admin', component: AdminHome, layout: AdminLayout },

    { path: '/admin/products', component: ProductList, layout: AdminLayout },
    { path: '/admin/products/create', component: CreateProduct, layout: AdminLayout },
    { path: '/admin/products/edit/:id', component: EditProduct, layout: AdminLayout },

    { path: '/admin/info', component: InfoList, layout: AdminLayout },
    { path: '/admin/info/create', component: CreateInfo, layout: AdminLayout },
    { path: '/admin/info/edit/:id', component: EditInfo, layout: AdminLayout },

    { path: '/admin/categories', component: CategoryList, layout: AdminLayout },
    { path: '/admin/category/create', component: CreateCategory, layout: AdminLayout },
    { path: '/admin/category/:id', component: EditCategory, layout: AdminLayout },

    { path: '/admin/subcategories', component: SubCategoryList, layout: AdminLayout },
    { path: '/admin/subcategory/create', component: CreateSubCategory, layout: AdminLayout },
    { path: '/admin/subcategory/:id', component: EditSubCategory, layout: AdminLayout },

    { path: '/admin/employees', component: EmployeeList, layout: AdminLayout },
    { path: '/admin/employee/create', component: CreateEmployee, layout: AdminLayout },
    { path: '/admin/employee/:id', component: EditEmployee, layout: AdminLayout },
];

export { publicRoutes, privateRoutes };
