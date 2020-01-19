import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';

class UploadButton extends Component{
    state = {
        modal: false
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal

        });
    }
    render(){
        return(
            <div style={{display:"inline"}}>
                <Button onClick={this.toggle} style={{ fontSize: "1.2rem" }}>Upload</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader onClick={this.toggle}>Upload Image</ModalHeader>
                    <ModalBody>
                        upload information.
                    </ModalBody>
                </Modal>
            </div>
            
        );
    }
}

export default UploadButton;