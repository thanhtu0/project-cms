import { ListHeader, ListTable, ListTitle } from '~/common/List';

import { Pagination } from '~/common';
import useFetch from '~/hooks/useFetch';
import { BASE_URL } from '~/utils/apiURL';
import { getCategoryName } from '~/utils/helpers';
import { useDeleteModal, usePaginatedData } from '~/hooks';
import { ConfirmModal } from '~/common/Modal';

const BannerList = () => {
    const {
        data: banners,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange,
        handleRefresh,
    } = usePaginatedData(`${BASE_URL}/banners`);

    const {
        showModal,
        selectedItem: selectedBanner,
        handleShowModal,
        handleCloseModal,
        handleConfirmDelete,
    } = useDeleteModal(
        `${BASE_URL}/banners`,
        handleRefresh,
        'Banner deleted successfully!',
        'Unable to delete the Banner!',
    );

    const { data: categories } = useFetch(`${BASE_URL}/categories`);

    return (
        <div className="list">
            <ListHeader
                title="Banners List"
                refreshHandler={handleRefresh}
                createLink="/admin/banner/create"
                refreshLabel="Refresh Banner"
                createLabel="Create Banner"
            />
            <ListTitle totalItems={totalItems} currentPage={currentPage} totalPages={totalPages} />
            <ListTable
                headers={['ID', 'Image Banner', 'Category Name', 'Season', 'Title', 'Subtitle']}
                data={banners}
                onEdit={(banner) => `/admin/banner/edit/${banner.id}`}
                onDelete={handleShowModal}
                renderRow={(banner) => (
                    <>
                        <td style={{ width: '10px' }}>{banner.id}</td>
                        <td style={{ width: '100px', height: 'auto' }}>
                            <img
                                src={`${BASE_URL}/images/banners/${getCategoryName(banner.categoryId, categories)}/${
                                    banner.imageUrl
                                }`}
                                className="img-fluid img-cover"
                                alt={`Banner ${banner.season}`}
                            />
                        </td>
                        <td>{getCategoryName(banner.categoryId, categories)}</td>
                        <td>{banner.season}</td>
                        <td>{banner.title}</td>
                        <td>{banner.subtitle}</td>
                    </>
                )}
            />
            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
            <ConfirmModal
                show={showModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message={`Are you sure you want to delete Banner ${selectedBanner?.name}?`}
            />
        </div>
    );
};

export default BannerList;
