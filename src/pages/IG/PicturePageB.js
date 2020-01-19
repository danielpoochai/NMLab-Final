import React, { Component } from 'react';
import PostHead from './component/PostHead';
import PostImage from './component/PostImage';
import PostButtonB from './component/PostButtonB';
import PostContent from './component/PostContent';
import PostCommentsB from './component/PostCommentsB';
import './component/IG_style.css';

class PicturePageB extends Component{
    constructor(props) {
        super(props);
        this.state = {
            web3:this.props.web3,
            accounts:this.props.accounts,
            posting:this.props.posting,
            user:this.props.user,
            // postID:post_id,
            // authorAddr : post[0],
            // author : "author_",
            // userNum : post[1],
            // postInfo : post[2],
            // like:like,
            // likeNum:post[3],
            // msgNum:post[5],
            // pic:post[6]
        }
        this.com = this.com.bind(this)
    }
    UNSAFE_componentWillMount = async () =>  {
        // try {
        //     const web3 = this.props.web3//await getWeb3();
        //     const accounts = await web3.eth.getAccounts();
        //     const networkId = await web3.eth.net.getId();
        //     const PostingdeployedNetwork = Posting.networks[networkId];
        //     const UserdeployedNetwork = User.networks[networkId];
        //     const instance = new web3.eth.Contract(
        //         Posting.abi,
        //         PostingdeployedNetwork && PostingdeployedNetwork.address,
        //     );
        //     const instance1 = new web3.eth.Contract(
        //         User.abi,
        //         UserdeployedNetwork && UserdeployedNetwork.address,
        //     );
        //     this.setState({ web3, accounts, posting: instance, user: instance1 });

        // } catch (error) {
        //     alert(
        //         `Failed to load web3, accounts, or contract. Check console for details.`,
        //     );
        //     console.error(error);
        // }
        var post_id = this.props.match.params.id
        var post = await this.state.posting.methods.getUsePostByID(post_id).call()
        var author = await this.state.user.methods.getAuthorByAddr(post[0]).call()
        var author_name = author[2]
        var author_pic = author[1]
        var like = await this.state.posting.methods.getUseWhetherUserLike(post_id,this.state.accounts[0]).call()
        this.setState({
            postID:post_id,//parseInt(post_id,10),
            authorAddr : post[0],
            author_name : author_name,
            author_pic : author_pic,
            //userNum : post[1],
            postInfo : post[1],
            like:like,
            likeNum:post[2],
            msgNum:post[4],
            pic:post[5]
        })
    }
    com(){
        
        var num = parseInt(this.state.msgNum,10)
        this.setState({
            msgNum:num+1
        })
    }
    render(){
        if(this.state.pic){
            return(
                <div className='picture_page'>
                    <div className='between'></div>
                        <article className="picture_Post" >
                            <PostHead authorAddr = {this.state.authorAddr} author ={this.state.author_name} web3={this.props.web3} pic={this.state.author_pic} />
                            <PostImage pic = {this.state.pic} />
                            <PostButtonB
                                like = {this.state.like} 
                                likeNum = {this.state.likeNum} 
                                msgNum = {this.state.msgNum} 
                                userNum = {this.state.userNum} 
                                photo = {this.state.pic}
                                postID = {this.state.postID} 
                                web3={this.props.web3}
                                posting={this.state.posting} 
                                user={this.state.user} 
                                accounts={this.state.accounts}/>
                            <PostContent content = {this.state.postInfo}/>
                            <PostCommentsB
                                msgNum = {this.state.msgNum} 
                                postID = {this.state.postID} 
                                pic={this.state.author_pic}
                                web3={this.props.web3}
                                posting={this.props.posting} 
                                user={this.props.user} 
                                accounts={this.props.accounts}
                                com={this.com}/>
                        </article>
                    <div className='between'></div>
                </div>
            );
        }
        else{
            return(
                <div></div>
            )
        }
    }
}

export default PicturePageB;