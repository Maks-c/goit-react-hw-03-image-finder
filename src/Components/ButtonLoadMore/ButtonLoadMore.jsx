import React from 'react';
import PropTypes from 'prop-types';
import {ButtonLoadMoreStyle} from "./ButtonLoadMoreStyle";
const ButtonLoadMore = ({onClick}) => {
    return (
        <ButtonLoadMoreStyle type='button' onClick={onClick}>Load More</ButtonLoadMoreStyle>
    );
};


ButtonLoadMore.propTypes={
    onClick:PropTypes.func.isRequired
}


export default ButtonLoadMore;