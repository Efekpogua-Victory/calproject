const Button = ({ btext, btype }) => {
    return (
        <button type={btype} className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
            {btext}
        </button>
    );
};

export default Button;
