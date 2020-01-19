import React,{Component} from 'react';
import './IG_style.css';
import {Link } from "react-router-dom";


class PostComment extends Component{
    constructor(props) {
        super(props);
        this.comment_id=this.props.comment_id;
        this.state = {
            // photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRotgz4yc_xXRhhT5kpys0H-QwZwfzhvTyA8jNjbhRxlNNe1Za1&s',
            //photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJD234X-jvOa02sAtzRAUEyUX4btIKp2er-XjTpUq1tdJWJk47ew&s',
            photo:this.props.author_pic,//'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAA-u2TP3HI65VnMvSUjEjU4bSxS7E4AKM4Qr3kSFzDzdNUmPrSA&s',
            name: this.props.author,//'ebi',
            link: '/public_profile/'+this.props.authorID,
            text: this.props.text//'This is a testing comment. This is a testing comment. This is a testing comment.'
        };
    }
    render(){
        //console.log(this.props.author_pic)
        return(
            <div className='post_comment'>
                {/* <div>{this.props.comment_id} comment</div> */}
                <div className="comment-user">
                    <Link to={this.state.link} className="comment-user-link">
                        <div className="comment-avatar">
                            <img src={this.state.photo} alt={this.state.name} />
                        </div>
                        <div className="comment-user-nickname" style={{color:'black'}}>
                            <p>{this.state.name}</p>
                        </div>
                    </Link>
                    
                    <div className='comment_text'>
                            <p>{this.state.text}</p>
                    </div> 
                </div>
                {/* <div className='comment_text'>
                        <p>{this.state.text}</p>
                </div> */}
            </div>
        );
    }
    
}

export default PostComment;