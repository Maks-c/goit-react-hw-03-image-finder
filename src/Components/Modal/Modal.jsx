import React, {Component} from 'react';
import {createPortal} from "react-dom";
import PropTypes from "prop-types";
import {ModalStyleOverlay, ModalStyle} from "./modalStyle";

const modalRoot = document.querySelector('#modal-root')

class Modal extends Component {



    static propTypes = {
        onClose: PropTypes.func.isRequired,
    };

    componentDidMount(){

        window.addEventListener('keydown',this.handleKeyDown)
    }

     componentWillUnmount (){
        window.removeEventListener('keydown',this.handleKeyDown)
    }

    handleKeyDown = ev => {
        if(ev.code === 'Escape') {
            this.props.onClose()
        }
    }

    handleBackDropClick=e=>{

        if(e.target === e.currentTarget){
            this.props.onClose()
        }
    }

    render(){
        return createPortal(<ModalStyleOverlay onClick={this.handleBackDropClick}>
            <ModalStyle>{this.props.children}</ModalStyle>
        </ModalStyleOverlay>, modalRoot)
    }
}


export default Modal;