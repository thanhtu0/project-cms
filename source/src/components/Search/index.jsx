import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = ({ placeholder, buttonText, width, buttonWidth, onSearch }) => {
    return (
        <div className="search-bar flex position-relative" style={{ width }}>
            <input className="search-bar__input wBtn-100 h-38" type="text" placeholder={placeholder} />
            <button
                type="button"
                className="search-bar__button flex flex-center h-100 bg-black text-white position-absolute top-0 right-0"
                style={{ width: buttonWidth }}
                onClick={onSearch}
            >
                <FontAwesomeIcon icon={faSearch} />
                <span className="ml-1">{buttonText}</span>
            </button>
        </div>
    );
};

export default Search;
