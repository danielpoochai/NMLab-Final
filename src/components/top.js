import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    NavLink
} from 'reactstrap';
import { IoLogoGithub } from "react-icons/io";
import '../css/style.css';
import UploadButton from './UploadButton';
import ProfileButton from './ProfileButton';
import LoginButton from './LoginButton';
import HomeButton from './HomeButton';

class Top extends Component{

    render(){
        return(
            <div className="top">
                {/* <h1 className="topic">Photo Gallery</h1> */}
                
                <div className="top_right">
                    <HomeButton className="top_left"></HomeButton>
                    <UploadButton></UploadButton>
                    <LoginButton></LoginButton>
                    <ProfileButton></ProfileButton>
                    {/* <Button>
                        <NavLink href="https://github.com/chiajoukuo/Nmlab_final" >
                            <IoLogoGithub size={25} className="my_page_button"/>
                        </NavLink>
                    </Button> */}
                </div>
            </div>

        );
    }
}

export default Top;