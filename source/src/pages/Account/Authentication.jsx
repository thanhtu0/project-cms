import { useState } from 'react';
import './Authentication.scss';
import { Link } from 'react-router-dom';

const Authentication = () => {
    const [isSignUpMode, setIsSignUpMode] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUpMode(true);
    };

    const handleSignInClick = () => {
        setIsSignUpMode(false);
    };

    return (
        <div className={`auth ${isSignUpMode ? 'sign-up-mode' : ''}`}>
            <div className="auth-form">
                <div className="signin-signup">
                    <form action="" className={`sign-in-form ${isSignUpMode ? 'hidden' : ''}`}>
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
                            <Link to="#" id="sign-up-btn2" onClick={handleSignUpClick}>
                                Sign up
                            </Link>
                        </p>
                    </form>

                    <form action="" className={`sign-up-form ${isSignUpMode ? '' : 'hidden'}`}>
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
                            Already have an account?
                            <Link to="#" id="sign-in-btn2" onClick={handleSignInClick}>
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
                                explicabo expedita sit in at ullam reprehenderit perferendis aperiam placeat provident
                                deserunt quos animi totam, amet voluptatem nobis.
                            </p>
                            <button className="btn-auth" onClick={handleSignInClick}>
                                Sign in
                            </button>
                        </div>
                        <img src="/signin.png" alt="" className="image" />
                    </div>

                    <div className="panel right-panel">
                        <div className="panel-content">
                            <h3>New to Brands?</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia magnam incidunt excepturi
                                explicabo expedita sit in at ullam reprehenderit perferendis aperiam placeat provident
                                deserunt quos animi totam, amet voluptatem nobis.
                            </p>
                            <button className="btn-auth" onClick={handleSignUpClick}>
                                Sign up
                            </button>
                        </div>
                        <img src="/signup.png" alt="" className="image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authentication;
