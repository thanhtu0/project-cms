import Title from '~/components/common/Title';

const InfoList = () => {
    return (
        <div className="list">
            <div className="list__info">
                <Title text="Information Store" />
            </div>
            <div className="list">
                <div className="flex flex-between">
                    <Title text="About Store" />
                    <button type="submit" className="w-4 h-4 flex flex-center fs-24 btn-primary">
                        <ion-icon name="add-outline"></ion-icon>
                    </button>
                </div>
                <div className="alert">
                    <p></p>
                </div>
            </div>

            <div className="list">
                <div className="flex flex-between">
                    <Title text="Contact Store" />
                    <button type="submit" className="w-4 h-4 flex flex-center fs-24 btn-primary">
                        <ion-icon name="add-outline"></ion-icon>
                    </button>
                </div>
            </div>

            <div className="list">
                <div className="flex flex-between">
                    <Title text="Payment Store" />
                    <button type="submit" className="w-4 h-4 flex flex-center fs-24 btn-primary">
                        <ion-icon name="add-outline"></ion-icon>
                    </button>
                </div>
            </div>

            <div className="list">
                <div className="flex flex-between">
                    <Title text="Social Store" />
                    <button type="submit" className="w-4 h-4 flex flex-center fs-24 btn-primary">
                        <ion-icon name="add-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InfoList;
