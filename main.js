const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index,data,previousHash = '') {
        this.index = index;
        this.timestamp = this.timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash()
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();

    }
}

class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()]

    }
    createGenesisBlock() {
        return new Block(0, "06/03/2024", "Genesis block", "0")
    }

    getLatesBlock() {
    return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
     newBlock.previousHash = this.getLatesBlock().hash;
     newBlock.hash = newBlock.calculateHash();
     this.chain.push(newBlock);
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++ ) {
            const currentBlock = this.chain[i];
            const PreviousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== PreviousBlock.hash){
                return false;
            }
        }
        
        return true;
    }
}

let alatyCoin = new Blockchain();
alatyCoin.addBlock(new Block(1, "18/03/2024", { amount: 4 } ))
alatyCoin.addBlock(new Block(2, "20/03/2024", { amount: 10 } ))

console.log('is blockchain valid? ' + alatyCoin.isChainValid())

alatyCoin.chain[1].data = {amount: 100}
alatyCoin.chain[1].hash = alatyCoin.chain[1].calculateHash();

console.log('is blockchain valid? ' + alatyCoin.isChainValid())

//console.log(JSON.stringify(alatyCoin, null, 4));