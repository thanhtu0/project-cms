import usePaginatedData from '~/components/hooks/usePaginatedData';
import { ListHeader, ListTable, ListTitle } from '~/components/List';
import Pagination from '~/components/Pagination';

const BrandList = () => {
    const {
        data: brands,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange,
        handleRefresh,
    } = usePaginatedData('http://localhost:4000/brands');

    return (
        <div className="list">
            <ListHeader
                title="Brands List"
                refreshHandler={handleRefresh}
                createLink="/admin/brand/create"
                refreshLabel="Refresh Brand"
                createLabel="Create Brand"
            />
            <ListTitle totalItems={totalItems} currentPage={currentPage} totalPages={totalPages} />

            <ListTable
                headers={['ID', 'Image', 'Brand Name']}
                data={brands}
                onEdit={(brand) => `/admin/brand/${brand.id}`}
                onDelete={handleShowModal}
                renderRow={(brand) => (
                    <>
                        <td style={{ width: '10px' }}>{brand.id}</td>
                        <td style={{ width: '100px', height: 'auto' }}>
                            <img
                                src={`http://localhost:4000/images/brands/${brand.imageFilename}`}
                                className="img-responsive"
                                alt="..."
                            />
                        </td>
                        <td>{brand.name}</td>
                    </>
                )}
            />

            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
        </div>
    );
};

export default BrandList;
