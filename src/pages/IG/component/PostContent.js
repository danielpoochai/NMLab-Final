import React,{Component} from 'react';
import './IG_style.css';


class PostContent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            content:this.props.content//'This is a testing content and I don know what to say. Blah blah blah blah blah.'
        };
    }
    render(){
        return(
            <div className='post_content'>
                <p>{this.state.content}</p>
            </div>
        );
    }
    
}

export default PostContent;