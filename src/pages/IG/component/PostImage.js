import React,{Component} from 'react';
import './IG_style.css';
// import {Link } from "react-router-dom";


class PostImage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            src:this.props.pic//'http://s07.tku.edu.tw/~407610103/images/sg8.png'
        };
    }
    no(e){
        console.log("no",e)
        if(e.button == 2){ 
            console.log("nono")
            e.preventDefault(); 
            return false; 
        } 
    }
    render(){
        //var link = '/posts/'+this.props.postID
        //console.log('link:',link)
        
        // console.log(this.props)
        // console.log(this.state.src)
        // console.log(this.props.pic)
        return(
            // <Link to={link}>
                <div className="Post-image" >
                    <div className="Post-image-bg">
                        <img alt="post" src={this.state.src}/>
                    </div>
                </div>
            //</Link>
        );
    }
    
}

export default PostImage;