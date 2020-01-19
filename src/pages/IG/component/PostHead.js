import React,{Component} from 'react';
import './IG_style.css';
import {Link } from "react-router-dom";


class PostHead extends Component{
    constructor(props) {
        super(props);
        this.state = {
            photo: this.props.pic,//'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzF2pFf814zRqNtePwN2Pr-YkNC3ZckLF09qpzaL2ZpXioAB_M&s',
            name: this.props.author,//'AUTHOR' //
            link: '/public_profile/'+this.props.authorAddr,
        };
    }
    render(){
        return(
            <header className='post_head'>
                <Link to={this.state.link} className="Post-user">
                    <div className="Post-user-avatar">
                        <img src={this.state.photo} alt={this.state.name} />
                    </div>
                    <div className="Post-user-nickname" style={{color:'black'}}>
                        <span>{this.state.name}</span>
                    </div>
                </Link>
            </header>
        );
    }
    
}

export default PostHead;