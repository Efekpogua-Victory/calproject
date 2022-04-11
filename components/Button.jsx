/* eslint-disable prettier/prettier */
const Button = ({ children, btype, styles, onclick }) => {

    const action = () => {
        onclick();
    }

    return (
        <button type={btype} className={`px-6 py-2 rounded-none ${styles}`} onClick={action}>
            {children}
        </button>
    );
};

export default Button;
