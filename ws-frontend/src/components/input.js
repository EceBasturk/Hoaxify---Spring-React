import React from "react";

//statefull değil
//jsx dönecek
//props: properties
const Input = (props) => {
    const { label, error, name, onChange, type } = props;
    const className = error ? 'form-control is-invalid' : 'form-control';
    return (
        <div className="mb-3 container">
            <label><b>{label}</b></label>
            <input name={name} className={className} onChange={onChange} type={type} />
            <div className="invalid-feedback">{props.error}</div>
        </div>
    );
}

export default Input;