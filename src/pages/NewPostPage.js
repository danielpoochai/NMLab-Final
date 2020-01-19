import React from 'react';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import './IG/component/IG_style.css'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input
} from "reactstrap";
import StackGrid, { transitions, easings } from "react-stack-grid";
import '../css/grid_style.css'
import '../css/normalize.css'
const transition = transitions.scaleDown;


class NewPostPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzF2pFf814zRqNtePwN2Pr-YkNC3ZckLF09qpzaL2ZpXioAB_M&s',
        name:'AUTHOR',
        src:'http://www.freeiconspng.com/uploads/upload-icon-30.png',
        content:'',
        modal:false,
        value:0,
        buys:[],
        oriID:-1

        // web3:this.props.web3,
        // accounts:this.props.accounts,
        // posting:this.props.posting,
        // user:this.props.user,
      };
    } 
    UNSAFE_componentWillMount = async () => {
      const REG = await this.props.user.methods.checkREG(this.props.accounts[0]).call()
      if(REG){
        var author = await this.props.user.methods.getAuthorByAddr(this.props.accounts[0]).call()
        var author_name = author[2]
        var author_photo = author[1]
        //----------buy--------
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
    createPost = async() => {
      console.log("upload")
      await this.props.pu.methods.createUsePost(this.state.content,this.state.src,this.state.oriID).send({ from: this.props.accounts[0]})
      let path = `/bought_posts`;
      this.props.history.push(path);
    }
    click_upload = async() =>{
      var buy_ids = await this.props.posting.methods.getUserbyAddr(this.props.accounts[0]).call()
      var buys = []
      for(var idx=0; idx<buy_ids.length; idx++){
        var pid = buy_ids[idx]
        var post = await this.props.posting.methods.getPostByID(pid).call()
        buys.push({src:post[6], text:post[2], post_id:pid})
      }
      this.setState({
        buys:buys
      })
      this.toggle()

    }
    choose_img(src,oriID){
      this.setState({
        src:src,
        oriID:oriID
      })
      this.toggle()
    }

    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
    toggle = () => {
      this.setState({
          modal: !this.state.modal,
          isUploading: false,
          isUploaded: false
      });
    };
  
    render() {
      return (
        <>
            <div className='between'></div>
            <h1 className='upload_title'>New Post</h1>
            <div className='between'></div>
            <div style={{display:'inline'}}>
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
                {/* <ImageUploader /> */}
                <div className="Post-image">
                  <div className="Post-image-bg">
                      <img alt="Upload your own." src={this.state.src} onClick={this.click_upload} className='uploader'/>
                  </div>
              </div>
                <div className='post_buttons'>
                  <img className='like_button_static' src='https://image.flaticon.com/icons/svg/149/149217.svg' alt='like_button_static'/>
                  <span className='like_num'>0</span>
                  <img className='message_button' src='https://image.flaticon.com/icons/svg/1380/1380338.svg' alt='message_button'/>
                  <span className='like_num'>0</span>
                  <img className='purchase_button_static' src='https://image.flaticon.com/icons/svg/1170/1170678.svg' alt='purchase_button'/>
                  <span className='like_num'>0</span>
                </div>
                <div className='post_content'>
                  {/* <p>{this.state.content}</p> */}
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
                  Post
                  <CloudUploadIcon
                  size="small"
                  style={{ marginLeft: "5px" }}
                  />
                </Button>
              </div>
              </article>
            </div>     
            <div className='between'></div>
            <div className='foot'></div>
            <div className='bgg'></div>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader onClick={this.toggle}>
                  Choose one image.
              </ModalHeader>
              <ModalBody>
              <StackGrid
                monitorImagesLoaded
                columnWidth={80}
                duration={600}
                gutterWidth={15}
                gutterHeight={15}
                easing={easings.cubicOut}
                appearDelay={60}
                appear={transition.appear}
                appeared={transition.appeared}
                enter={transition.enter}
                entered={transition.entered}
                leaved={transition.leaved}
                >
                    {this.state.buys.map(
                        element => (
                            <figure key={element.src} className="image">
                                {/* <Link to={"/posts/"+element.post_id}> */}
                                    <img src={element.src} alt={element.text} onClick={this.choose_img.bind(this,element.src,element.post_id)}/>  
                                {/* </Link> */}
                            </figure>
                        )
                    )}
                </StackGrid>
                {/* <Photos/> */}

                {/* <Button
                  color="dark"
                  style={{ marginTop: "1rem" }}
                  block
                  onClick={this.onSubmit}
                  >
                  Add Image
                </Button> */}
              </ModalBody>
            </Modal>
            
        </>
      );
    }
  }
export default NewPostPage;