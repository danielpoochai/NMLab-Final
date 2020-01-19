import React, { Component } from 'react';
import {Link } from "react-router-dom";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    NavLink
} from 'reactstrap';

class HomeButton extends Component{

    render(){
        return(
            <div style={{display:"inline"}}>
                {/* <NavLink href="https://github.com/chiajoukuo/Nmlab_final" >
                    <Button>Profile</Button>
                </NavLink> */}
                <Link to="/">
                    <Button>Home</Button>
                </Link>
            </div>
            
        );
    }
}

export default HomeButton;