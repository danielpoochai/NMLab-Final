import React,{Component} from 'react';
import PostB from './component/Post_b';
import './component/IG_style.css'

class HomePageBoughtPosts extends Component{
    constructor(props) {
        super(props);
        this.state = {
            web3:this.props.web3,
            accounts:this.props.accounts,
            posting:this.props.pu,
            user:this.props.user,

            posts_id : [],
            post_num : 0,
            posts: [],
            likes:[],
            oriAuthors:[],
            oriIDs:[]
        };
    }

    UNSAFE_componentWillMount = async () => {
        var num = await this.state.posting.methods.getUsePostNum().call();
        var i;
        var posts_id = []
        var posts_tmp = []
        var likes = []
        var authors = []
        var oris = []
        var oriIDs=[]
        for (i = 0; i < num; i++) {
            var post_tmp = await this.state.posting.methods.getUsePostByID(i).call()
            var like = await this.state.posting.methods.getUseWhetherUserLike(i,this.state.accounts[0]).call()
            var author = await this.state.user.methods.getAuthorByAddr(post_tmp[0]).call()
            //console.log(post_tmp)
            var ori = await this.props.posting.methods.getPostByID(post_tmp[6]).call()
            //console.log(ori)
            var oriAuthor = await this.state.user.methods.getAuthorByAddr(ori[0]).call()
            //console.log(oriAuthor)
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
            oris.push(oriAuthor)
            oriIDs.push(ori[0])
        }

        this.setState({
            post_num : num,
            
            posts_id: posts_id,
            posts: posts_tmp,
            likes : likes,
            authors : authors,
            oriAuthors:oris,
            oriIDs:oriIDs
        })
    };

    render(){
        return(
            <>
                <div className='homepage_ig'>
                    {this.state.posts_id.map(
                        (idx,post_id_element)=>{
                            if(this.state.posts.length){
                                return(
                                    <React.Fragment key={post_id_element}>
                                        <div className='between'></div>
                                        <PostB
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
                                            pu={this.props.pu}
                                            user={this.props.user} 
                                            accounts={this.props.accounts}
                                            oriAuthor={this.state.oriAuthors[post_id_element][2]}
                                            oriAuthorID={this.state.oriIDs[post_id_element]}
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
                <div className='bgg'></div>
            </>
        );
    }
    
}

export default HomePageBoughtPosts;
