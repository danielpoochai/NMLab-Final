pragma solidity ^0.5.0;


contract PostingUse {

  struct UsePost {
    address payable authorID;
    string pic;
    uint userNum;
    uint origPicID;
    address[] whoLike;
    string postInfo;
    string[] msgs;
    address[] msgOwnerID;
  }

  UsePost[] public usePosts;
  uint price = 10000000000000000;

  /*****************************
         usePost Basic Part
  *******************************/
  function createUsePost(string memory _postInfo, string memory _pic, uint _origPicID) public returns (uint) {
    UsePost memory myPost;
    myPost.pic = _pic;
    myPost.authorID = msg.sender;
    myPost.postInfo = _postInfo;
    myPost.origPicID = _origPicID;
    uint id = usePosts.push(myPost);
    return id;
  }

  function getUsePostByID(uint _postID) public view validUsePostID(_postID) returns(
    address, string memory, uint, address[] memory, uint, string memory, uint) {
    return (
      usePosts[_postID].authorID,
      usePosts[_postID].postInfo,
      usePosts[_postID].whoLike.length,
      usePosts[_postID].whoLike,
      usePosts[_postID].msgs.length,
      usePosts[_postID].pic,
      usePosts[_postID].origPicID
    );
  }

  function getUsePostNum() public view returns(uint) {
    uint count;
    for (uint i = 0; i<usePosts.length; i++){
      if (bytes(usePosts[i].pic).length>0) count++;
    }
    return count;
  }

  function getAllUsePost() public view returns(uint[] memory){
    uint count = getUsePostNum();
    uint[] memory allPost = new uint[](count);
    uint index = 0;
    for (uint i = 0; i<usePosts.length; i++){
      if (bytes(usePosts[i].pic).length>0) {
        allPost[index] = i;
        index++;
      }
    }
    return allPost;
  }

  function getUsePostsByAddr(address _author) public view returns(uint[] memory){
    uint count = 0;
    for (uint i = 0;i<usePosts.length; i++){
      if (bytes(usePosts[i].pic).length>0 && usePosts[i].authorID == _author){
        count++;
      }
    }
    uint[] memory returnPosts = new uint[](count);
    uint index = 0;
    for (uint i = 0;i<usePosts.length; i++){
      if (bytes(usePosts[i].pic).length>0 && usePosts[i].authorID == _author){
        returnPosts[index] = i;
        index++;
      }
    }
    return returnPosts;
  }


  function getUsePostByHashtag(string memory _hashtag)public view returns(uint[] memory) {
    uint postLength = usePosts.length;
    bool[] memory logArr = new bool[](postLength);
    uint counter = 0;
    for (uint i = 0;i<postLength;i++){
      if (checkUseHashtag(i, _hashtag)){
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

  function getUseMsgNum(uint _postID) public view validUsePostID(_postID) returns(uint){
    return usePosts[_postID].msgs.length;
  }


  function getUseSingleMsg(uint _postID, uint _msgID) public view validUseMsgID(_postID, _msgID) returns(string memory, address){
    require((_postID<usePosts.length), "postID out of bound");
    require((_msgID<usePosts[_postID].msgs.length), "msgID out of bound");
    return (usePosts[_postID].msgs[_msgID], usePosts[_postID].msgOwnerID[_msgID]);
  }

  function updateUseMsg(uint _postID, uint _msgID, string memory _msg) public validUseMsgID(_postID, _msgID) {
    usePosts[_postID].msgs[_msgID] = _msg;
  }

  function addUseMessage(uint _postID, string memory _msg) public validUsePostID(_postID) {
    usePosts[_postID].msgs.push(_msg);
    usePosts[_postID].msgOwnerID.push(msg.sender);
  }

  /******************
     Post Like Part
  *******************/
  function getUseLikeNumByID(uint _postID) public view validUsePostID(_postID) returns(uint) {
    return usePosts[_postID].whoLike.length;
  }

  function toggleUseLikes(uint _postID) public validUsePostID(_postID) refundGasCost returns(uint){
    for (uint i = 0; i < usePosts[_postID].whoLike.length;i++){
      if (usePosts[_postID].whoLike[i] == msg.sender) {
        usePosts[_postID].whoLike[i] = usePosts[_postID].whoLike[usePosts[_postID].whoLike.length-1];
        usePosts[_postID].whoLike.length--;
        return usePosts[_postID].whoLike.length;
      }
    }
    usePosts[_postID].whoLike.push(msg.sender);
    return usePosts[_postID].whoLike.length;
  }

  function getUseWhetherUserLike(uint _postID, address author) public view validUsePostID(_postID) returns(bool){
    for (uint i = 0; i < usePosts[_postID].whoLike.length;i++){
      if (usePosts[_postID].whoLike[i] == author) {
        return true;
      }
    }
    return false;
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

  function checkUseHashtag(uint _postID, string memory _hashtag) public view returns(bool){
    require((_postID<usePosts.length), "postID out of bound");
    if (bytes(usePosts[_postID].pic).length<1) return false;
    bytes memory inputStr = bytes(usePosts[_postID].postInfo);
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

  modifier validUsePostID(uint _postID){
    require((_postID<usePosts.length), "postID out of bound");
    require((bytes(usePosts[_postID].pic).length>0), "access deleted post");
    _;
  }

  modifier validUseMsgID(uint _postID, uint _msgID){
    require((_postID<usePosts.length), "postID out of bound");
    require((_msgID<usePosts[_postID].msgs.length), "msgID out of bound");
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
}
