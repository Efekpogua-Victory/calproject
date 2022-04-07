const InputElement = ({ inputype, value, onInput }) => {
    return (
        <input
            type={inputype}
            required
            value={value}
            onInput={onInput}
            className="w-full px-4 py-2 mt-2 border rounded-none focus:outline-none focus:ring-1 focus:ring-black"
        />
    );
};

export default InputElement;
