import Button from '~/components/Button';
import './FooterAdmin.scss';

const FooterAdmin = ({ year = new Date().getFullYear(), websiteName = 'My Website', author = "ThanhTu's" }) => {
    return (
        <footer className="footer-admin position-relative px-2 w-100 h-36">
            <p className="fs-14 fw-4 lh-36 text-black">
                Copyright © {websiteName} {year} -{' '}
                <Button
                    href="https://www.facebook.com/ThanhTu03012002"
                    text
                    className="footer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {author}
                </Button>
            </p>
        </footer>
    );
};

export default FooterAdmin;
