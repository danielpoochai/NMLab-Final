import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import PicturePage from './pages/IG/PicturePage';
import PicturePageB from './pages/IG/PicturePageB';
import {Switch, Route, Redirect} from "react-router-dom";
import "./css/grid_style.css";
import MyNavbar from './components/MyNavbar';
import PrivatePage from './pages/PrivatePage'
import PublicPage from './pages/PublicPage'
import UploadPage from './pages/UploadPage';
import SettingPage from './pages/SettingPage';
import HelpPage from './pages/HelpPage';
import NewPostPage from './pages/NewPostPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePageIG from './pages/IG/HomePage_IG'
import HomePageBoughtPosts from './pages/IG/HomePage_BoughtPosts'
import getWeb3 from "./utils/getWeb3";
import Posting from "../build/contracts/Posting.json"
import User from "../build/contracts/User.json"
import PostingUse from "../build/contracts/PostingUse.json"


class App extends React.Component {
  constructor() {
    super();
    this.state={
      OK:0,
      web3:null
    }
  }
  UNSAFE_componentWillMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const PostingdeployedNetwork = Posting.networks[networkId];
      const UserdeployedNetwork = User.networks[networkId];
      const PostingUsedeployedNetwork = PostingUse.networks[networkId];
      const instance = new web3.eth.Contract(
          Posting.abi,
          PostingdeployedNetwork && PostingdeployedNetwork.address,
      );
      const instance1 = new web3.eth.Contract(
          User.abi,
          UserdeployedNetwork && UserdeployedNetwork.address,
      );
      const instance2 = new web3.eth.Contract(
        PostingUse.abi,
        PostingUsedeployedNetwork && PostingUsedeployedNetwork.address,
      );
      this.setState({ 
          web3, accounts, 
          posting: instance, 
          user: instance1,
          pu:instance2,
          OK:1
      });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render(){
    if(this.state.OK===1){
      return (
        <div className='bg'>
          <BrowserRouter>
            <div className='navbar_div'>
              <MyNavbar web3={this.state.web3} user={this.state.user} accounts={this.state.accounts}/>
            </div>
            <div className="App">
              <Switch>
                <Route exact path='/setting' render={(props) => <SettingPage {...props} web3={this.state.web3} posting={this.state.posting} user={this.state.user} accounts={this.state.accounts}/>} />
                <Route exact path='/help' render={(props) => <HelpPage {...props} web3={this.state.web3} posting={this.state.posting} user={this.state.user} accounts={this.state.accounts}/>} />
                <Route exact path='/home' render={(props) => <HomePageIG {...props} web3={this.state.web3} posting={this.state.posting} user={this.state.user} pu={this.state.pu} accounts={this.state.accounts}/>} />
                <Route exact path='/bought_posts' render={(props) => <HomePageBoughtPosts {...props} web3={this.state.web3} posting={this.state.posting} user={this.state.user} pu={this.state.pu} accounts={this.state.accounts}/>} />
                <Route exact path='/test' component={PicturePage} posting={this.state.posting} user={this.state.user} accounts={this.state.accounts}/>
                <Route path="/posts/:id?" render={(props) => <PicturePage {...props} web3={this.state.web3} posting={this.state.posting} user={this.state.user} accounts={this.state.accounts}/>} />
                <Route path="/bought_posts/:id?" render={(props) => <PicturePageB {...props} web3={this.state.web3} posting={this.state.pu} user={this.state.user} accounts={this.state.accounts}/>} />
                <Route exact path='/upload' render={(props) => <UploadPage {...props} web3={this.state.web3} posting={this.state.posting} user={this.state.user} accounts={this.state.accounts}/>} />

                <Route exact path='/profile' render={(props) => <PrivatePage {...props} web3={this.state.web3} posting={this.state.posting} user={this.state.user} pu={this.state.pu} accounts={this.state.accounts}/>} />
                <Route exact path='/public_profile/:addr?' render={(props) => <PublicPage {...props} web3={this.state.web3} posting={this.state.posting} user={this.state.user} accounts={this.state.accounts}/>} />
                <Route exact path='/new_post' render={(props) => <NewPostPage {...props} web3={this.state.web3} posting={this.state.posting} user={this.state.user} pu={this.state.pu} accounts={this.state.accounts}/>} />
                <Redirect from='/' to='/setting' />
              </Switch>
            </div>
          </BrowserRouter>
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

export default App;
