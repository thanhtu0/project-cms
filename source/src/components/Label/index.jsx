import './Label.scss';
const Label = ({ text, className }) => <p className={`label ${className}`}>{text}</p>;

export default Label;
