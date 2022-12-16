import React from "react";

const Input = (props) => {
    const { label, error, name, onChange, type, defaultValue } = props;
    const className = error ? 'form-control is-invalid' : 'form-control';
    return (
        <div className="mb-3 container">
            <label><b>{label}</b></label>
            <input name={name} className={className} onChange={onChange} type={type} defaultValue={defaultValue} />
            <div className="invalid-feedback">{props.error} </div>
        </div>
    );
}

export default Input;