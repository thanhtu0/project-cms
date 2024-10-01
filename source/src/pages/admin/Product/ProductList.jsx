import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pagination } from '~/common';
import { ListHeader, ListTitle } from '~/common/List';
import SelectFilter from '~/common/SelectFilter';
import Button from '~/components/Button';
import { API_BASE_URL, BRANDS_URL, CATEGORIES_URL, SUBCATEGORIES_URL } from '~/utils/apiURL';

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
            let url = `${API_BASE_URL}/products${randomParam}`;
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
                    fetch(`${BRANDS_URL}`).then((res) => res.json()),
                    fetch(`${CATEGORIES_URL}`).then((res) => res.json()),
                    fetch(`${SUBCATEGORIES_URL}`).then((res) => res.json()),
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

                <div className="list__filters flex flex-between mt-2 ml-2">
                    <SelectFilter
                        value={selectedCategory}
                        options={categories}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        label="Category"
                    />
                    <SelectFilter
                        value={selectedSubcategory}
                        options={subcategories}
                        onChange={(e) => setSelectedSubcategory(e.target.value)}
                        label="Subcategory"
                    />
                    <SelectFilter
                        value={selectedBrand}
                        options={brands}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        label="Brand"
                    />
                </div>

                <div className="list__table">
                    <table className="ml-2 mt-1">
                        <thead className="bg-black-1 text-white">
                            <tr className="text-center">
                                <td>Id</td>
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
                                    <td>{product.id}</td>
                                    <td style={{ width: '150px', height: 'auto' }}>
                                        <img
                                            src={`${API_BASE_URL}/images/products/${product.imageFilename}`}
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
                                        <Button to={'/admin/products/edit/' + product.id} edit>
                                            <ion-icon name="create-outline"></ion-icon>
                                        </Button>

                                        <Button type="button" del>
                                            <ion-icon name="trash-outline"></ion-icon>
                                        </Button>
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
