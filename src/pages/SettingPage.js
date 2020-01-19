import React,{Component} from 'react';
import './IG/component/IG_style.css'
import '../css/style.css'
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
import { Icon } from 'react-icons-kit'
import {upload3} from 'react-icons-kit/icomoon/upload3'
import {ic_save} from 'react-icons-kit/md/ic_save'

const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI({
  host: 'localhost',
  port: '5001',
  protocol: 'http'
});

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

class SettingPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            web3:this.props.web3,
            accounts:this.props.accounts,
            posting:this.props.posting,
            user:this.props.user,
            user_name_input:'',
            user_photo_input:'',
            photo:"https://image.flaticon.com/icons/svg/149/149071.svg",
            upload_img:"",
            modal:false,
            isUploading: false,
            isUploaded: false
        };
        this.save_setting = this.save_setting.bind(this);
        this.upload = this.upload.bind(this);
        this.addImage = this.addImage.bind(this)
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.upload_img!== this.state.upload_img){
          this.setState({
            isUploaded: true,
            isUploading: false
          })
        }
      }
      loader = () => {
        const { isUploading, isUploaded } = this.state;
        if (isUploading) {
          // isUploading
          console.log('is uploading')
          return (
            <div
              className="spinner-border text-info"
              role="status"
              style={{ marginRight: "1rem", verticalAlign: "bottom ",marginBottom:'10px'  }}
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
              style={{ width: "24px", margin: "3px", marginRight: "1rem",marginBottom:'10px'  }}
            />
          );
        } else {
          return null;
        }
    };
    upload (){
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
            this.setState({upload_img: "http://localhost:8080/ipfs/"+hash})
          });
          }.bind(this);
        }
        else{
          alert(
            `Please choose a file before upload.`,
          );
        }
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            isUploading: false,
            isUploaded: false
        });
      };
    addImage(){
        this.setState({
            photo:this.state.upload_img,
            user_photo_input:this.state.upload_img
        })
        this.toggle()
    }
    async save_setting () {
        if(this.state.user_name_input==='' && this.state.user_photo_input===''){
            alert(
                `Nothing to set!`,
            );
        }
        else{
            const REG = await this.state.user.methods.checkREG(this.state.accounts[0]).call()
            if(REG){
                if(this.state.user_name_input!==''){
                    await this.state.user.methods.setName(this.state.accounts[0], this.state.user_name_input).send({ from: this.state.accounts[0]});
                }
                if(this.state.user_photo_input!==''){
                    await this.state.user.methods.setPersonalPic (this.state.accounts[0], this.state.user_photo_input).send({ from: this.state.accounts[0]});
                }
                this.setState({
                    user_name_input:'',
                    user_photo_input:''
                })
                let path = `/home`;
                this.props.history.push(path);
            }
            else{
                if(this.state.user_name_input===''){
                    alert(
                        `Please enter your name!`,
                    );
                }
                else if(this.state.user_photo_input===''){
                    alert(
                        `Please choose a photo!`,
                    );
                }
                else{
                    var arr1=[]
                    var arr2=[]
                    await this.state.user.methods.createAuthor(this.state.accounts[0], this.state.user_photo_input, this.state.user_name_input,arr1, arr2).send({ from: this.state.accounts[0]});
                    this.setState({
                        user_name_input:'',
                        user_photo_input:''
                    })
                    let path = `/home`;
                    this.props.history.push(path);
                }
            }
            
        }
        
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    handleKeyDown = async(e) => {
        if (e.key === 'Enter') {
            //const comments = [...this.state.comments, this.state.comments.length]
            await this.state.posting.methods.SetMessage(this.state.user_name_input).send({ from: this.state.accounts[0]});
            this.setState({
                user_name_input:''
            })
            console.log(await this.state.posting.methods.SayHello().call());
        }
    }
    render(){
        return(
            //https://medium.com/@willhowardgb/building-a-beautiful-text-input-component-in-react-f85564cc7e86
            <>
                <div className='between'></div>
                <h1 className='upload_title'>Settings</h1>
                <div className='between'></div>
                <div className='setting_bg'>
                    <div className='setting_line'>
                        <h3 className='setting_item_name'>User Name : </h3>
                        <Input
                            value={this.state.user_name_input}
                            type="text"
                            name="user_name_input"
                            className="setting_input"
                            placeholder="Enter your name here."
                            style={{ width: "550px",backgroundColor:"transparent", color:"#d3cfcf" }} // margin:"0px auto",
                            onChange={this.onChange}
                            //onKeyDown={this.handleKeyDown}
                            required
                        />
                    </div>
                    <div className='setting_line'>
                        <h3 className='setting_item_name'>Photo : </h3>
                        <Input
                            value={this.state.user_photo_input}
                            type="text"
                            name="user_photo_input"
                            className="setting_input"
                            placeholder="Enter your photo url here or upload by clicking the upload button to generate url."
                            style={{ width: "610px",backgroundColor:"transparent", color:"#d3cfcf" }} // margin:"0px auto",
                            onChange={this.onChange}
                            //onKeyDown={this.handleKeyDown}
                            required
                        />
                       <Button size="sm" onClick={this.toggle} style={{ marginLeft: "15px", height:"32px", width:"37px", marginTop:"5px"}} >
                            <Icon icon={upload3} size={20} />
                        </Button>
                        <div className="Post-user-avatar">
                            <img src={this.state.photo} alt={"avatar"} style={{ marginLeft: "10px", marginTop:"5px"}}/>
                        </div>
                    </div>
                    <div className='setting_line' >
                        <Button size="sm" onClick={this.save_setting} style={{ marginBottom: "5px", marginTop: "5px"}} >
                            Save
                            <Icon icon={ic_save} size={20} style={{ marginLeft: "5px"}}/>
                        </Button>
                    </div>
                    
                </div>
                <div className='bgg'></div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader onClick={this.toggle}>
                        Upload your avatar.
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                        <FormGroup>
                            <label id="upload">Select An Image File</label>
                            <input type="file" name="file" ref="file" id="upload" multiple="multiple" accept=".gif,.png,.jpg"/>
                            <div>
                                <img style={{width: 100, marginLeft: "10px", marginTop:'20px'}} src={this.state.upload_img} alt=""/>
                            </div>
                            <div
                            id="upload-btn"
                            style={{ float: "right", marginTop: "0px" }}
                            >
                                {this.loader()}
                                <Button size="sm" onClick = {this.upload} style={{ marginLeft: "10px", marginBottom:'10px' }}>
                                    Upload
                                    <Icon icon={upload3} size={20} style={{ marginLeft: "10px" }}/>
                                </Button>
                            </div>
                        </FormGroup>
                        </Form>
                        <Button
                        color="dark"
                        style={{ marginTop: "1rem" }}
                        block
                        onClick={this.addImage}
                        >
                        OK
                        </Button>
                    </ModalBody>
                </Modal>
                    
            </>
        );
    }
    
}

export default SettingPage;
