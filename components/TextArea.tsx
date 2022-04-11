/* eslint-disable prettier/prettier */
const TextArea = (props) => {
    const onInput = () => {
        props.onInput();
    };
    return <textarea
        name={props.name}
        rows={props.rows}
        onInput={onInput}
        className="w-full px-4 py-2 mt-2 border rounded-none focus:outline-none focus:ring-1 focus:ring-black"
    ></textarea>;
};

export default TextArea;
