export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-normal text-base text-gray-700 font-roboto font-light ` + className}>
            {value ? value : children}
        </label>
    );
}
