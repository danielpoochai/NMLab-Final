import React, { Component} from 'react';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
} from 'reactstrap';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import { IoLogoGithub } from "react-icons/io";
import '../css/style.css'
import '../pages/IG/component/IG_style.css';
import { Icon } from 'react-icons-kit'
import {ic_settings} from 'react-icons-kit/md/ic_settings'
import {ic_live_help} from 'react-icons-kit/md/ic_live_help'
import {ic_help_outline} from 'react-icons-kit/md/ic_help_outline'
import {ic_autorenew} from 'react-icons-kit/md/ic_autorenew'

class MyNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      //photo:"https://www.flaticon.com/premium-icon/icons/svg/1144/1144811.svg"//https://3.bp.blogspot.com/-Aep5iCmfvHc/WXlHL2rDogI/AAAAAAAI-rU/oJ-bkMFY7JclOUs2OL0T7676vLcv2wruACLcBGAs/s1600/AS002891_05.gif",
      photo:"https://image.flaticon.com/icons/svg/149/149071.svg"
    }
  }
    toggle = () => {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
    UNSAFE_componentWillMount = async () => {
      var author = await this.props.user.methods.getAuthorByAddr(this.props.accounts[0]).call()
      if(author){
        var author_photo = author[1]
        if(author[1]!==""){
          this.setState({
            photo:author_photo,
          })
        }
      }


    };
  
    render() {
  
      return (
        <div className='navbar_div'>
          <Navbar color="dark" dark expand="sm"  >
            <Container>
              <NavbarBrand href='/home'>Gallery</NavbarBrand>
              <NavbarBrand href='/bought_posts'>Posts</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="mr-auto" navbar>
                  
                    {/* <Fragment>
                      <NavItem>
                        <NavLink href="/" style={{ fontSize: "1.2rem" }}>Upload</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="/app" style={{ fontSize: "1.2rem" }}>Calendar</NavLink>
                      </NavItem>
                    </Fragment>
                     */}
                  
                </Nav>
                <Nav className='ml-auto' navbar>
                  {/* {isAuthenticated ? authLinks : null} */}
                  <NavItem>
                    <NavLink href="/new_post" style={{ fontSize: "1.2rem" }}>Post</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/upload" style={{ fontSize: "1.2rem" }}>Upload</NavLink>
                  </NavItem>
                  {/* <NavItem>
                    <a href="/http://localhost:9966/" >
                      <Icon icon={ic_autorenew} size={23} style={{marginTop:"8px"}}/>
                    </a>
                  </NavItem> */}
                  <NavItem>
                    <NavLink href="http://localhost:9966/">
                      <Icon icon={ic_autorenew} size={23}/>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/help">
                      <Icon icon={ic_help_outline} size={23}/>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/setting">
                      <Icon icon={ic_settings} size={20}/>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/profile">
                      {/* <IoLogoGithub size={25} /> */}
                      <div className="Post-user-avatar">
                        <img src={this.state.photo} alt={"avatar"} />
                      </div>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
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
  

  
  export default MyNavbar;