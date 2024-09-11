import { user_logo } from '~/components/utils/images';
import './NewCustomer.scss';
const NewCustomer = () => {
    return (
        <div className="recentCustomers position-relative p-2 bg-white grid">
            <div className="carHeader">
                <h2>Recent Customers</h2>
            </div>

            <table className="w-100">
                <tbody>
                    <tr>
                        <td width="60px">
                            <div className="imgBx position-relative w-4 h-4">
                                <img className="position-relative top-0 left-0 w-100 h-100" src={user_logo} alt="" />
                            </div>
                        </td>
                        <td>
                            <h4 className="fs-16 fw-5 lh-18">
                                Lưu Diệc Phi <br />
                                <span className="fs-14 text-black-2">American</span>
                            </h4>
                        </td>
                    </tr>
                    <tr>
                        <td width="60px">
                            <div className="imgBx position-relative w-4 h-4">
                                <img className="position-relative top-0 left-0 w-100 h-100" src={user_logo} alt="" />
                            </div>
                        </td>
                        <td>
                            <h4 className="fs-16 fw-5 lh-18">
                                Lưu Diệc Phi <br />
                                <span className="fs-14 text-black-2">American</span>
                            </h4>
                        </td>
                    </tr>
                    <tr>
                        <td width="60px">
                            <div className="imgBx position-relative w-4 h-4">
                                <img className="position-relative top-0 left-0 w-100 h-100" src={user_logo} alt="" />
                            </div>
                        </td>
                        <td>
                            <h4 className="fs-16 fw-5 lh-18">
                                Lưu Diệc Phi <br />
                                <span className="fs-14 text-black-2">American</span>
                            </h4>
                        </td>
                    </tr>
                    <tr>
                        <td width="60px">
                            <div className="imgBx position-relative w-4 h-4">
                                <img className="position-relative top-0 left-0 w-100 h-100" src={user_logo} alt="" />
                            </div>
                        </td>
                        <td>
                            <h4 className="fs-16 fw-5 lh-18">
                                Lưu Diệc Phi <br />
                                <span className="fs-14 text-black-2">American</span>
                            </h4>
                        </td>
                    </tr>
                    <tr>
                        <td width="60px">
                            <div className="imgBx position-relative w-4 h-4">
                                <img className="position-relative top-0 left-0 w-100 h-100" src={user_logo} alt="" />
                            </div>
                        </td>
                        <td>
                            <h4 className="fs-16 fw-5 lh-18">
                                Lưu Diệc Phi <br />
                                <span className="fs-14 text-black-2">American</span>
                            </h4>
                        </td>
                    </tr>
                    <tr>
                        <td width="60px">
                            <div className="imgBx position-relative w-4 h-4">
                                <img className="position-relative top-0 left-0 w-100 h-100" src={user_logo} alt="" />
                            </div>
                        </td>
                        <td>
                            <h4 className="fs-16 fw-5 lh-18">
                                Lưu Diệc Phi <br />
                                <span className="fs-14 text-black-2">American</span>
                            </h4>
                        </td>
                    </tr>
                    <tr>
                        <td width="60px">
                            <div className="imgBx position-relative w-4 h-4">
                                <img className="position-relative top-0 left-0 w-100 h-100" src={user_logo} alt="" />
                            </div>
                        </td>
                        <td>
                            <h4 className="fs-16 fw-5 lh-18">
                                Lưu Diệc Phi <br />
                                <span className="fs-14 text-black-2">American</span>
                            </h4>
                        </td>
                    </tr>
                    <tr>
                        <td width="60px">
                            <div className="imgBx position-relative w-4 h-4">
                                <img className="position-relative top-0 left-0 w-100 h-100" src={user_logo} alt="" />
                            </div>
                        </td>
                        <td>
                            <h4 className="fs-16 fw-5 lh-18">
                                Lưu Diệc Phi <br />
                                <span className="fs-14 text-black-2">American</span>
                            </h4>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default NewCustomer;
