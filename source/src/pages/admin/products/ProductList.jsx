import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Title from '~/components/Title';

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

    const getProducts = (page = 1) => {
        let url = `http://localhost:4000/products?_page=${page}&_limit=${itemsPerPage}`;
        if (selectedBrand) url += `&brand=${selectedBrand}`;
        if (selectedCategory) url += `&category=${selectedCategory}`;
        if (selectedSubcategory) url += `&subcategory=${selectedSubcategory}`;

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error();
            })
            .then((data) => {
                setProducts(data);
                setTotalItems(data.length);
                setTotalPages(Math.ceil(data.length / itemsPerPage));
            })
            .catch((error) => {
                alert('Unable to get the data');
            });
    };

    useEffect(() => {
        getProducts(currentPage);
    }, [currentPage, selectedBrand, selectedCategory, selectedSubcategory]);

    useEffect(() => {
        // Fetch brands
        fetch('http://localhost:4000/brands')
            .then((response) => response.json())
            .then((data) => setBrands(data))
            .catch((error) => console.error('Unable to fetch brands'));

        // Fetch categories
        fetch('http://localhost:4000/categories')
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error('Unable to fetch categories'));

        // Fetch subcategories
        fetch('http://localhost:4000/subcategories')
            .then((response) => response.json())
            .then((data) => setSubcategories(data))
            .catch((error) => console.error('Unable to fetch subcategories'));
    }, []);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <div className="list">
                <div className="list__header">
                    <Title text="Products List" />
                    <div className="list__btn-group">
                        <Link to="*" className="btn btn-outline-primary">
                            Refresh Product
                        </Link>
                        <Link to="/admin/product/create" className="btn btn-primary">
                            Create Product
                        </Link>
                    </div>
                </div>
                <div className="list__title">
                    <p>
                        There are {totalItems} products. Currently on page {currentPage} of {totalPages} total pages.
                    </p>
                </div>
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
                <table className="list__table">
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
                                <td>
                                    <img
                                        src={'http://localhost:4000/images/' + product.imageFilename}
                                        width="100"
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
                <div className="list__pagination">
                    <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductList;
