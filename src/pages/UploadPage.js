import React from 'react';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import './IG/component/IG_style.css'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
  } from "reactstrap";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { useHistory } from 'react-router-dom';

const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI({
  host: 'localhost',
  port: '5001',
  protocol: 'http'
});
const imghash = require('imghash');

let saveImageToIPFS = (reader) => {
  return new Promise(function(resolve, reject) {
      const buffer = Buffer.from(reader.result);
      //console.log(buffer)
      ipfs.add(buffer).then((response) => {
      //console.log(response)
      resolve(response[0].hash);
   }).catch((err) => {
      console.error(err)
      reject(err);
   })
})
}

let getImgHash = (reader) => {
  return new Promise(function(resolve, reject) {
    const buffer = Buffer.from(reader.result);
    imghash.hash(buffer).then((response) => {
      console.log(response)
      resolve(response);
    }).catch((err) => {
      console.error(err)
      reject(err);
   })
})
}


class UploadPage extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        web3:this.props.web3,
        accounts:this.props.accounts,
        posting:this.props.posting,
        user:this.props.user,
        photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzF2pFf814zRqNtePwN2Pr-YkNC3ZckLF09qpzaL2ZpXioAB_M&s',
        name:'AUTHOR',
        content:'',
        url:'http://www.freeiconspng.com/uploads/upload-icon-30.png',
        url_input:'',//https://i.pinimg.com/originals/06/8d/de/068dde048a027d55b74216b801a6c2f5.png
        imgHash:'',
        upload_url:'http://www.freeiconspng.com/uploads/upload-icon-30.png',
        modal:false,
        value:0,
        isUploaded: false,
        isUploading: false
      };
      //this.upload = this.upload.bind(this);

    }

    UNSAFE_componentWillMount = async () => {
      const REG = await this.props.user.methods.checkREG(this.props.accounts[0]).call()
      if(REG){
        var author = await this.state.user.methods.getAuthorByAddr(this.state.accounts[0]).call()
        //console.log(author)
        var author_name = author[2]
        var author_photo = author[1]
        //console.log(author_name,author_photo)
        this.setState({
          photo:author_photo,
          name:author_name
        })
      }
      else{
        alert(
          `Set your name and photo first!`,
        );
        this.props.history.push("/setting");
      }
      
    };

    componentDidUpdate(prevProps, prevState) {
      if(prevState.upload_url!== this.state.upload_url){
        this.setState({
          isUploaded: true,
          isUploading: false
        })
      }
    }

    createPost = async() => {
      console.log("upload")
      //this.setState({content:''})
      this.state.posting.events.CreatePost(function(error, result){
        if (!error) {
          //console.log(result.returnValues.success);
          if (result.returnValues.success === false){
            alert(
              `Picture duplication!`,
            );
          }
        }
      });
      await this.state.posting.methods.createPost(this.state.content,this.state.url,this.state.imgHash).send({ from: this.state.accounts[0]})
      let path = `/home`;
      this.props.history.push(path);
    }

    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

    toggle = () => {
      this.setState({
          modal: !this.state.modal,
          url_input:'',
          isUploading: false,
          isUploaded: false
      });
    };
    
    addImage = e => {
      // e.preventDefault();
      if (this.state.value===0 && this.state.url_input !== "") {
          //console.log(this.state.url_input)
          this.setState({
              url:this.state.url_input,
              url_input:'',
              imgHash:''
          })
          this.toggle();
      }
      else if(this.state.upload_url!==""){
        this.setState({
          url:this.state.upload_url,
          upload_url:''
        })
        this.toggle();
      }
    };
    /*  swipe   */
    handleChange = (e, newValue) => {
        this.setState({
          value: newValue
        });
    };

    handleChangeIndex = index => {
        this.setState({
            value: index
        });
    };
    /*  load   */  

    loader = () => {
        const { isUploading, isUploaded } = this.state;
        if (isUploading) {
          // isUploading
          console.log('is uploading')
          return (
            <div
              className="spinner-border text-info"
              role="status"
              style={{ marginRight: "1rem", verticalAlign: "bottom " }}
            >
              <span className="sr-only">Loading...</span>
            </div>
          );
        } else if (!isUploading && isUploaded) {
          // !isUploading && isUploaded
          console.log('is uploaded')
          return (
            <img
              src="https://image.flaticon.com/icons/svg/179/179372.svg"
              alt='uploading'
              style={{ width: "24px", margin: "3px", marginRight: "1rem" }}
            />
          );
        } else {
          return null;
        }
    };
    upload = e => {
      
      var file = this.refs.file.files[0];
      //console.log(this.refs.file.files[0]);
      if(file){
        this.setState({
          isUploading: true,
          isUploaded: false,
        });
        var reader = new FileReader();
        reader.readAsArrayBuffer(file)
        reader.onloadend = function(e) {
        //console.log(reader);
        //console.log(this.refs.file.files);
        saveImageToIPFS(reader).then((hash) => {
          //console.log("hash",hash);
          this.setState({upload_url: "http://localhost:8080/ipfs/"+hash})
        });
        getImgHash(reader).then((hash) => {
          //console.log("hash",hash);
          this.setState({imgHash: hash})
        });
        }.bind(this);
      }
      else{
        alert(
          `Please choose a file before upload.`,
        );
      }
    };


    render() {
      return (
        <>
            <div className='between'></div>
            <h1 className='upload_title'>Upload</h1>
            <div className='between'></div>

            <article className="picture_Post" >
              <header className='post_head'>
                  <div className="Post-user">
                      <div className="Post-user-avatar">
                          <img src={this.state.photo} alt={this.state.name} />
                      </div>
                      <div className="Post-user-nickname" style={{color:'black'}}>
                          <span>{this.state.name}</span>
                      </div>
                  </div>
              </header>
              <div className="Post-image">
                  <div className="Post-image-bg">
                      <img alt="Upload your own." src={this.state.url} onClick={this.toggle } className='uploader'/>
                  </div>
              </div>
              <div className='post_buttons'>
                <img className='like_button_static' src='https://image.flaticon.com/icons/svg/149/149217.svg' alt='like_button'/>
                <span className='like_num'>0</span>
                <img className='message_button' src='https://image.flaticon.com/icons/svg/1380/1380338.svg' alt='message_button'/>
                <span className='like_num'>0</span>
                <img className='purchase_button_static' src='https://image.flaticon.com/icons/svg/1170/1170678.svg' alt='pyrchase_button'/>
                <span className='like_num'>0</span>
              </div>

              <div className='post_content'>
                <Input
                    value={this.state.content}
                    type="textarea"
                    name="content"
                    placeholder="Write some discription here."
                    style={{ height: "100px" }}
                    onChange={this.onChange}
                    required
                />
              </div>
              <div>
                <Button size="sm" onClick={this.createPost} style={{ marginBottom: "5px"}} >
                  Upload
                  <CloudUploadIcon
                  size="small"
                  style={{ marginLeft: "5px" }}
                  />
                </Button>
              </div>

            </article>
            <div className='between'></div>
            <div className='foot'></div>
            <div className='bgg'></div>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader onClick={this.toggle}>
                        Upload your own image.
                    </ModalHeader>
                    <ModalBody>
                        <AppBar position="static" color="default">
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                        >
                            <Tab label="URL" />
                            <Tab label="Upload" />
                        </Tabs>
                        </AppBar>
                        <SwipeableViews
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                        >
                            <Typography
                                component="div"
                                style={{
                                padding: 6 * 3,
                                marginTop: "15px",
                                alignItems: "center"
                                }}
                            >
                                <Form>
                                <FormGroup>
                                    <Label for="url">Image URL</Label>
                                    <Input
                                    value={this.state.url_input}
                                    type="text"
                                    name="url_input"
                                    //id="url"
                                    className="mb-3"
                                    placeholder="please enter Image URL"
                                    onChange={this.onChange}
                                    required
                                    />
                                </FormGroup>
                                </Form>
                            </Typography>

                            <Typography
                                component="div"
                                style={{ padding: 6 * 3, marginTop: "15px" }}
                            >
                                <Form>
                                <FormGroup>
                                    <label id="upload">Select An Image File</label>
                                    <input type="file" name="file" ref="file" id="upload" multiple="multiple" accept=".gif,.png,.jpg"/>
                                    <div>
                                      <img style={{width: 300}}src={this.state.upload_url} alt=""/>
                                    </div>
                                    <div
                                    id="upload-btn"
                                    style={{ float: "right", marginTop: "0px" }}
                                    >
                                      {this.loader()}
                                      <Button size="sm" onClick = {this.upload} style={{ marginLeft: "20px" }}>
                                          Upload
                                          <CloudUploadIcon size="small" style={{ marginLeft: "5px" }}/>
                                      </Button>
                                    </div>
                                </FormGroup>
                                </Form>
                            </Typography>
                        </SwipeableViews>
                        <Button
                        color="dark"
                        style={{ marginTop: "1rem" }}
                        block
                        onClick={this.addImage}
                        >
                        Add Image
                        </Button>
                    </ModalBody>
                </Modal>
        </>
      );
    }
  }
export default UploadPage;