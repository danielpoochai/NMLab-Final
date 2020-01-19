pragma solidity >=0.4.25 <0.6.0;
import "../contracts/User.sol";
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

contract TestUser{
    User user = User(DeployedAddresses.User());

    uint[] _ownPosts = new uint[](2);
    uint[] _boughtPosts = new uint[](2);
    string picture_hash = "QmQhK6KAVA2nJgFYzf7D1yHdH11GiGJv6zRTUhoVZwXpDd";
    string name = "Test";

    function testcheckReg_1() public {
        bool test = user.checkREG(address(this));
        User user = User(DeployedAddresses.User());
        Assert.equal(test, false, "failReg");
    }

    function testcreateAuthor() public{
        User user = User(DeployedAddresses.User());

        // uint[] memory _ownPosts = new uint[](2);
        // uint[] memory _boughtPosts = new uint[](2);
        // string memory picture_hash = "QmQhK6KAVA2nJgFYzf7D1yHdH11GiGJv6zRTUhoVZwXpDd";
        // string memory name = "Test";

        user.createAuthor(address(this), picture_hash, name, _ownPosts, _boughtPosts);

        (address addr,string memory pic,string memory _name,uint id,uint[] memory ownp,uint[] memory buyp) = user.getAuthorByAddr(address(this));

        Assert.equal(addr, address(this),"fails_1");
        Assert.equal(pic, picture_hash,"fails_2");
        Assert.equal(_name, name,"fails_2");
        Assert.equal(ownp, _ownPosts, "fails_3");
        Assert.equal(buyp, _boughtPosts, "fails_4");
    }

    function testcheckReg() public {
        User user = User(DeployedAddresses.User());

        bool test = user.checkREG(address(this));

        Assert.equal(test, true, "failReg");
    }

    function testsetName() public{
        User user = User(DeployedAddresses.User());

        uint[] memory _ownPosts = new uint[](2);
        uint[] memory _boughtPosts = new uint[](2);
        string memory picture_hash = "QmQhK6KAVA2nJgFYzf7D1yHdH11GiGJv6zRTUhoVZwXpDd";
        string memory name = "Test";

        user.createAuthor(address(this), picture_hash, name, _ownPosts, _boughtPosts);

        string memory new_name = "Change Name";

        user.setName(address(this), new_name);

        (address addr,string memory pic,string memory _name,uint id,uint[] memory ownp,uint[] memory buyp) = user.getAuthorByAddr(address(this));

        Assert.equal(_name, new_name, "set_name fail");
    }

    function testsetPersonalPic() public{
        User user = User(DeployedAddresses.User());
        uint[] memory _ownPosts = new uint[](2);
        uint[] memory _boughtPosts = new uint[](2);
        string memory picture_hash = "QmQhK6KAVA2nJgFYzf7D1yHdH11GiGJv6zRTUhoVZwXpDd";
        string memory name = "Test";

        user.createAuthor(address(this), picture_hash, name, _ownPosts, _boughtPosts);

        string memory new_pic = "QmQhK6KAVA2nJgFYzf7D1yHdH11GiGJv6zRTUhoqwryeDd";

        user.setPersonalPic(address(this), new_pic);

        (address addr,string memory pic,string memory _name,uint id,uint[] memory ownp,uint[] memory buyp) = user.getAuthorByAddr(address(this));

        Assert.equal(pic, new_pic, "set_pic fail");
    }

    function testgetAuthorByID() public{
        // User user = User(DeployedAddresses.User());

        // uint[] memory _ownPosts = new uint[](2);
        // uint[] memory _boughtPosts = new uint[](2);
        // string memory picture_hash = "QmQhK6KAVA2nJgFYzf7D1yHdH11GiGJv6zRTUhoVZwXpDd";
        // string memory name = "Test";

        user.createAuthor(address(this), picture_hash, name, _ownPosts, _boughtPosts);

        (address addr,string memory pic,string memory _name,uint id,uint[] memory ownp,uint[] memory buyp) = user.getAuthorByAddr(address(this));
        (address addr_1,string memory pic_1,string memory _name_1,uint id_1,uint[] memory ownp_1,uint[] memory buyp_1) = user.getAuthorByID(id);

        Assert.equal(addr_1, address(this), "fails");
        Assert.equal(pic_1, picture_hash, "fails");
        Assert.equal(_name_1, name, "fails");
        Assert.equal(id, id_1, "fails");
        Assert.equal(ownp_1, _ownPosts, "fails");
        Assert.equal(buyp_1, _boughtPosts, "fails");
    }


    function testgetAuthorByAddr() public{
        // User user = User(DeployedAddresses.User());

        // uint[] memory _ownPosts = new uint[](2);
        // uint[] memory _boughtPosts = new uint[](2);
        // string memory picture_hash = "QmQhK6KAVA2nJgFYzf7D1yHdH11GiGJv6zRTUhoVZwXpDd";
        // string memory name = "Test";

        user.createAuthor(address(this), picture_hash, name, _ownPosts, _boughtPosts);

        (address addr,string memory pic,string memory _name,uint id,uint[] memory ownp,uint[] memory buyp) = user.getAuthorByAddr(address(this));

        Assert.equal(addr, address(this), "fails");
        Assert.equal(pic, picture_hash, "fails");
        Assert.equal(_name, name, "fails");
        Assert.equal(ownp, _ownPosts, "fails");
        Assert.equal(buyp, _boughtPosts, "fails");
    }

    function testgetAuthorByName() public{
        // User user = User(DeployedAddresses.User());

        // uint[] memory _ownPosts = new uint[](2);
        // uint[] memory _boughtPosts = new uint[](2);
        // string memory picture_hash = "QmQhK6KAVA2nJgFYzf7D1yHdH11GiGJv6zRTUhoVZwXpDd";
        // string memory name = "Test";

        user.createAuthor(address(this), picture_hash, name, _ownPosts, _boughtPosts);

        (address addr,string memory pic,string memory _name,uint id,uint[] memory ownp,uint[] memory buyp) = user.getAuthorByName(name);

        Assert.equal(addr, address(this), "fails");
        Assert.equal(pic, picture_hash, "fails");
        Assert.equal(_name, name, "fails");
        Assert.equal(ownp, _ownPosts, "fails");
        Assert.equal(buyp, _boughtPosts, "fails");
    }

    function testgetOwnPostByUser() public{
        // User user = User(DeployedAddresses.User());

        // uint[] memory _ownPosts = new uint[](2);
        // uint[] memory _boughtPosts = new uint[](2);

        _ownPosts[0] = 0;
        _ownPosts[1] = 1;

        // string memory picture_hash = "QmQhK6KAVA2nJgFYzf7D1yHdH11GiGJv6zRTUhoVZwXpDd";
        // string memory name = "Test";

        user.createAuthor(address(this), picture_hash, name, _ownPosts, _boughtPosts);

        (address addr,string memory pic,string memory _name,uint id,uint[] memory ownp,uint[] memory buyp) = user.getAuthorByName(name);

        uint[] memory test_ownPosts = user.getOwnPostByUser(id);
        Assert.equal(_ownPosts, test_ownPosts, "getOwnPost fails");
    }

    function testgetBoughtPostByUser() public{
        // User user = User(DeployedAddresses.User());

        // uint[] memory _ownPosts = new uint[](2);
        // uint[] memory _boughtPosts = new uint[](2);

        _boughtPosts[0] = 2;
        _boughtPosts[1] = 3;

        // string memory picture_hash = "QmQhK6KAVA2nJgFYzf7D1yHdH11GiGJv6zRTUhoVZwXpDd";
        // string memory name = "Test";

        user.createAuthor(address(this), picture_hash, name, _ownPosts, _boughtPosts);

        (address addr,string memory pic,string memory _name,uint id,uint[] memory ownp,uint[] memory buyp) = user.getAuthorByName(name);

        uint[] memory test_boughtPosts = user.getBoughtPostByUser(id);
        Assert.equal(_boughtPosts, test_boughtPosts, "getBoughtPost fails");
    }
}