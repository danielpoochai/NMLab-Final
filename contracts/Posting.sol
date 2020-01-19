pragma solidity ^0.5.0;


contract Posting {
  struct Post {
    address payable authorID;
    string pic;
    string picHash;
    address[] users;
    address[] whoLike;
    string postInfo;
    string[] msgs;
    address[] msgOwnerID;
  }

  Post[] public posts;
  uint price = 1000000;

  /******************
    post Basic Part
  *******************/
  function createPost(string memory _postInfo, string memory _pic, string memory _picHash) public returns (uint) {
    for (uint i = 0;i<posts.length;i++){
      if (keccak256(bytes(posts[i].pic)) == keccak256(bytes(_pic))){
        emit CreatePost(false, 0);
        return 0;
      }
    }
    Post memory myPost;
    myPost.pic = _pic;
    myPost.picHash = _picHash;
    myPost.authorID = msg.sender;
    myPost.postInfo = _postInfo;
    uint id = posts.push(myPost);
    emit CreatePost(true, id);
    return id;
  }


  function deletePost(uint _postID) public validPostID(_postID) {
    posts[_postID].pic = "";
    posts[_postID].postInfo = "This post has been deleted";
  }

  function getPostByID(uint _postID) public view validPostID(_postID) returns(
    address, uint, string memory, uint, address[] memory, uint, string memory) {
    return (
      posts[_postID].authorID,
      posts[_postID].users.length,
      posts[_postID].postInfo,
      posts[_postID].whoLike.length,
      posts[_postID].whoLike,
      posts[_postID].msgs.length,
      posts[_postID].pic
    );
  }

  function getPicHashByID(uint _postID) public view validPostID(_postID) returns(string memory){
    return posts[_postID].picHash;
  }

  function getPostNum() public view returns(uint) {
    uint count;
    for (uint i = 0; i<posts.length; i++){
      if (bytes(posts[i].pic).length>0) count++;
    }
    return count;
  }

  function getAllPost() public view returns(uint[] memory){
    uint count = getPostNum();
    uint[] memory allPost = new uint[](count);
    uint index = 0;
    for (uint i = 0; i<posts.length; i++){
      if (bytes(posts[i].pic).length>0) {
        allPost[index] = i;
        index++;
      }
    }
    return allPost;
  }

  function getPostsByAddr(address _author) public view returns(uint[] memory){
    uint count = 0;
    for (uint i = 0;i<posts.length; i++){
      if (bytes(posts[i].pic).length>0 && posts[i].authorID == _author){
        count++;
      }
    }
    uint[] memory returnPosts = new uint[](count);
    uint index = 0;
    for (uint i = 0;i<posts.length; i++){
      if (bytes(posts[i].pic).length>0 && posts[i].authorID == _author){
        returnPosts[index] = i;
        index++;
      }
    }
    return returnPosts;
  }

  function getPostByHashtag(string memory _hashtag)public view returns(uint[] memory) {
    uint postLength = posts.length;
    bool[] memory logArr = new bool[](postLength);
    uint counter = 0;
    for (uint i = 0;i<postLength;i++){
      if (checkHashtag(i, _hashtag)){
        counter++;
        logArr[i] = true;
      }
      else{
        logArr[i] = false;
      }
    }

    uint here = 0;
    uint[] memory candidate = new uint[](counter);
    for (uint i = 0;i<postLength;i++){
      if (logArr[i] == true){
        candidate[here] = i;
        here++;
      }
    }
    return candidate;
  }


  /******************
     Post Msg Part
  *******************/
  function getMsgNum(uint _postID) public view validPostID(_postID) returns(uint){
    return posts[_postID].msgs.length;
  }

  function getSingleMsg(uint _postID, uint _msgID) public view validMsgID(_postID, _msgID) returns(string memory, address){
    require((_postID<posts.length), "postID out of bound");
    require((_msgID<posts[_postID].msgs.length), "msgID out of bound");
    return (posts[_postID].msgs[_msgID], posts[_postID].msgOwnerID[_msgID]);
  }

  function updateMsg(uint _postID, uint _msgID, string memory _msg) public validMsgID(_postID, _msgID) {
    posts[_postID].msgs[_msgID] = _msg;
  }

  function addMessage(uint _postID, string memory _msg) public validPostID(_postID) {
    posts[_postID].msgs.push(_msg);
    posts[_postID].msgOwnerID.push(msg.sender);
  }

  /******************
     Post Like Part
  *******************/
  function getLikeNumByID(uint _postID) public view validPostID(_postID) returns(uint) {
    return posts[_postID].whoLike.length;
  }

  function toggleLikes(uint _postID) public validPostID(_postID) refundGasCost returns(uint){
    for (uint i = 0; i < posts[_postID].whoLike.length;i++){
      if (posts[_postID].whoLike[i] == msg.sender) {
        posts[_postID].whoLike[i] = posts[_postID].whoLike[posts[_postID].whoLike.length-1];
        posts[_postID].whoLike.length--;
        return posts[_postID].whoLike.length;
      }
    }
    posts[_postID].whoLike.push(msg.sender);
    return posts[_postID].whoLike.length;
  }

  function getWhetherUserLike(uint _postID, address author) public view validPostID(_postID) returns(bool){
    for (uint i = 0; i < posts[_postID].whoLike.length;i++){
      if (posts[_postID].whoLike[i] == author) {
        return true;
      }
    }
    return false;
  }

  /******************
     Post User Part
  *******************/
  function addUser(uint _postID) public payable validPostID(_postID) returns(uint){
    require(msg.value>price, "Not enough msg value");
    uint transferMoney = msg.value - price;
    posts[_postID].authorID.transfer(transferMoney);
    posts[_postID].users.push(msg.sender);
  }

  function getPostUserNum(uint _postID) public view validPostID(_postID) returns(uint) {
    return posts[_postID].users.length;
  }

  function getUserbyAddr(address author) public view returns(uint[] memory) {
    uint count = 0;
    for (uint i = 0;i<posts.length; i++){
      if (bytes(posts[i].pic).length>0){
        for(uint j = 0;j<posts[i].users.length;j++){
          if(posts[i].users[j] == author){
            count++;
            break;
          }
        }
      }
    }
    uint[] memory returnPosts = new uint[](count);
    uint index = 0;
    for (uint i = 0;i<posts.length; i++){
      if (bytes(posts[i].pic).length>0){
        for(uint j = 0;j<posts[i].users.length;j++){
          if(posts[i].users[j] == author){
            returnPosts[index] = i;
            index++;
            break;
          }
        }
      }
    }
    return returnPosts;
  }

  /******************
    Post Event Part
   ******************/

  event CreatePost(
    bool success,
    uint id
  );

  event PayForUser(
    bool donate
  );

  /******************
   Post Utility Part
  *******************/


  function getHashTag(string memory input) public pure returns(string memory){
    bytes memory inputStr = bytes(input);
    string memory haha = "";
    for (uint i = 0;i<inputStr.length;i++) {
      if (inputStr[i] == "#"){
        i++;
        uint start = i;
        while (inputStr[i]!="#" && inputStr[i]!=" "){
          i++;
          if (i == inputStr.length-1) {
            i++;
            break;
          }
        }
        uint length = i-start;
        bytes memory tag = new bytes(length);
        for (uint j = 0; j<length; j++){
          tag[j] = inputStr[start + j];
        }
        i--;
        haha = strConcat(haha, "#");
        haha = strConcat(haha, string(tag));
      }
    }
    return haha;
  }

  function checkHashtag(uint _postID, string memory _hashtag) public view returns(bool){
    require((_postID<posts.length), "postID out of bound");
    if (bytes(posts[_postID].pic).length<1) return false;
    bytes memory inputStr = bytes(posts[_postID].postInfo);
    for (uint i = 0;i<inputStr.length;i++) {
      if (inputStr[i] == "#"){
        i++;
        uint start = i;
        while (inputStr[i]!="#" && inputStr[i]!=" "){
          i++;
          if (i == inputStr.length-1) {
            i++;
            break;
          }
        }
        uint length = i-start;
        bytes memory tag = new bytes(length);
        for (uint j = 0; j<length; j++){
          tag[j] = inputStr[start + j];
        }
        i--;
        if (keccak256(abi.encodePacked((_hashtag))) == keccak256(abi.encodePacked((string(tag))))){
          return true;
        }
      }
    }
    return false;
  }


  modifier validPostID(uint _postID){
    require((_postID<posts.length), "postID out of bound");
    _;
  }

  modifier validMsgID(uint _postID, uint _msgID){
    require((_postID<posts.length), "postID out of bound");
    require((_msgID<posts[_postID].msgs.length), "msgID out of bound");
    _;
  }

/*
  modifier onlyPostAuthor(uint _author, uint _postID){
    require(posts[_postID].authorID==_author, "Not the author");
    _;
  }
*/

  function strConcat(string memory _a, string memory _b) internal pure returns (string memory){
    bytes memory _ba = bytes(_a);
    bytes memory _bb = bytes(_b);
    string memory _c = new string(_ba.length + _bb.length);
    bytes memory _bc = bytes(_c);
    uint k = 0;
    for (uint i = 0; i < _ba.length; i++) _bc[k++] = _ba[i];
    for (uint i = 0; i < _bb.length; i++) _bc[k++] = _bb[i];
    return string(_bc);
  }

  function getBalance() public view returns(uint){
    return address(this).balance;
  }

  function donate() public payable{
  }

  modifier refundGasCost()
  {
    uint remainingGasStart = gasleft();
    _;
    uint remainingGasEnd = gasleft();
    uint usedGas = remainingGasStart - remainingGasEnd;
    // Add intrinsic gas and transfer gas. Need to account for gas stipend as well.
    usedGas += 21000 + 9700;
    // Possibly need to check max gasprice and usedGas here to limit possibility for abuse.
    uint gasCost = usedGas * tx.gasprice;
    // Refund gas cost
    if (address(this).balance > gasCost){
      emit PayForUser(true);
      msg.sender.transfer(gasCost);
    }
    else{
      emit PayForUser(false);
    }
  }

  /******************
      Simple Test
  *******************/

  string message;
  constructor() public {
    message = "NMLAB";
  }

  function SayHello() public view returns (string memory) {
    return message;
  }

  // A Setter function
  function SetMessage(string memory newMessage) public {
    message = newMessage;
  }

  function returnmsgSender() public view returns(address){
    return msg.sender;
  }
}
