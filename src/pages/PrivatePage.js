import React from 'react';
import StackGrid, { transitions, easings } from "react-stack-grid";
import {Link } from "react-router-dom";
import '../css/grid_style.css'
import '../css/normalize.css'
import {ic_fast_forward} from 'react-icons-kit/md/ic_fast_forward'
import { Icon } from 'react-icons-kit'

const transition = transitions.scaleDown;

class PrivatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      REG:false,
      userName: '',//'username',
      avatar: '',//'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzF2pFf814zRqNtePwN2Pr-YkNC3ZckLF09qpzaL2ZpXioAB_M&s',
      photos: [],
      buys:[],
      posts:[]
    };
    this.forward = this.forward.bind(this)
  }
  UNSAFE_componentWillMount = async () => {
    const REG = await this.props.user.methods.checkREG(this.props.accounts[0]).call()
    if(REG){
      var user = await this.props.user.methods.getAuthorByAddr(this.props.accounts[0]).call()
      //----------upload---------
      var upload_ids = await this.props.posting.methods.getPostsByAddr(this.props.accounts[0]).call()
      var photos = []
      for(var idx=0; idx<upload_ids.length; idx++){
        var pid = upload_ids[idx]
        var post = await this.props.posting.methods.getPostByID(pid).call()
        photos.push({src:post[6], text:post[2], post_id:pid})
      }
      //----------buy---------
      var buy_ids = await this.props.posting.methods.getUserbyAddr(this.props.accounts[0]).call()
      var buys = []
      for(idx=0; idx<buy_ids.length; idx++){
        pid = buy_ids[idx]
        post = await this.props.posting.methods.getPostByID(pid).call()
        buys.push({src:post[6], text:post[2], post_id:pid})
      }
      //----------post---------
      var post_ids = await this.props.pu.methods.getUsePostsByAddr(this.props.accounts[0]).call()
      var posts = []
      for(idx=0; idx<post_ids.length; idx++){
        pid = post_ids[idx]
        post = await this.props.pu.methods.getUsePostByID(pid).call()
        posts.push({src:post[5], text:post[1], post_id:pid})
      }

      this.setState({
        REG:true,
        userName : user[2],
        avatar:user[1],
        photos:photos,
        posts:posts,
        buys:buys
      })
    }
    else{
      this.setState({
        REG:false
      })
      alert(
        `Set your name and photo first!`,
      );
      this.props.history.push("/setting");
    }
  };  
  async forward(){
    console.log("forward")
    const Ebi = [
            {src:"https://3.bp.blogspot.com/-Aep5iCmfvHc/WXlHL2rDogI/AAAAAAAI-rU/oJ-bkMFY7JclOUs2OL0T7676vLcv2wruACLcBGAs/s1600/AS002891_05.gif",text:"Tea time!"},
            {src:"https://3.bp.blogspot.com/-ddmo0wAIwuo/W5CAHFw1F5I/AAAAAAAMA7c/kAtZFa_yycEHQ16KTwJRLVXleSkOV5ZNwCLcBGAs/s1600/AS0004383_00.gif",text:"Wow!"},
            {src:"https://3.bp.blogspot.com/-JRBKYyOlaeM/W5CAHJCdIwI/AAAAAAAMA7k/MGrTqVE9SI8dqjafLH1gKghPQWIZLfXKwCLcBGAs/s1600/AS0004383_01.gif",text:"Got it!"},
            {src:"https://2.bp.blogspot.com/-mJ3-qks_rgk/WDZuKY6HxEI/AAAAAAADyGc/IeVCeI_I2r4OU8vUP4OFcu27QBhObSgzQCLcB/s1600/AS000637_16.gif",text:"Ah."}]
    for(var i=0;i<4;i++){
      await this.props.posting.methods.createPost(Ebi[i].text,Ebi[i].src).send({ from: this.props.accounts[0]})
    }
  }
  render() {
    if(this.state.REG===false){
      return(
        <div ></div>
      )

    }
    return (
      <div>
          <div className='between'></div>
          <div className = 'profile_header'>
            <div className='profile_avatar'>
              <img src={this.state.avatar} alt=""/>
            </div>
            <div>
              <h1 className='profile_author'>{this.state.userName}</h1>
            </div>
            <Icon icon={ic_fast_forward} size={40} style={{marginLeft:"10px"}} onClick={this.forward}/>
          </div>
          {/* <div className='between'></div> */}
          <h1 className='profile_author'>My images</h1>
          <div className='between'></div>
          <StackGrid
              monitorImagesLoaded
              columnWidth={300}
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
              {this.state.photos.map(
                  element => (
                      <figure key={element.src} className="image">
                          <Link to={"/posts/"+element.post_id}>
                              <img src={element.src} alt={element.text}/>  
                              {/* <figcaption>{element.text}</figcaption> */}
                          </Link>
                      </figure>
                  )
              )}
          </StackGrid>
          <div className='between'></div>
          <div className='between'></div>
          <div className='between'></div>

          <h1 className='profile_author'>My posts</h1>
          <div className='between'></div>
          <StackGrid
              monitorImagesLoaded
              columnWidth={300}
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
              {this.state.posts.map(
                  element => (
                      <figure key={element.src} className="image">
                          <Link to={"/bought_posts/"+element.post_id}>
                              <img src={element.src} alt={element.text}/>  
                          </Link>
                      </figure>
                  )
              )}
          </StackGrid>
          <div className='between'></div>
          <div className='between'></div>
          <div className='between'></div>

          <h1 className='profile_author'>images I bought</h1>
          <div className='between'></div>
          <StackGrid
              monitorImagesLoaded
              columnWidth={300}
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
                          <Link to={"/posts/"+element.post_id}>
                              <img src={element.src} alt={element.text}/>  
                              {/* <figcaption>{element.text}</figcaption> */}
                          </Link>
                      </figure>
                  )
              )}
          </StackGrid>
          <div className='between'></div>
          <div className='bgg'></div>
      </div>
    );
  }
}
export default PrivatePage;