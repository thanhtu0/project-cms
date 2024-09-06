import './Card.scss';
const Card = () => {
    return (
        <>
            <div className="cardBox w-100 p-2 position-relative">
                <div className="card bg-white p-3 flex flex-between position-relative">
                    <div>
                        <div className="numbers fw-5 fs-40 text-black position-relative">1.504</div>
                        <div className="cardName text-black-2 fs-18 mt-5">Daily Views</div>
                    </div>

                    <div className="iconBx fs-56 text-black-2">
                        <ion-icon name="eye-outline"></ion-icon>
                    </div>
                </div>

                <div className="card bg-white p-3 flex flex-between position-relative">
                    <div>
                        <div className="numbers fw-5 fs-40 text-black position-relative">80</div>
                        <div className="cardName text-black-2 fs-18 mt-5">Sales</div>
                    </div>

                    <div className="iconBx fs-56 text-black-2">
                        <ion-icon name="cart-outline"></ion-icon>
                    </div>
                </div>

                <div className="card bg-white p-3 flex flex-between position-relative">
                    <div>
                        <div className="numbers fw-5 fs-40 text-black position-relative">284</div>
                        <div className="cardName text-black-2 fs-18 mt-5">Comments</div>
                    </div>

                    <div className="iconBx fs-56 text-black-2">
                        <ion-icon name="chatbubbles-outline"></ion-icon>
                    </div>
                </div>

                <div className="card bg-white p-3 flex flex-between position-relative">
                    <div>
                        <div className="numbers fw-5 fs-40 text-black position-relative">$7.842</div>
                        <div className="cardName text-black-2 fs-18 mt-5">Earning</div>
                    </div>

                    <div className="iconBx fs-56 text-black-2">
                        <ion-icon name="cash-outline"></ion-icon>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
