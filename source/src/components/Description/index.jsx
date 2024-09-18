const Description = ({ text, className = '' }) => (
    <p className={`description fs-14 fw-4 lh-18 text-justify mt-24 ${className}`}>{text}</p>
);

export default Description;
