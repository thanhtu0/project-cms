import { useEffect, useState } from 'react';
import './Authentication.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login, signIn } from '~/utils/images';

const Authentication = () => {
    const [isSignInMode, setIsSignInMode] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/signin') {
            setIsSignInMode(true);
        } else {
            setIsSignInMode(false);
        }
    }, [location]);

    const handleSignInClick = () => {
        setIsSignInMode(true);
        navigate('/signin');
    };

    const handleLoginClick = () => {
        setIsSignInMode(false);
        navigate('/login');
    };

    return (
        <div className={`auth flex flex-center ${isSignInMode ? 'sign-up-mode' : ''}`}>
            <div className="auth-form bg-white">
                <div className="login-signIn">
                    <form action="" className={`log-in-form ${isSignInMode ? 'hidden' : ''}`}>
                        <h2 className="title-auth fs-35 text-auth-primary">Login</h2>
                        <div className="input-field">
                            <ion-icon name="person"></ion-icon>
                            <input type="text" placeholder="Username" />
                        </div>

                        <div className="input-field">
                            <ion-icon name="lock-closed"></ion-icon>
                            <input type="password" placeholder="Password" />
                        </div>

                        <input
                            type="submit"
                            value="Login"
                            className="btn-auth w-15 h-5 bg-auth-primary text-white fw-6 my-1"
                        />
                        <p className="social-text my-1 fs-16">Or Login with social platform</p>
                        <div className="social-media flex">
                            <a href="*" className="social-icon w-45 h-45 flex flex-center text-gray-9a facebook">
                                <ion-icon name="logo-facebook"></ion-icon>
                            </a>
                            <a href="*" className="social-icon w-45 h-45 flex flex-center text-gray-9a twitter">
                                <ion-icon name="logo-twitter"></ion-icon>
                            </a>
                            <a href="*" className="social-icon w-45 h-45 flex flex-center text-gray-9a google">
                                <ion-icon name="logo-google"></ion-icon>
                            </a>
                            <a href="*" className="social-icon w-45 h-45 flex flex-center text-gray-9a linkedin">
                                <ion-icon name="logo-linkedin"></ion-icon>
                            </a>
                        </div>
                        <p className="account-text fs-16 text-gray-9a">
                            Don't have an account?
                            <Link
                                className="text-auth-primary fw-7"
                                to="/signin"
                                id="sign-up-btn2"
                                onClick={handleSignInClick}
                            >
                                signIn
                            </Link>
                        </p>
                    </form>

                    <form action="" className={`sign-up-form ${isSignInMode ? '' : 'hidden'}`}>
                        <h2 className="title-auth fs-35 text-auth-primary">signIn</h2>
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

                        <input
                            type="submit"
                            value="signIn"
                            className="btn-auth w-15 h-5 bg-auth-primary text-white fw-6 my-1"
                        />
                        <p className="social-text my-1 fs-16">Or signIn with social platform</p>
                        <div className="social-media flex">
                            <a href="*" className="social-icon w-45 h-45 flex flex-center text-gray-9a facebook">
                                <ion-icon name="logo-facebook"></ion-icon>
                            </a>
                            <a href="*" className="social-icon w-45 h-45 flex flex-center text-gray-9a twitter">
                                <ion-icon name="logo-twitter"></ion-icon>
                            </a>
                            <a href="*" className="social-icon w-45 h-45 flex flex-center text-gray-9a google">
                                <ion-icon name="logo-google"></ion-icon>
                            </a>
                            <a href="*" className="social-icon w-45 h-45 flex flex-center text-gray-9a linkedin">
                                <ion-icon name="logo-linkedin"></ion-icon>
                            </a>
                        </div>
                        <p className="account-text fs-16 text-gray-9a">
                            Already have an account?
                            <Link
                                className="text-auth-primary fw-7"
                                to="/login"
                                id="log-in-btn2"
                                onClick={handleLoginClick}
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
                <div className="panels-container">
                    <div className="panel left-panel text-center px-1 flex flex-around">
                        <div className="panel-content text-white">
                            <h3 className="fs-24 fw-6">Member of Brands?</h3>
                            <p className="fs-15 py-1">
                                Welcome back! We are excited to see you again. Log in now to explore exclusive member
                                offers and experience the best services we have to offer.
                            </p>
                            <button
                                className="btn-auth w-15 h-5 bg-auth-primary text-white fw-6 my-1"
                                onClick={handleLoginClick}
                            >
                                login
                            </button>
                        </div>
                        <img src={login} alt="" className="image" />
                    </div>

                    <div className="panel right-panel text-center px-1 flex flex-around">
                        <div className="panel-content text-white">
                            <h3 className="fs-24 fw-6">New to Brands?</h3>
                            <p className="fs-15 py-1">
                                We’re thrilled to have you! signIn today to explore a world of diverse products and
                                receive exclusive offers available only to members. Don’t miss out on the opportunity!
                            </p>
                            <button
                                className="btn-auth w-15 h-5 bg-auth-primary text-white fw-6 my-1"
                                onClick={handleSignInClick}
                            >
                                signIn
                            </button>
                        </div>
                        <img src={signIn} alt="" className="image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authentication;
