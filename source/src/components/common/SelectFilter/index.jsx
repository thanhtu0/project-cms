const SelectFilter = ({ value, options, onChange, label }) => {
    return (
        <div className="select-filter flex flex-between w-100">
            <label>{label}:</label>
            <select className="fs-16 bg-gray-f1" value={value} onChange={onChange}>
                <option value="">Select {label}</option>
                {options.map((option) => (
                    <option className="bg-white text-black-1" key={option.id} value={option.name}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectFilter;
