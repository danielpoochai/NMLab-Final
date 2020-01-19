pragma solidity >=0.4.25 <0.6.0;
import "../contracts/Posting.sol";
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

contract TestPosting{
    function testImitialPost() public{
        uint expected = 0;
        Posting posting = Posting(DeployedAddresses.Posting());
        uint num = posting.getPostNum();
        Assert.equal(expected, num, "There should be 0 post initially");
    }

    function testgetHashTagg() public{
        Posting posting = Posting(DeployedAddresses.Posting());
        string memory parse = "asdfo;eo; dde#J&H";
        string memory output = posting.getHashTag(parse);
        Assert.equal("#J&H", output, "cool");
    }

    function testCreatePost() public{
        Posting posting = Posting(DeployedAddresses.Posting());
        string memory postInfo = "I love Hannah #H&J";
        string memory pic = "123456";
        uint num = posting.createPost(postInfo, pic, "666");
        Assert.equal(1, posting.getPostNum(), "There sho666uld be 1 post after create post");
        Assert.equal(1, num, "There should be 1 post after create post");
        Assert.equal(0, posting.createPost(postInfo, pic, "666"), "Output should be zero after error create");
    }

    function testGetPost() public{
        Posting posting = Posting(DeployedAddresses.Posting());
        //return  authorID, users, postInfo, likeNum, whoLike, msgNum
        address authorID;
        string memory pic;
        uint userNum;
        address[] memory whoLike;
        uint likeNum;
        string memory postInfo;
        uint msgnum;
        (authorID, userNum, postInfo, likeNum, whoLike, msgnum, pic) = posting.getPostByID(0);
        Assert.equal(postInfo, "I love Hannah #H&J", "Postinfo should be equal");
        Assert.equal(authorID, address(this), "AuthorID should be equal");
    }

    function testMessageOperation() public{
        Posting posting = Posting(DeployedAddresses.Posting());
        string memory cool = "cool";
        Assert.equal(0, posting.getMsgNum(0), "There should be 0 msg in post 0");
        posting.addMessage(0, cool);
        Assert.equal(1, posting.getMsgNum(0), "There should be 1 msg in post 0");
        string memory returnStr;
        address msgOwner;
        (returnStr, msgOwner) = posting.getSingleMsg(0,0);
        Assert.equal(returnStr, cool, "Msg should be equal");
        Assert.equal(msgOwner, address(this), "Msg owner should be equal");
        posting.updateMsg(0,0,"Hello");
        (returnStr, msgOwner) = posting.getSingleMsg(0,0);
        Assert.equal(returnStr, "Hello", "Msg should be equal");
    }

    function testLIkeOperation() public{
        Posting posting = Posting(DeployedAddresses.Posting());
        Assert.equal(posting.toggleLikes(0), 1, "LikeNum should be 1 after click");
        Assert.equal(posting.getWhetherUserLike(0, address(this)), true, "Not like");
        Assert.equal(posting.toggleLikes(0), 0, "LikeNum should be 0 after another click");
        Assert.equal(posting.getWhetherUserLike(0, address(this)), false, "Not like");
        Assert.equal(posting.toggleLikes(0), 1, "LikeNum should be 1 after click");
        Assert.equal(posting.getLikeNumByID(0),1, "LikeNUm should be 1");
    }

/*
    function testUserOperation() public{
        Posting posting = Posting(DeployedAddresses.Posting());
        posting.addUser(0);
        posting.addUser(0);
        uint users = posting.getPostUserNum(0);
        Assert.equal(2, users, "First added user should be equal");
    }
*/
    function testHashtag() public{
        Posting posting = Posting(DeployedAddresses.Posting());
        posting.createPost("I love Hannah #H&J#yo", "123196969696956969696969696969696969696", "666");
        posting.createPost("I love Hannah #H&", "123196596969696969696969696969696969696", "666");
        posting.createPost("I love Hannah #H&J", "123519696969696969696969696969696969696", "666");
        uint[] memory posts = posting.getPostByHashtag("H&J");
        Assert.equal(0, posts[0], "First post ID");
        Assert.equal(1, posts[1], "Second post ID");
        Assert.equal(3, posts[2], "Third post ID");
    }

    function testDelete() public{
        Posting posting = Posting(DeployedAddresses.Posting());
        uint current = posting.getPostNum();
        posting.deletePost(0);
        Assert.equal(current-1, posting.getPostNum(), "Postnum should decrease after delete");
        uint[] memory posts = posting.getPostByHashtag("H&J");
        Assert.equal(1, posts[0], "First post ID");
        Assert.equal(3, posts[1], "Second post ID");
    }

    function testGetAllPost() public{
        Posting posting = Posting(DeployedAddresses.Posting());
        uint[] memory arr = posting.getAllPost();
        Assert.equal(1, arr[0], "First post ID");
        Assert.equal(2, arr[1], "Second post ID");
        Assert.equal(3, arr[2], "Third post ID");
        uint[] memory arrr = posting.getPostsByAddr(address(this));
        Assert.equal(1, arrr[0], "First post ID");
        Assert.equal(2, arrr[1], "Second post ID");
        Assert.equal(3, arrr[2], "Third post ID");
        uint[] memory arrrr = posting.getPostsByAddr(address(msg.sender));
        Assert.equal(0, arrrr.length, "Length should equal to zero");
    }



}
