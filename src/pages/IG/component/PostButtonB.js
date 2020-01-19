import React,{Component} from 'react';
import './IG_style.css';

class PostButtonB extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            web3:this.props.web3,
            accounts:this.props.accounts,
            posting:this.props.posting,
            user:this.props.user,
            post_id:this.props.postID,
            like_num:this.props.likeNum,//0,
            like:this.props.like,//false,
            src:'https://image.flaticon.com/icons/svg/149/149217.svg',
            message_num:this.props.msgNum,//0,
            bought_num:this.props.userNum,//0,
            modal:false,
        };
        this.src=[
            'https://image.flaticon.com/icons/svg/149/149217.svg',
            'https://image.flaticon.com/icons/svg/148/148836.svg'
        ];
        this.click_like=this.click_like.bind(this);
        this.toggle = this.toggle.bind(this);
        
       
    }
    UNSAFE_componentWillMount = async () => {
        var like = await this.state.posting.methods.getUseWhetherUserLike(this.state.post_id,this.state.accounts[0]).call()
        //console.log(this.state.accounts, this.state.post_id,like)
        if(like){
            this.setState({
                src:this.src[1],
                like:like
            })
        }
        else{
            this.setState({like:like})
        }

      };

    async click_like (){
        const like_status=!this.state.like;
        var src_status=this.src[0];
        var like_num_status=this.state.like_num-1;
        if(like_status){
            src_status=this.src[1];
            like_num_status +=2;
        }
        this.setState({
            like:like_status,
            like_num:like_num_status,
            src:src_status
        })
        const postid = this.state.post_id;
        await this.state.posting.methods.toggleUseLikes(postid).send({ from: this.state.accounts[0]});
        //console.log(await this.state.posting.methods.getLikeNumByID(0).call())
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
        //console.log('toggle')
    }
    render(){
        return(
            <>
                <div className='post_buttons'>
                    <img className='like_button' onClick={this.click_like} src={this.state.src} alt='like_button'/>
                    <span className='like_num'>{this.state.like_num}</span>
                    <img className='message_button' src='https://image.flaticon.com/icons/svg/1380/1380338.svg'alt='message_button'/>
                    <span className='like_num'>{this.props.msgNum}</span>
                    {/* <img onClick={this.toggle} className='purchase_button' src='https://image.flaticon.com/icons/svg/1170/1170678.svg' alt='purchase'/>
                    <span className='like_num'>{this.state.bought_num}</span> */}
                </div>
            </>
        );
    }
    
}

export default PostButtonB;