import { useEffect, useState } from 'react';
import './Authentication.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login, register } from '~/components/utils/images';

const Authentication = () => {
    const [isregisterMode, setIsregisterMode] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/register') {
            setIsregisterMode(true);
        } else {
            setIsregisterMode(false);
        }
    }, [location]);

    const handleregisterClick = () => {
        setIsregisterMode(true);
        navigate('/register');
    };

    const handleloginClick = () => {
        setIsregisterMode(false);
        navigate('/login');
    };

    return (
        <div className={`auth ${isregisterMode ? 'sign-up-mode' : ''}`}>
            <div className="auth-form">
                <div className="login-register">
                    <form action="" className={`sign-in-form ${isregisterMode ? 'hidden' : ''}`}>
                        <h2 className="title-auth">Sign in</h2>
                        <div className="input-field">
                            <ion-icon name="person"></ion-icon>
                            <input type="text" placeholder="Username" />
                        </div>

                        <div className="input-field">
                            <ion-icon name="lock-closed"></ion-icon>
                            <input type="password" placeholder="Password" />
                        </div>

                        <input type="submit" value="Login" className="btn-auth" />
                        <p className="social-text">Or Sign in with social platform</p>
                        <div className="social-media">
                            <a href="*" className="social-icon">
                                <ion-icon name="logo-facebook"></ion-icon>
                            </a>
                            <a href="*" className="social-icon">
                                <ion-icon name="logo-twitter"></ion-icon>
                            </a>
                            <a href="*" className="social-icon">
                                <ion-icon name="logo-google"></ion-icon>
                            </a>
                            <a href="*" className="social-icon">
                                <ion-icon name="logo-linkedin"></ion-icon>
                            </a>
                        </div>
                        <p className="account-text">
                            Don't have an account?
                            <Link to="#" id="sign-up-btn2" onClick={handleregisterClick}>
                                Sign up
                            </Link>
                        </p>
                    </form>

                    <form action="" className={`sign-up-form ${isregisterMode ? '' : 'hidden'}`}>
                        <h2 className="title-auth">Sign up</h2>
                        <div className="input-field">
                            <ion-icon name="person"></ion-icon>
                            <input type="text" placeholder="Username" />
                        </div>

                        <div className="input-field">
                            <ion-icon name="mail"></ion-icon>
                            <input type="text" placeholder="Email" />
                        </div>

                        <div className="input-field">
                            <ion-icon name="lock-closed"></ion-icon>
                            <input type="password" placeholder="Password" />
                        </div>

                        <input type="submit" value="Sign up" className="btn-auth" />
                        <p className="social-text">Or Sign in with social platform</p>
                        <div className="social-media">
                            <a href="*" className="social-icon facebook">
                                <ion-icon name="logo-facebook"></ion-icon>
                            </a>
                            <a href="*" className="social-icon twitter">
                                <ion-icon name="logo-twitter"></ion-icon>
                            </a>
                            <a href="*" className="social-icon google">
                                <ion-icon name="logo-google"></ion-icon>
                            </a>
                            <a href="*" className="social-icon linkedin">
                                <ion-icon name="logo-linkedin"></ion-icon>
                            </a>
                        </div>
                        <p className="account-text">
                            Already have an account?
                            <Link to="#" id="sign-in-btn2" onClick={handleloginClick}>
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="panel-content">
                            <h3>Member of Brands?</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia magnam incidunt excepturi
                            </p>
                            <button className="btn-auth" onClick={handleloginClick}>
                                Sign in
                            </button>
                        </div>
                        <img src={login} alt="" className="image" />
                    </div>

                    <div className="panel right-panel">
                        <div className="panel-content">
                            <h3>New to Brands?</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia magnam incidunt excepturi
                                explicabo expedita sit in at ullam reprehenderit perferendis aperiam placeat provident
                                deserunt quos animi totam, amet voluptatem nobis.
                            </p>
                            <button className="btn-auth" onClick={handleregisterClick}>
                                Sign up
                            </button>
                        </div>
                        <img src={register} alt="" className="image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authentication;
