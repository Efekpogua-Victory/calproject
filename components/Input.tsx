/* eslint-disable prettier/prettier */

const Input = (props) => {
    const onInput = () => {
        props.onInput();
    }
    return (
        <input
            type={props.type}
            required={props.required}
            value={props.value}
            name={props.name}
            onInput={onInput}
            className="w-full px-4 py-2 mt-2 border rounded-none focus:outline-none focus:ring-1 focus:ring-black"
        />
    );
};

export default Input;
