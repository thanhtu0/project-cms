// Pages
import { Home } from '~/pages/user';
import { AdminHome } from '~/pages/admin';
import NotFound from '~/pages/NotFound';
import { ForgotPassword, Login, Register } from '~/pages/account';

// Layouts
import { AdminLayout, ProductDetail } from '~/components/layouts';

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
const privateRoutes = [{ path: '/admin', component: AdminHome, layout: AdminLayout }];

export { publicRoutes, privateRoutes };
