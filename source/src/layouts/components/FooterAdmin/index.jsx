import './FooterAdmin.scss';

const FooterAdmin = () => {
    return (
        <footer className="position-relative px-2 w-100 h-36">
            <p className="fs-14 fw-4 lh-36 text-black">
                Copyright © My Website 2024 -{' '}
                <a href="https://www.facebook.com/ThanhTu03012002" target="_blank" rel="noopener noreferrer">
                    ThanhTu's
                </a>
            </p>
        </footer>
    );
};

export default FooterAdmin;
