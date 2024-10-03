import { ListHeader, ListTable, ListTitle } from '~/common/List';

import { Pagination } from '~/common';
import useFetch from '~/hooks/useFetch';
import { CATEGORIES_URL, FASHION_SEASON_URL, FASHION_SEASON_IMAGES, PRODUCTS_URL } from '~/utils/apiURL';
import { useDeleteModal, usePaginatedData } from '~/hooks';
import { Confirm } from '~/common/Modal';
import { getCategoryName, getProductName } from '~/helpers/dataHelpers';

const FashionSeason = () => {
    const {
        data: seasons,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange,
        handleRefresh,
    } = usePaginatedData(`${FASHION_SEASON_URL}`);

    const {
        showModal,
        selectedItem: selectedBanner,
        handleShowModal,
        handleCloseModal,
        handleConfirmDelete,
    } = useDeleteModal(
        `${FASHION_SEASON_URL}`,
        handleRefresh,
        'Banner deleted successfully!',
        'Unable to delete the Banner!',
    );

    const { data: categories } = useFetch(`${CATEGORIES_URL}`);
    const { data: products } = useFetch(`${PRODUCTS_URL}`);

    return (
        <div className="list">
            <ListHeader
                title="Fashion Season List"
                refreshHandler={handleRefresh}
                refreshLabel="Refresh Fashion Season"
                createLink="/admin/fashion-season/create"
                createLabel="Create Fashion Season"
            />
            <ListTitle totalItems={totalItems} currentPage={currentPage} totalPages={totalPages} />
            <ListTable
                headers={['ID', 'Image', 'Fashion Season Name', 'Product Name', 'Category Name']}
                data={seasons}
                onEdit={(season) => `/admin/fashion-season/edit/${season.id}`}
                onDelete={handleShowModal}
                renderRow={(season) => (
                    <>
                        <td style={{ width: '10px' }}>{season.id}</td>
                        <td style={{ width: '100px', height: 'auto' }}>
                            <img
                                src={`${FASHION_SEASON_IMAGES}/${season.imageUrl}`}
                                className="img-fluid img-cover w-100"
                                alt={`Fashion ${season.season}`}
                            />
                        </td>
                        <td className="text-center">{season.name}</td>
                        <td className="text-center">{getProductName(season.productId, products)}</td>
                        <td className="text-center">{getCategoryName(season.categoryId, categories)}</td>
                    </>
                )}
            />
            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
            <Confirm
                show={showModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message={`Are you sure you want to delete ${selectedBanner?.title} Banner?`}
            />
        </div>
    );
};

export default FashionSeason;
