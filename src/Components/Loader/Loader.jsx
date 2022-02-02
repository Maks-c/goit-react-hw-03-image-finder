import React from 'react';
import {Circles} from "react-loader-spinner";
const Loader = () => {
    return (
        <div>
            <Circles color="#00BFFF" height={80} width={80}/>
            Loading...
        </div>
    );
};

export default Loader;