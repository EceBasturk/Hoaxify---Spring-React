import React from "react";

const ObjeView = props => {
    const { obje } = props;
    return <div className="card p-1 m-2"> {obje.content}</div>
}

export default ObjeView;