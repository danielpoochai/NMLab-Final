pragma solidity >=0.4.25 <0.6.0;
import "../contracts/PostingUse.sol";
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

contract TestPostingUse{
    function testImitialPost() public{
        uint expected = 0;
        PostingUse posting = PostingUse(DeployedAddresses.PostingUse());
        uint num = posting.getUsePostNum();
        Assert.equal(expected, num, "There should be 0 post initially");
    }

    function testgetHashTagg() public{
        PostingUse posting = PostingUse(DeployedAddresses.PostingUse());
        string memory parse = "asdfo;eo; dde#J&H";
        string memory output = posting.getHashTag(parse);
        Assert.equal("#J&H", output, "cool");
    }

    function testCreatePost() public{
        PostingUse posting = PostingUse(DeployedAddresses.PostingUse());
        string memory postInfo = "I love Hannah #H&J";
        string memory pic = "123456";
        uint num = posting.createUsePost(postInfo, pic, 1);
        Assert.equal(1, posting.getUsePostNum(), "There should be 1 post after create post");
        Assert.equal(1, num, "There should be 1 post after create post");
    }

    function testGetPost() public{
        PostingUse posting = PostingUse(DeployedAddresses.PostingUse());
        //return  authorID, users, postInfo, likeNum, whoLike, msgNum
        address authorID;
        address[] memory whoLike;
        uint likeNum;
        string memory postInfo;
        uint msgnum;
        string memory pic;
        uint picc;
        (authorID, postInfo, likeNum, whoLike, msgnum, pic, picc) = posting.getUsePostByID(0);
        Assert.equal(postInfo, "I love Hannah #H&J", "Postinfo should be equal");
        Assert.equal(authorID, address(this), "AuthorID should be equal");
    }

    function testMessageOperation() public{
        PostingUse posting = PostingUse(DeployedAddresses.PostingUse());
        string memory cool = "cool";
        Assert.equal(0, posting.getUseMsgNum(0), "There should be 0 msg in post 0");
        posting.addUseMessage(0, cool);
        Assert.equal(1, posting.getUseMsgNum(0), "There should be 1 msg in post 0");
        string memory returnStr;
        address msgOwner;
        (returnStr, msgOwner) = posting.getUseSingleMsg(0,0);
        Assert.equal(returnStr, cool, "Msg should be equal");
        Assert.equal(msgOwner, address(this), "Msg owner should be equal");
        posting.updateUseMsg(0,0,"Hello");
        (returnStr, msgOwner) = posting.getUseSingleMsg(0,0);
        Assert.equal(returnStr, "Hello", "Msg should be equal");
    }

    function testLIkeOperation() public{
        PostingUse posting = PostingUse(DeployedAddresses.PostingUse());
        Assert.equal(posting.toggleUseLikes(0), 1, "LikeNum should be 1 after click");
        Assert.equal(posting.getUseWhetherUserLike(0, address(this)), true, "Not like");
        Assert.equal(posting.toggleUseLikes(0), 0, "LikeNum should be 0 after another click");
        Assert.equal(posting.getUseWhetherUserLike(0, address(this)), false, "Not like");
        Assert.equal(posting.toggleUseLikes(0), 1, "LikeNum should be 1 after click");
        Assert.equal(posting.getUseLikeNumByID(0),1, "LikeNUm should be 1");
    }

    function testHashtag() public{
        PostingUse posting = PostingUse(DeployedAddresses.PostingUse());
        posting.createUsePost("I love Hannah #H&J#yo", "123196969696956969696969696969696969696", 1);
        posting.createUsePost("I love Hannah #H&", "123196596969696969696969696969696969696", 1);
        posting.createUsePost("I love Hannah #H&J", "123519696969696969696969696969696969696", 1);
        uint[] memory posts = posting.getUsePostByHashtag("H&J");
        Assert.equal(0, posts[0], "First post ID");
        Assert.equal(1, posts[1], "Second post ID");
        Assert.equal(3, posts[2], "Third post ID");
    }

    function testGetUseByAddr() public{
        PostingUse posting = PostingUse(DeployedAddresses.PostingUse());
        uint[] memory arr = posting.getAllUsePost();
        Assert.equal(0, arr[0], "First post ID");
        Assert.equal(1, arr[1], "Second post ID");
        Assert.equal(2, arr[2], "Third post ID");
        uint[] memory arrr = posting.getUsePostsByAddr(address(this));
        Assert.equal(0, arrr[0], "First post ID");
        Assert.equal(1, arrr[1], "Second post ID");
        Assert.equal(2, arrr[2], "Third post ID");
        uint[] memory arrrr = posting.getUsePostsByAddr(address(msg.sender));
        Assert.equal(0, arrrr.length, "Length should equal to zero");
    }
}
