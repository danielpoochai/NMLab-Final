import React, { Component } from 'react';
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
  import CloudUploadIcon from "@material-ui/icons/CloudUpload";
  import '../pages/IG/component/IG_style.css'

class ImageUploader extends Component{
    constructor(props) {
        super(props);
        this.state = {
            url:'http://www.freeiconspng.com/uploads/upload-icon-30.png',
            url_input:'',
            modal:false,
            value:0
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        //   url: "",
        //   file: null,
            isUploading: false,
            isUploaded: false
        });
    };

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
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    loader = () => {
        const { isUploading, isUploaded } = this.state;
        if (isUploading) {
          // isUploading
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
          return (
            <img
              src="https://image.flaticon.com/icons/svg/179/179372.svg"
              style={{ width: "24px", margin: "3px", marginRight: "1rem" }}
              alt='uploading'
            />
          );
        } else {
          return null;
        }
    };
    upload = e => {
        this.setState({
            isUploading: true,
            isUploaded: false,
        });
        // e.preventDefault();
        // let formData = new FormData();
        // var file = document.querySelector("[type=file]");
        // formData.append("myImage", file.files[0]);
        // this.props.uploadImage(formData);
    };
    onSubmit = e => {
        // e.preventDefault();
        if (this.state.url_input !== "") {
            //console.log(this.state.url_input)
            this.setState({
                url:this.state.url_input,
                url_input:''
            })
            
            // const newImage = {
            //     url: this.state.url
            // };

            // Add image via addImage action
            // this.props.addImage(this.props.diaryID, { image: newImage });

            // Close modal
            this.toggle();
        }
    };

    render(){
        return(
            <>
                <div className="Post-image">
                    <div className="Post-image-bg">
                        <img alt="Upload your own." src={this.state.url} onClick={this.toggle } className='uploader'/>
                    </div>
                </div>
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
                                    <Label for="upload">Select An Image File</Label>
                                    <Input type="file" name="file" id="upload" />
                                    <div
                                    id="upload-btn"
                                    style={{ float: "right", marginTop: "0px" }}
                                    >
                                    {this.loader()}
                                    <Button size="sm" onClick={this.upload}>
                                        Upload
                                        <CloudUploadIcon
                                        size="small"
                                        style={{ marginLeft: "5px" }}
                                        />
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
                        onClick={this.onSubmit}
                        >
                        Add Image
                        </Button>
                    </ModalBody>
                </Modal>
            </>
            
        );
    }
}

export default ImageUploader;