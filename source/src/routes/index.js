import { Home, Information, ProductDetail, Wishlist } from '~/pages/user';

import NotFound from '~/pages/NotFound';
// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/information', component: Information },
    { path: '/products:id', component: ProductDetail },
    { path: '/wishlist', component: Wishlist },

    // Not found
    { path: '/error', component: NotFound },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
