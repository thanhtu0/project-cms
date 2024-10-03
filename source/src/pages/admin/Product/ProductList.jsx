import { Pagination } from '~/common';
import { ListHeader, ListTable, ListTitle } from '~/common/List';
import { Confirm } from '~/common/Modal';
import { getCategoryName } from '~/helpers/dataHelpers';
import { useDeleteModal, usePaginatedData } from '~/hooks';
import useFetch from '~/hooks/useFetch';
import { CATEGORIES_URL, PRODUCT_IMAGES, PRODUCTS_URL } from '~/utils/apiURL';

const ProductList = () => {
    const {
        data: products,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange,
        handleRefresh,
    } = usePaginatedData(`${PRODUCTS_URL}`);

    const {
        showModal,
        selectedItem: selectedProduct,
        handleShowModal,
        handleCloseModal,
        handleConfirmDelete,
    } = useDeleteModal(
        `${PRODUCTS_URL}`,
        handleRefresh,
        'Product deleted successfully!',
        'Unable to delete the Product!',
    );

    const { data: categories } = useFetch(`${CATEGORIES_URL}`);

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

                <ListTable
                    headers={['ID', ' Image', 'ProductName', 'ProductTitle', 'Price', 'Sold']}
                    data={products}
                    onEdit={(product) => `/admin/product/edit/${product.id}`}
                    onDelete={handleShowModal}
                    renderRow={(product) => (
                        <>
                            <td>{product.id}</td>
                            <td style={{ width: '150px', height: 'auto' }}>
                                <img
                                    src={`${PRODUCT_IMAGES}/${getCategoryName(product.categoryId, categories)}/${
                                        product.imageUrl
                                    }`}
                                    className="img-fluid img-cover w-100"
                                    alt={`Product ${product.name}`}
                                />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.title}</td>
                            <td className="text-center">$ {product.price}</td>
                            <td className="text-center">{product.sold}</td>
                        </>
                    )}
                />
            </div>

            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
            <Confirm
                show={showModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message={`Are you sure you want to delete ${selectedProduct?.title} Product?`}
            />
        </>
    );
};

export default ProductList;
