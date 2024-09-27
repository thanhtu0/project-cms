import { ListHeader, ListTable, ListTitle } from '~/common/List';

import { Pagination } from '~/common';
import useFetch from '~/hooks/useFetch';
import { BANNER_IMAGES, BANNERS_URL, CATEGORIES_URL } from '~/utils/apiURL';
import { getCategoryName } from '~/utils/helpers';
import { useDeleteModal, usePaginatedData } from '~/hooks';
import { Confirm } from '~/common/Modal';

const BannerList = () => {
    const {
        data: banners,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange,
        handleRefresh,
    } = usePaginatedData(`${BANNERS_URL}`);

    const {
        showModal,
        selectedItem: selectedBanner,
        handleShowModal,
        handleCloseModal,
        handleConfirmDelete,
    } = useDeleteModal(`${BANNERS_URL}`, handleRefresh, 'Banner deleted successfully!', 'Unable to delete the Banner!');

    const { data: categories } = useFetch(`${CATEGORIES_URL}`);

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
                        <td style={{ width: '150px', height: 'auto' }}>
                            <img
                                src={`${BANNER_IMAGES}/${getCategoryName(banner.categoryId, categories)}/${
                                    banner.imageUrl
                                }`}
                                className="img-fluid"
                                alt={`Banner ${banner.season}`}
                            />
                        </td>
                        <td className="text-center">{getCategoryName(banner.categoryId, categories)}</td>
                        <td className="text-center">{banner.season}</td>
                        <td className="text-center">{banner.title}</td>
                        <td className="text-center">{banner.subtitle}</td>
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

export default BannerList;
