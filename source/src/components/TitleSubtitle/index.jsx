const TitleSubtitle = ({ title, subtitle, titleClassName, subtitleClassName }) => (
    <div>
        {title && <p className={`title fs-52 fw-6 lh-65 ${titleClassName}`}>{title}</p>}
        {subtitle && <p className={`subtitle fs-52 fw-6 lh-65 ${subtitleClassName}`}>{subtitle}</p>}
    </div>
);

export default TitleSubtitle;
