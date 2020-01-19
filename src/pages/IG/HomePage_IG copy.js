import React,{Component} from 'react';
import Post from './component/Post';
import './component/IG_style.css'

class HomePageIG extends Component{
    constructor(props) {
        super(props);
        this.state = {
            web3:this.props.web3,
            accounts:this.props.accounts,
            posting:this.props.posting,
            user:this.props.user,

            posts_id : [],
            post_num : 0,
            posts: [],
            likes:[]
        };
    }

    UNSAFE_componentWillMount = async () => {
        var num = await this.state.posting.methods.getPostNum().call();
        var i;
        var posts_id = []
        var posts_tmp = []
        var likes = []
        var authors = []
        var b = []
        for (i = 0; i < num; i++) {
            var post_tmp = await this.state.posting.methods.getPostByID(i).call()
            var like = await this.state.posting.methods.getWhetherUserLike(i,this.state.accounts[0]).call()
            var author = await this.state.user.methods.getAuthorByAddr(post_tmp[0]).call()
            
            //post_tmp.push(like)
            // var authorID = post_tmp[0]
            // var userNum = post_tmp[1]
            // postInfo,
            // whoLike.length,
            // whoLike,
            // msgs.length
            //console.log(post_tmp)
            posts_tmp.push(post_tmp)
            likes.push(like)
            authors.push(author)
            posts_id.push(i)
            b.push(0)
        }
        //-------post buy-----
        var num_b = await this.state.posting.methods.getPostNum().call();
        var i_b;
        var posts_id_b = []
        var posts_tmp_b = []
        var likes_b = []
        var authors_b = []
        for (i_b = 0; i_b < num_b; i_b++) {
            var post_tmp_b = await this.props.pu.methods.getUsePostByID(i_b).call()
            var like_b = await this.props.pu.methods.getUseWhetherUserLike(i_b,this.state.accounts[0]).call()
            var author_b = await this.state.user.methods.getAuthorByAddr(post_tmp_b[0]).call()
            posts_tmp.push(post_tmp_b)
            likes.push(like_b)
            authors.push(author_b)
            posts_id.push(i_b)
            b.push(1)
        }
        

        this.setState({
            post_num : num,
            
            posts_id: posts_id,
            posts: posts_tmp,
            likes : likes,
            authors : authors,
            buy : b

            // posts_id_b: posts_id_b,
            // posts_b: posts_tmp_b,
            // likes_b : likes_b,
            // authors_b : authors_b
        })
    };

    render(){
        console.log(this.state)
        return(
            <>
                <div className='homepage_ig'>
                    {this.state.posts_id.map(
                        (idx,post_id_element)=>{
                            console.log(idx,post_id_element)
                            if(this.state.posts.length&&this.state.buy[post_id_element]===0){
                                return(
                                    <React.Fragment key={post_id_element}>
                                        <div className='between'></div>
                                        <Post 
                                            post_id={post_id_element}
                                            authorID = {this.state.posts[post_id_element][0]}
                                            author = {this.state.authors[post_id_element][2]}
                                            author_pic = {this.state.authors[post_id_element][1]}
                                            userNum = {this.state.posts[post_id_element][1]}
                                            postInfo = {this.state.posts[post_id_element][2]}
                                            like = {this.state.likes[post_id_element]}
                                            likeNum = {this.state.posts[post_id_element][3]}
                                            msgNum = {this.state.posts[post_id_element][5]} 
                                            pic = {this.state.posts[post_id_element][6]}
                                            web3 = {this.props.web3}
                                            posting={this.props.posting}
                                            pu={this.props.pu}
                                            user={this.props.user} 
                                            accounts={this.props.accounts}
                                            b={this.state.buy[post_id_element]}
                                        />
                                        <div className='between'></div>
                                    </React.Fragment>
                                )
                            }
                            else if(this.state.posts.length&&this.state.buy[post_id_element]===1){
                                return(
                                    <React.Fragment key={post_id_element}>
                                        <div className='between'></div>
                                        <Post 
                                            post_id={post_id_element}
                                            authorID = {this.state.posts[post_id_element][0]}
                                            author = {this.state.authors[post_id_element][2]}
                                            author_pic = {this.state.authors[post_id_element][1]}
                                            //userNum = {this.state.posts[post_id_element][1]}
                                            postInfo = {this.state.posts[post_id_element][1]}
                                            like = {this.state.likes[post_id_element]}
                                            likeNum = {this.state.posts[post_id_element][2]}
                                            msgNum = {this.state.posts[post_id_element][4]} 
                                            pic = {this.state.posts[post_id_element][5]}
                                            web3 = {this.props.web3}
                                            posting={this.props.posting}
                                            pu={this.props.pu}
                                            user={this.props.user} 
                                            accounts={this.props.accounts}
                                            b={this.state.buy[post_id_element]}
                                        />
                                        <div className='between'></div>
                                    </React.Fragment>
                                )                               
                            }
                            else{
                                return(
                                    <h1 className='upload_title'>
                                        No post yet.
                                    </h1>
                                )
                            }
                        }
                    )}
                </div>
                {/* <div className='homepage_ig'>
                    {console.log(this.state.posts_id)}
                    {this.state.posts_id_b.map(
                        (post_id_element_b)=>{
                            
                            // if(this.state.posts_b.length){
                            //     return(
                            //         <React.Fragment key={post_id_element_b}>
                            //             <div className='between'></div>
                            //             <Post 
                            //                 post_id={post_id_element_b}
                            //                 authorID = {this.state.posts_b[post_id_element_b][0]}
                            //                 author = {this.state.authors_b[post_id_element_b][2]}
                            //                 author_pic = {this.state.authors_b[post_id_element_b][1]}
                            //                 userNum = {this.state.posts_b[post_id_element_b][1]}
                            //                 postInfo = {this.state.posts_b[post_id_element_b][2]}
                            //                 like = {this.state.likes_b[post_id_element_b]}
                            //                 likeNum = {this.state.posts_b[post_id_element_b][3]}
                            //                 msgNum = {this.state.posts_b[post_id_element_b][5]} 
                            //                 pic = {this.state.posts_b[post_id_element_b][6]}
                            //                 web3 = {this.props.web3}
                            //                 posting={this.props.posting} 
                                            
                            //                 user={this.props.user} 
                            //                 accounts={this.props.accounts}
                            //             />
                            //             <div className='between'></div>
                            //         </React.Fragment>
                            //     )
                            // }

                        }
                    )}
                </div> */}
            </>
        );
    }
    
}

export default HomePageIG;
