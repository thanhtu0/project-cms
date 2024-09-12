const { useState } = require('react');

const useImagePreview = (initialImage) => {
    const [imagePreview, setImagePreview] = useState(initialImage);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(initialImage);
        }
    };

    return { imagePreview, setImagePreview, handleImageChange };
};

export default useImagePreview;
