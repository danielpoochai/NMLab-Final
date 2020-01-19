import React, { Component } from 'react';
import {Link } from "react-router-dom";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    NavLink
} from 'reactstrap';

class ProfileButton extends Component{

    render(){
        return(
            <div style={{display:"inline"}}>
                {/* <NavLink href="https://github.com/chiajoukuo/Nmlab_final" >
                    <Button>Profile</Button>
                </NavLink> */}
                <Link to="/profile">
                    <Button>Profile</Button>
                </Link>
            </div>
            
        );
    }
}

export default ProfileButton;