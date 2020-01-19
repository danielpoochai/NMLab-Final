import React,{Component} from 'react';
import Post from './component/Post';
import './component/IG_style.css';
const Ebi = ["https://3.bp.blogspot.com/-Aep5iCmfvHc/WXlHL2rDogI/AAAAAAAI-rU/oJ-bkMFY7JclOUs2OL0T7676vLcv2wruACLcBGAs/s1600/AS002891_05.gif",
            "https://3.bp.blogspot.com/-ddmo0wAIwuo/W5CAHFw1F5I/AAAAAAAMA7c/kAtZFa_yycEHQ16KTwJRLVXleSkOV5ZNwCLcBGAs/s1600/AS0004383_00.gif",
            "https://3.bp.blogspot.com/-JRBKYyOlaeM/W5CAHJCdIwI/AAAAAAAMA7k/MGrTqVE9SI8dqjafLH1gKghPQWIZLfXKwCLcBGAs/s1600/AS0004383_01.gif",
            "https://2.bp.blogspot.com/-mJ3-qks_rgk/WDZuKY6HxEI/AAAAAAADyGc/IeVCeI_I2r4OU8vUP4OFcu27QBhObSgzQCLcB/s1600/AS000637_16.gif",
            "https://1.bp.blogspot.com/-Ta1L3V1vzjQ/WXlHS7qpe6I/AAAAAAAI-sU/NqTLRl3VH3c83pAXckPl9ONiv5ydQhQRQCLcBGAs/s1600/AS002891_23.gif",
            "https://3.bp.blogspot.com/-i3G4b7iaRl8/XBhV7DcUHRI/AAAAAAAMVrY/TJPCg5dD3UsL7K8GKODDAKjGHVHv_wQYQCLcBGAs/s1600/AS0004728_04.gif",
            "https://3.bp.blogspot.com/-k-3ObP8cGvQ/XBhV-McEsyI/AAAAAAAMVr8/bSBtPqRk-tEE-PrfYHUYhmAISaNUGvzwACLcBGAs/s1600/AS0004728_14.gif",
            "https://4.bp.blogspot.com/-im7jcMhEhVw/XBhV89YVd9I/AAAAAAAMVrw/Zf_ih9JxyKItp9jvk3vrjtL_zZ0CD4jUgCLcBGAs/s1600/AS0004728_11.gif",
            "https://3.bp.blogspot.com/-yuyLoekELWo/WyhgfMyvs9I/AAAAAAALcMk/IsASn6f7XY8PZv04vYBHbzzNu0s3P3hmwCLcBGAs/s1600/AS0004112_10.gif",
            "https://3.bp.blogspot.com/-JR4V5MkYzLc/WjHWNlPN-wI/AAAAAAAKeXU/5zv-QkFR3QQpn9RpCv6MW8_25fFdeq2twCLcBGAs/s1600/AS003417_15.gif",
            "https://2.bp.blogspot.com/-OjLpPqODXPE/WjHWN8kcp0I/AAAAAAAKeXY/pZEBCx4QGcQIHQSs0sIVoeXmtGP2S_SWACLcBGAs/s1600/AS003417_16.gif",
            "https://3.bp.blogspot.com/-1iAkMDjFLlI/WDfsIKE2bGI/AAAAAAAEOIo/R__lM5MrJmYNArbHSKzcTY_v9B9ZXzHxQCLcB/s1600/AS001004_18.gif",
            "https://2.bp.blogspot.com/-UiuuMFG-ggw/WDgFDVw3zmI/AAAAAAAD2W0/bj7FeTxDbmUF1frINlCTk3-xxc6FSFQlQCLcB/s1600/AS001242_19.gif",
            "https://stickershop.line-scdn.net/stickershop/v1/product/10926/LINEStorePC/main.png;compress=true",
            "https://stickershop.line-scdn.net/stickershop/v1/product/13637/LINEStorePC/main.png;compress=true",
            "https://stat.ameba.jp/user_images/20170917/10/visual-art-love2/13/f3/g/o0240022014029046331.gif?caw=800",
            "https://2.bp.blogspot.com/-YOpbpvmEUv4/WL4YN6Jz72I/AAAAAAAGSr8/KMkqNEu-aGQaDt3Qed-bjC1zWAJA3r8CACLcB/s1600/AS002390_04.gif",
            "https://1.bp.blogspot.com/-Ya1kkbJc8CU/W5B__CkOTlI/AAAAAAAMA5w/Ulk8dVwIgNYoytQFHHtTFOzLFZ2h-vXGgCLcBGAs/s1600/AS0004380_20.gif",
            "https://4.bp.blogspot.com/-wFhuGuD3HZQ/W5B_-Yj8tbI/AAAAAAAMA5k/GRKnwj24lr4aVwO4ZsCmRf0O6I740hNXgCLcBGAs/s1600/AS0004380_16.gif",
            "https://1.bp.blogspot.com/-3a8kW6amLok/W5B__KqnPkI/AAAAAAAMA5o/KMk9gmITHswtjIa8sPK2_5p4K_RoSPPOACLcBGAs/s1600/AS0004380_19.gif"
        ]

class HomePageIG extends Component{
    constructor(props) {
        super(props);
        this.state = {
            web3:this.props.web3,
            accounts:this.props.accounts,
            posting:this.props.posting,
            user:this.props.user,

            posts_index : [],
            posttsd : [],
            post_num : 0,
            posts: [],
            likes:[]
        };
    }

    UNSAFE_componentWillMount = async () => {
        var picArr = await this.state.posting.methods.getAllPost().call();
        var i;
        var posts_idx = []
        var posts_tmp = []
        var likes = []
        var authors = []
        for (i = 0;i<picArr.length; i++) {
            var post_tmp = await this.state.posting.methods.getPostByID(picArr[i]).call()
            var like = await this.state.posting.methods.getWhetherUserLike(picArr[i],this.state.accounts[0]).call()
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
            posts_idx.push(i)
        }

        this.setState({
            post_num : picArr.length,
            posts_id : picArr,
            posts_index: posts_idx,
            posts: posts_tmp,
            likes : likes,
            authors : authors,
        })
    };

    render(){
        //console.log(this.state.posts)
        return(
            <>
                <div className='homepage_ig'>
                    {this.state.posts_index.map(
                        (idx,post_id_element)=>{
                            if(this.state.posts.length){
                                return(
                                    <React.Fragment key={post_id_element}>
                                        <div className='between'></div>
                                        <Post 
                                            post_id={this.state.posts_id[post_id_element]}
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
                                            user={this.props.user} 
                                            accounts={this.props.accounts}
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

export default HomePageIG;
