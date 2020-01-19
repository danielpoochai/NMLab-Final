# NMLab-Final
### Prerequisite:
1. [Install truffle](https://www.trufflesuite.com/truffle)
2. [Ganarche_cli](https://github.com/trufflesuite/ganache-cli)
3. [IPFS](https://www.jianshu.com/p/48a2739bade2)
### How to use
```
$ cd Nmlab_final
$ npm install
Replace line 44 in ./node_modules/react-dev-utils/ModuleScopePlugin.js with "return true" to enable js file access to outside of /src
open ganache GUI
$ ganache-cli -p 8545
$ ipfs daemon //initiate IPFS
open another terminal and run 
$ truffle compile
$ truffle migrate
$ npm start (you can modify /src/index.js line 11 to run simple test)
```
Then go to http://localhost:3002
### How to go to backend
```
Comment line 12 and uncomment line 14 in ./index.js.
Perform steps in how to use.
```

