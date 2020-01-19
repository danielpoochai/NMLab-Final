pragma solidity ^0.5.0;

contract User{

    struct Author {
        address user_Addr;
        string personalPic; //hash
        string name;
        uint id;
        uint[] ownPosts_IDs;
        uint[] boughtPosts_IDs;
    }

    //ID
    uint ID = 1;
    //map users by address
    mapping(address => Author) public authorAddr_2_Author;
    //map users by name
    mapping(string => Author) public authorName_2_Author;
    //map users by ID
    mapping(uint => Author) public authorID_2_Author;

    event newAuthor(
       address _user_addr,
       string _personalPic,
       string _name
    );

    event changeName(
        address _user_addr,
        string _name
    );

    event changePic(
        address _user_addr,
        string _personalPic
    );

    modifier onlyOwner(address _user_addr) {
        require(msg.sender == _user_addr, "sender != owner");
        _;
    }

    function checkREG (
        address _addr
    ) public view returns (bool){
        bool test = true;
        if(authorAddr_2_Author[_addr].id == 0) test = false;
        else test = true;

        return test;
    }

    function createAuthor(
        address _addr,
        string memory _personalPic,
        string memory _name,
        uint[] memory _ownPosts,
        uint[] memory _boughtPosts
        ) public {

            // require(authorAddr_2_Author[_addr].id == 0, "You have already registered!");

            Author memory new_author = Author({
                user_Addr : _addr,
                personalPic : _personalPic,
                name : _name,
                id : ID,
                ownPosts_IDs : _ownPosts,
                boughtPosts_IDs : _boughtPosts
            });

            authorAddr_2_Author[_addr] = new_author;
            authorName_2_Author[_name] = new_author;
            authorID_2_Author[ID] = new_author;

            ID = ID + 1;

            emit newAuthor(_addr, _personalPic, _name);
    }

    function setName(address user_addr, string memory new_Name) public onlyOwner(user_addr)
    {
        Author memory _author = authorAddr_2_Author[user_addr];
        authorAddr_2_Author[user_addr].name = new_Name;
        authorName_2_Author[_author.name].name = new_Name;
        authorID_2_Author[_author.id].name = new_Name;

        emit changeName(user_addr, new_Name);
    }

    function setPersonalPic (address user_addr, string memory new_pic) public onlyOwner(user_addr)
    {
        Author memory _author = authorAddr_2_Author[user_addr];
        authorAddr_2_Author[user_addr].personalPic = new_pic;
        authorName_2_Author[_author.name].personalPic = new_pic;
        authorID_2_Author[_author.id].personalPic = new_pic;

        emit changePic(user_addr, new_pic);
    }

    function getAuthorByID(uint user_ID) public view returns (address, string memory, string memory, uint, uint[] memory, uint[] memory){
        return (authorID_2_Author[user_ID].user_Addr,
                authorID_2_Author[user_ID].personalPic,
                authorID_2_Author[user_ID].name,
                authorID_2_Author[user_ID].id,
                authorID_2_Author[user_ID].ownPosts_IDs,
                authorID_2_Author[user_ID].boughtPosts_IDs
                );
    }

    function getAuthorByAddr(address user_addr) public view returns(address, string memory, string memory, uint, uint[] memory, uint[] memory){
        return (authorAddr_2_Author[user_addr].user_Addr,
                authorAddr_2_Author[user_addr].personalPic,
                authorAddr_2_Author[user_addr].name,
                authorAddr_2_Author[user_addr].id,
                authorAddr_2_Author[user_addr].ownPosts_IDs,
                authorAddr_2_Author[user_addr].boughtPosts_IDs
                );
    }

    function getAuthorByName(string memory user_name) public view returns(
        address, string memory, string memory, uint, uint[] memory, uint[] memory){
        return (authorName_2_Author[user_name].user_Addr,
                authorName_2_Author[user_name].personalPic,
                authorName_2_Author[user_name].name,
                authorName_2_Author[user_name].id,
                authorName_2_Author[user_name].ownPosts_IDs,
                authorName_2_Author[user_name].boughtPosts_IDs
                );
    }

    function getOwnPostByUser(uint user_ID) public view returns (uint[] memory){
        return authorID_2_Author[user_ID].ownPosts_IDs;
    }

    function getBoughtPostByUser(uint user_ID) public view returns (uint[] memory){
        return authorID_2_Author[user_ID].boughtPosts_IDs;
    }

}