import React,{Component} from 'react';
import './IG_style.css';
import {Link } from "react-router-dom";
import {Input} from "reactstrap";


class PostMessage extends Component{
    constructor(props) {
        super(props);
        this.comment_id=this.props.comment_id;
        this.state = {
            // photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRotgz4yc_xXRhhT5kpys0H-QwZwfzhvTyA8jNjbhRxlNNe1Za1&s',
            //photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJD234X-jvOa02sAtzRAUEyUX4btIKp2er-XjTpUq1tdJWJk47ew&s',
            photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzF2pFf814zRqNtePwN2Pr-YkNC3ZckLF09qpzaL2ZpXioAB_M&s',
            name:'AUTHOR',
            text: ''
        };
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        //console.log(this.state.text)
    };
    handleKeyDown = e => {
        if (e.key === 'Enter') {
            this.setState({
                text:''
            })
        }
    }
    render(){
        return(
            <div className='post_comment'>
                {/* <div>{this.props.comment_id} comment</div> */}
                <div className="comment-user">
                    <div to="/public_profile" className="comment-user-link">
                        <div className="comment-avatar">
                            <img src={this.state.photo} alt={this.state.name} />
                        </div>
                        <div className="comment-user-nickname" style={{color:'black'}}>
                            <p>{this.state.name}</p>
                        </div>
                    </div>
                    
                    <div className='comment_text'>
                            {/* <p>{this.state.text}</p> */}
                            <Input
                                value={this.state.text}
                                type="text"
                                name="text"
                                id="text"
                                className="mb-3"
                                placeholder="Leave a message."
                                onChange={this.onChange}
                                onKeyDown={this.handleKeyDown}
                                required
                            />
                    </div> 
                </div>
                {/* <div className='comment_text'>
                        <p>{this.state.text}</p>
                </div> */}
            </div>
        );
    }
    
}

export default PostMessage;