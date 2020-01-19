import React from "react";
import { render } from "react-dom";
import Posting from "../../build/contracts/Posting.json";
import getWeb3 from "../utils/getWeb3";

const deepai = require('deepai'); 
deepai.setApiKey('quickstart-QUdJIGlzIGNvbWluZy4uLi4K');


const leven = require('leven');



class AdminPage extends React.Component {

    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCompare = this.handleCompare.bind(this);
        this.handelDelete = this.handelDelete.bind(this);
        this.handleDeleteAll = this.handleDeleteAll.bind(this);
        this.handleDonate = this.handleDonate.bind(this);
    }

    componentWillMount() {
        this.setState({
            allPic: [], picIndex: [], picID1: 'Unknown', picID2: 'Unknown', sim: 'Unknown', ID1hash: '', ID2hash: '', deep: "Unknown", similarPair: [], delete: []
        });
    }

    handleDeleteAll = async() => {
      for (var i=0;i<this.state.delete.length;i++){
        await this.state.posting.methods.deletePost(this.state.delete[i]).send({ from: this.state.accounts[0]});
      }
    }

    handleDonate = async (event) =>{
      await this.state.posting.methods.donate().send({ from: this.state.accounts[0], value : this.state.web3.utils.toWei("1", "ether")});
    }

    

    handleCompare = async() => {
        if (this.state.ID1hash!=="" && this.state.ID2hash!==""){
          Promise
          .all([this.state.ID1hash, this.state.ID2hash])
          .then((results) => {
              const dist = leven(results[0], results[1]);
              this.setState({sim: dist})
          });
        }
        else{
          this.setState({sim: -1})
        }
       
        
        var resp = await deepai.callStandardApi("image-similarity", {
            image1: this.state.ID1url,
            image2: this.state.ID2url,
        });
        this.setState({deep: resp.output.distance});
    }

    hashCompare = async(hash1,hash2, id1, id2) => {
      var cool = false;
      // console.log(id1);
      // console.log(id2);
      // console.log(hash1);
      // console.log(hash2);
      if (hash1!=="" && hash2!==""){
        console.log(hash1);
        Promise
        .all([hash1, hash2])
        .then((results) => {
            var dist = leven(results[0], results[1]);
            // console.log(dist);
            if (dist<12){
              cool = true;
              var joined = this.state.similarPair.concat([[id1, id2, dist]]);
              this.setState({similarPair: joined});
              if (dist<5){
                console.log("here");
                var joind = this.state.delete.concat(id2);
                this.setState({delete:joind, finish: true});
              }
            }
        });
      }
    }

    handelDelete = async(event) =>{
      event.preventDefault();
      const datas = new FormData(event.target);
      //console.log(datas.get('id'));
      await this.state.posting.methods.deletePost(datas.get('id')).send({ from: this.state.accounts[0]});
    }


    handleSubmit = async(event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        var ID1 = parseInt(data.get('id1'), 10);
        var ID2 = parseInt(data.get('id2'), 10);
        if (isNaN(ID1) || isNaN(ID2)) {
            alert(
                `Invalid Input!`,
              );
            return
        }
        var ID1est = false;
        var ID2est = false;
        var ID1Hash;
        var ID2Hash;
        var ID1pic;
        var ID2pic;
        for (var i=0;i<this.state.picIndex.length;i++){
            if (data.get('id1') === this.state.picIndex[i]){
                ID1est = true;
                ID1pic = this.state.allPic[i].pic;
                ID1Hash = await this.state.posting.methods.getPicHashByID(this.state.picIndex[i]).call();
            }
            if (data.get('id2') === this.state.picIndex[i]){
                ID2est = true;
                ID2pic = this.state.allPic[i].pic;
                ID2Hash = await this.state.posting.methods.getPicHashByID(this.state.picIndex[i]).call();
            }
        }
        if (ID1est===false || ID2est===false){
            alert(
                `No such ID!`,
              );
            return
        }
        this.setState({picID1: ID1, picID2: ID2, ID1hash: ID1Hash, ID2hash: ID2Hash, ID1url: ID1pic, ID2url: ID2pic})
        await this.handleCompare();
      }
      

    componentDidMount = async () => {
        try {
          const web3 = await getWeb3();
          const accounts = await web3.eth.getAccounts();
          const networkId = await web3.eth.net.getId();
          const PostingdeployedNetwork = Posting.networks[networkId];
          const instance = new web3.eth.Contract(
            Posting.abi,
            PostingdeployedNetwork && PostingdeployedNetwork.address,
          );
          console.log(PostingdeployedNetwork.address)
          this.setState({ web3, accounts, posting: instance });
          this.setState({balance: await this.state.posting.methods.getBalance().call()});
          
          const picArr = await this.state.posting.methods.getAllPost().call();
          var arr = [];
          var hasharr = [];
          for (var i = 0;i<picArr.length; i++){
              var postTmp = await this.state.posting.methods.getPostByID(picArr[i]).call();
              arr.push({id : picArr[i], pic : postTmp[6]});
              hasharr.push(await this.state.posting.methods.getPicHashByID(picArr[i]).call());
          }
          this.setState({allPic: arr, picIndex: picArr, hashArr: hasharr});
          for(var i=0;i<picArr.length; i++){
            this.setState({finish:false})
            for(var j=0;j<i;j++){
              await this.hashCompare(this.state.hashArr[j], this.state.hashArr[i], picArr[j], picArr[i]);
              if (this.state.finish){
                break;
              }
            }
          }

        } catch (error) {
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
      };

    render() {
        return (
          <div height="100%" border="0">
            <h1>AdminPage</h1>
            <h2> ============</h2>
            <form onSubmit = {this.handelDelete}>
              <label htmlFor="Input String">{"Delete picture:"}</label>
              <input id="Delete ID" placeholder="ID" name="id" type="text" />
              <input type="submit" value="Send!"/>
            </form>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="Input String">{"Compare two ID's picture:"}</label>
                <input id="useid1rname" placeholder="ID1" name="id1" type="text" />
                <input id="id2" placeholder="ID2" name="id2" type="text" />
                <input type="submit" value="Send!"/>
            </form>
            <h5>{"ID1: " + this.state.picID1}</h5>
            <h5>{"ID2: " + this.state.picID2}</h5>
            <h5>{"Imghash Similarity: " + this.state.sim}</h5>
            <h5>{"DeepAI result:" + this.state.deep}</h5>
            <div>
                <img style={{height: 200 }} src={this.state.ID1url}/>
                <img style={{height: 200 }} src={this.state.ID2url}/>
            </div>
            <h2> =============</h2>
            <h3>{"Posts that should be deleted:" + this.state.delete}</h3>
            <button onClick={this.handleDeleteAll}>Delete above all!</button>
            <h2> =============</h2>
            <h2> Highly similar pair!</h2>
            <div>{"ID1         ID2         SIM"}</div>
            {this.state.similarPair.map(item => {
              return (<div key={item[1]}>{item[0] + " --- " +item[1] + " --- " + item[2]}</div>)
            })

            }
            <h2> =============</h2>
            <h2> All posts!</h2>
            {this.state.allPic.map(item => {
              return (
              <div key={item.id}> 
                <img alt="" align="left" title={item.id} style={{height: 200 }} src={item.pic}/>
              </div>
              )
            })}
            <button onClick={this.handleDonate}>Donate!</button>
          </div>
        );
    }
}

export default AdminPage;