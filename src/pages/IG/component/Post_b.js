import React,{Component} from 'react';
import PostHeadB from './PostHeadB';
import PostImage from './PostImage';
import PostContent from './PostContent';
import PostButtonB from './PostButtonB';
import {Link } from "react-router-dom";
import './IG_style.css';

class PostB extends Component{
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
    }
    render(){
        console.log(this.props.oriAuthor,this.props.oriAuthorID)
        return(
            <article className="Post" ref="Post">
                {/* <Route exact path='/test' component={PicturePage}></Route> */}
                <PostHeadB authorAddr = {this.state.authorAddr} author ={this.state.author} pic={this.state.author_pic}/>
                <div className='post_credit'>
                    <span>Image created by </span>
                    <Link to={'/public_profile/'+this.props.oriAuthorID}>
                        {this.props.oriAuthor}
                    </Link>
                </div>
                <Link to={'/bought_posts/'+this.state.post_id}>
                    <PostImage pic = {this.state.pic} />
                </Link>

                <PostButtonB
                    like = {this.state.like} 
                    likeNum = {this.state.likeNum} 
                    msgNum = {this.state.msgNum} 
                    postID = {this.state.post_id} 
                    web3={this.props.web3}
                    posting={this.props.pu} 
                    user={this.props.user} 
                    accounts={this.props.accounts}
                    photo = {this.state.pic}/>
                <PostContent content = {this.state.postInfo}/>
            </article>
        );
    }
    
}

export default PostB;