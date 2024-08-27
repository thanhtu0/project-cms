import './Title.scss';
const Title = ({ text }) => {
    return (
        <div className="title-content">
            <p className="text fs-24 fw-7">{text}</p>
        </div>
    );
};

export default Title;
