import React,{Component} from 'react';
import PostHead from './PostHead';
import PostImage from './PostImage';
import PostContent from './PostContent';
import PostButton from './PostButton';
import {Link } from "react-router-dom";
import './IG_style.css';

class Post extends Component{
    constructor(props) {
        super(props);
        this.state = {
            post_id: this.props.post_id,
            authorAddr : this.props.authorID,
            author : this.props.author,
            author_pic: this.props.author_pic,
            postInfo : this.props.postInfo,
            like : this.props.like,
            likeNum : this.props.likeNum,
            msgNum : this.props.msgNum,
            userNum : this.props.userNum,
            pic : this.props.pic,
            b:this.props.b
        };
        this.com = this.com.bind(this)
        this.pur = this.pur.bind(this)
    }
    com(){
        
        var num = parseInt(this.state.msgNum,10)
        this.setState({
            msgNum:num+1
        })
    }
    pur(){
        var num = parseInt(this.state.userNum,10)
        this.setState({
            userNum:num+1
        })
    }
    render(){
        //console.log(this.state.like)
        // console.log(this.state.b)
        return(
            <article className="Post" ref="Post">
                {/* <Route exact path='/test' component={PicturePage}></Route> */}
                <PostHead authorAddr = {this.state.authorAddr} author ={this.state.author} pic={this.state.author_pic}/>
                <Link to={'/posts/'+this.state.post_id}>
                    <PostImage pic = {this.state.pic} />
                </Link>
                
                <PostButton 
                    like = {this.state.like} 
                    likeNum = {this.state.likeNum} 
                    msgNum = {this.state.msgNum} 
                    userNum = {this.state.userNum} 
                    postID = {this.state.post_id} 
                    web3={this.props.web3}
                    posting={this.props.posting} 
                    user={this.props.user} 
                    accounts={this.props.accounts}
                    photo = {this.state.pic}
                    pur={this.pur}/>
                <PostContent content = {this.state.postInfo}/>
            </article>
        );
    }
    
}

export default Post;