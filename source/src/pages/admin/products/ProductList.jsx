import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ListHeader, ListTitle } from '~/components/common/List';
import Pagination from '~/components/common/Pagination';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const itemsPerPage = 10;
    const navigate = useNavigate();
    const location = useLocation();

    const getProducts = useCallback(
        (page = 1) => {
            const randomParam = `?_=${new Date().getTime()}`;
            let url = `http://localhost:4000/products${randomParam}`;
            if (selectedBrand) url += `&brand=${selectedBrand}`;
            if (selectedCategory) url += `&category=${selectedCategory}`;
            if (selectedSubcategory) url += `&subcategory=${selectedSubcategory}`;

            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Failed to fetch data');
                })
                .then((data) => {
                    const startIndex = (page - 1) * itemsPerPage;
                    const endIndex = startIndex + itemsPerPage;
                    const paginatedData = data.slice(startIndex, endIndex);

                    setProducts(paginatedData);
                    setTotalItems(data.length);
                    setTotalPages(Math.ceil(data.length / itemsPerPage));
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        [selectedBrand, selectedCategory, selectedSubcategory, itemsPerPage],
    );

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const pageFromUrl = parseInt(query.get('page'), 10);

        if (pageFromUrl && pageFromUrl > 0) {
            setCurrentPage(pageFromUrl);
        } else {
            setCurrentPage(1);
        }
    }, [location.search]);

    useEffect(() => {
        getProducts(currentPage);
    }, [currentPage, getProducts]);

    useEffect(() => {
        if (currentPage === 1) {
            navigate('/admin/products', { replace: true });
        } else {
            navigate(`/admin/products?page=${currentPage}`, { replace: true });
        }
    }, [currentPage, navigate]);

    useEffect(() => {
        // Fetch brands, categories, and subcategories
        const fetchData = async () => {
            try {
                const [brandsData, categoriesData, subcategoriesData] = await Promise.all([
                    fetch('http://localhost:4000/brands').then((res) => res.json()),
                    fetch('http://localhost:4000/categories').then((res) => res.json()),
                    fetch('http://localhost:4000/subcategories').then((res) => res.json()),
                ]);

                setBrands(brandsData);
                setCategories(categoriesData);
                setSubcategories(subcategoriesData);
            } catch (error) {
                console.error('Unable to fetch data', error);
            }
        };

        fetchData();
    }, []);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleRefresh = () => {
        setProducts([]);
        getProducts(currentPage);
    };

    return (
        <>
            <div className="list">
                <ListHeader
                    title="Products List"
                    refreshHandler={handleRefresh}
                    createLink="/admin/product/create"
                    refreshLabel="Refresh Product"
                    createLabel="Create Product"
                />

                <ListTitle totalItems={totalItems} currentPage={currentPage} totalPages={totalPages} />

                <div className="list__filters">
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <select value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)}>
                        <option value="">Select Subcategory</option>
                        {subcategories.map((subcategory) => (
                            <option key={subcategory.id} value={subcategory.name}>
                                {subcategory.name}
                            </option>
                        ))}
                    </select>
                    <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
                        <option value="">Select Brand</option>
                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.name}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="list__table">
                    <table>
                        <thead>
                            <tr>
                                <td>Image</td>
                                <td>Product Name</td>
                                <td>Product Title</td>
                                <td>Price</td>
                                <td>Sold</td>
                                <td>Actions</td>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td style={{ width: '150px', height: 'auto' }}>
                                        <img
                                            src={`http://localhost:4000/images/products/${product.imageFilename}`}
                                            className="img-fluid"
                                            alt="..."
                                        />
                                    </td>
                                    <td>{product.name}</td>
                                    <td className="text-center">{product.title}</td>
                                    <td className="text-center">$ {product.price}</td>
                                    <td className="text-center">{product.sold}</td>
                                    <td
                                        style={{
                                            width: '10px',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        <Link
                                            className="btn btn-primary btn-icon"
                                            to={'/admin/products/edit/' + product.id}
                                        >
                                            <ion-icon name="create-outline"></ion-icon>
                                        </Link>
                                        <button type="button" className="btn btn-danger btn-icon">
                                            <ion-icon name="trash-outline"></ion-icon>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                )}
            </div>
        </>
    );
};

export default ProductList;
