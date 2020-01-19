const Posting = artifacts.require("Posting");

module.exports = function(deployer) {
  deployer.deploy(Posting);
};
