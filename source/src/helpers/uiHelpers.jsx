// toggleVisibility Helper
export const toggleVisibility = (prevState, section) => ({
    ...prevState,
    [section]: !prevState[section],
});
