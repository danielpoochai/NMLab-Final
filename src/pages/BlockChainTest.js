import React from 'react';
//modify
import getWeb3 from "../utils/getWeb3";
import Posting from "../../build/contracts/Posting.json"
import User from "../../build/contracts/User.json"
const leven = require('leven');

const imghash = require('imghash');
const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI({
  host: 'localhost',
  port: '5001',
  protocol: 'http'
});

const deepai = require('deepai'); 
deepai.setApiKey('quickstart-QUdJIGlzIGNvbWluZy4uLi4K');

let saveImageToIPFS = (reader) => {
  return new Promise(function(resolve, reject) {
      const buffer = Buffer.from(reader.result);
      ipfs.add(buffer).then((response) => {
      console.log(response)
      resolve(response[0].hash);
   }).catch((err) => {
      console.error(err)
      reject(err);
   })
})
}

let getHash = (reader) => {
  return new Promise(function(resolve, reject) {
    const buffer = Buffer.from(reader.result);
    imghash.hash(buffer).then((response) => {
      console.log(response)
      resolve(response);
    }).catch((err) => {
      console.error(err)
      reject(err);
   })
})
}

class BlockChainTest extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSimilarity = this.handleSimilarity.bind(this);
    this.handleCreateAuthor = this.handleCreateAuthor.bind(this);
    this.state = {texting: 'Hello world', balance: 0, imageHash: "QmSZoS9n8Kj2dAPSdGmi1cHG7GgLAqsCZ5Eo134aRmTzEH"};
  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const PostingdeployedNetwork = Posting.networks[networkId];
      const UserdeployedNetwork = User.networks[networkId];
      const instance = new web3.eth.Contract(
        Posting.abi,
        PostingdeployedNetwork && PostingdeployedNetwork.address,
      );
      const instance1 = new web3.eth.Contract(
        User.abi,
        UserdeployedNetwork && UserdeployedNetwork.address,
      );
      this.setState({ web3, accounts, posting: instance, user: instance1 });
      this.setState({balance: await this.state.posting.methods.getBalance().call()});

      if (await this.state.posting.methods.getPostNum().call() === "0"){
        await this.state.posting.methods.createPost("I love Hannah #H&J#yo", "12319696969696969696969696969696969696", "").send({ from: this.state.accounts[0]});
      }
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data);
    await this.state.posting.methods.SetMessage(data.get('username')).send({ from: this.state.accounts[0]});
    console.log('after set');
    console.log(await this.state.posting.methods.SayHello().call());
    console.log('after sayHello');
  }


  handleRegister= async (event) =>{
   console.log(this.state.accounts[0]);
   this.setState({texting: await this.state.posting.methods.SayHello().call()});
  }

  handleAddUser = async(event) =>{
    await this.state.posting.methods.addUser(0).send({ from: this.state.accounts[0], value : this.state.web3.utils.toWei("1", "ether")});
    this.setState({balance: await this.state.posting.methods.getBalance().call()});
    console.log(await this.state.posting.methods.getUserbyAddr(this.state.accounts[0]).call());
  }

  
  handlePost = async (event) =>{

    var evvent = this.state.posting.events.CreatePost(function(error, result){
      if (!error) {
        //console.log(result.returnValues.success);
        if (result.returnValues.success === false){
          alert(
            `Picture duplication!`,
          );
        }
      }
    });
    await this.state.posting.methods.createPost("I love Hannah #H&J#yo", "12321962396969169690696969696969696969696").send({ from: this.state.accounts[0]});
    this.setState({balance: await this.state.posting.methods.getPostNum().call()});
  }

  handleDonate = async (event) =>{
    await this.state.posting.methods.donate().send({ from: this.state.accounts[0], value : this.state.web3.utils.toWei("1", "ether")});
    console.log(await this.state.posting.methods.getBalance.call());
    this.setState({balance: await this.state.posting.methods.getBalance().call()});
  }

  handleLike = async (event) =>{
    var evvvent = this.state.posting.events.PayForUser(function(error, result){
      if (!error) {
        //console.log(result.returnValues.donate);
        if (result.returnValues.donate === true){
          alert(
            `Free click`,
          );
        }
      }
    });
    await this.state.posting.methods.toggleLikes(0).send({ from: this.state.accounts[0]});
    this.setState({balance: await this.state.posting.methods.getBalance().call()});
  }

  handleSimilarity = async (event) =>{
    console.log("Cool");
    var resp = await deepai.callStandardApi("image-similarity", {
      image1: "https://f.ecimg.tw/items/DEAS7YA90096SAM/i010001_1530774133.png",
      image2: "https://f.ecimg.tw/items/DEAS7YA90096SAM/i010001_1530774133.png",
    });
    console.log(resp);
    this.setState({balance: resp.output.distance});
  }

  handleCreateAuthor = async (event) =>{
    
    // var arr1 = new Array();
    // var arr2 = new Array();
    var arr1 = []
    var arr2 = []

    await this.state.user.methods.createAuthor(this.state.accounts[0], "haha", "cool",arr1, arr2).send({ from: this.state.accounts[0]});
  }

  

  handleUpload = async (event) =>{
    console.log(this.state.accounts[0]);
    const filesAdded = await ipfs.add({
      path: 'hello.txt',
      content: Buffer.from('Hello World 101')
    })
    console.log('Added file:', filesAdded[0].path, filesAdded[0].hash)
    const fileBuffer = await ipfs.cat(filesAdded[0].hash)
    console.log('Added file contents:', fileBuffer.toString())
   }


  render() {
    return (
      <div>
        <h1>Please Send Data!</h1>
        <form onSubmit={this.handleSubmit}>
          
          <label htmlFor="Input String">Enter Arbitrary String:</label>
          <input id="username" name="username" type="text" />
          <input type="submit" value="Send!"/>
        </form>
        <h2>{this.state.texting}</h2>
        <button onClick={this.handleRegister}>Update!</button>
        <button onClick={this.handleDonate}>Donate 1 Ether!</button>
        <button onClick={this.handlePost}>CreatePost!</button>
        <button onClick={this.handleAddUser}>AddUser!</button>
        <button onClick={this.handleSimilarity}>testSimilarity!</button>
        <h2>{this.state.balance}</h2>
        <button onClick={this.handleLike}>CLickLike!</button>
        <button onClick={this.handleCreateAuthor}>CreateAuthor</button>


        <div style={{marginTop:10}}>上传图片到IPFS：</div>
        <div>
          <label id="file">选择图片</label>
          <input type="file" ref="file" id="file" name="file" multiple="multiple"/>
        </div>
        <button onClick={this.handleUpload}>Try</button>
        <button style={{marginTop:10}} onClick={() => {
        var file = this.refs.file.files[0];
        console.log(file);
        var reader = new FileReader();
        reader.readAsArrayBuffer(file)
        reader.onloadend = function(e) {
          console.log(reader);
          
          saveImageToIPFS(reader).then((hash) => {
            console.log(hash);
            this.setState({imageHash: hash})
          });
          getHash(reader).then((hash) => {
            console.log(hash)
            this.setState({texting:hash})
          });
            }.bind(this);
            Promise
            .all(["c547474747873f09", "4747474747873f09"])
            .then((results) => {
                const dist = leven(results[0], results[1]);
                console.log(`Distance between images is: ${dist}`);
                if (dist <= 12) {
                console.log('Images are similar');
                } else {
                console.log('Images are NOT similar');
                }
            });
            /*
            var urlreader = new FileReader();
            var request = new XMLHttpRequest();
            request.open('GET', "http://localhost:8080/ipfs/" + this.state.imageHash, true);
            request.responseType = 'blob';
            request.onload = function() {
                
                urlreader.readAsDataURL(request.response);
                urlreader.onload =  function(e){
                    console.log('DataURL:', e.target.result);
                    const buffer = Buffer.from(urlreader.result);
                    console.log(buffer);
                    saveImageToIPFS(urlreader).then((urlhash) => {
                      console.log(urlhash);
                      this.setState({imageHash: urlhash})
                    });
                };
            }.bind(this);
            request.send();
            console.log(urlreader)
            */
            
            
            
            
           }}>开始上传</button>
           <div>{"http://localhost:8080/ipfs/" + this.state.imageHash}</div>
           <img alt="" style={{height: 100 }} src={"http://localhost:8080/ipfs/" + this.state.imageHash}/>
           <div> "cool"</div>
      </div>
    );
  }
}

export default BlockChainTest;