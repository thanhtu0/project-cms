import { ListHeader, ListTable, ListTitle } from '~/common/List';

import { Pagination } from '~/common';
import useFetch from '~/hooks/useFetch';
import { FASHION_IMAGES, FASHIONS_URL, CATEGORIES_URL } from '~/utils/apiURL';
import { usePaginatedData } from '~/hooks';
import { getCategoryName } from '~/helpers/dataHelpers';

const FashionTrending = () => {
    const {
        data: fashions,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange,
        handleRefresh,
    } = usePaginatedData(`${FASHIONS_URL}`);

    const { data: categories } = useFetch(`${CATEGORIES_URL}`);

    return (
        <div className="list">
            <ListHeader title="Fashion Trending List" refreshHandler={handleRefresh} refreshLabel="Refresh Fashion" />
            <ListTitle totalItems={totalItems} currentPage={currentPage} totalPages={totalPages} />
            <ListTable
                headers={['ID', 'Image', 'Category Name', 'Label', 'Title', 'Subtitle', 'Description']}
                data={fashions}
                onEdit={(fashion) => `/admin/fashion-trending/edit/${fashion.id}`}
                renderRow={(fashion) => (
                    <>
                        <td style={{ width: '10px' }}>{fashion.id}</td>
                        <td style={{ width: '100px', height: 'auto' }}>
                            <img
                                src={`${FASHION_IMAGES}/${getCategoryName(fashion.categoryId, categories)}/${
                                    fashion.imageUrl
                                }`}
                                className="img-fluid img-cover w-100"
                                alt={`Fashion ${fashion.season}`}
                            />
                        </td>
                        <td className="text-center">{getCategoryName(fashion.categoryId, categories)}</td>
                        <td className="text-center">{fashion.label}</td>
                        <td className="text-center">{fashion.title}</td>
                        <td className="text-center">{fashion.subtitle}</td>
                        <td style={{ width: '350px' }} className="text-center">
                            {fashion.description}
                        </td>
                    </>
                )}
                showDelete={false}
            />
            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
        </div>
    );
};

export default FashionTrending;
