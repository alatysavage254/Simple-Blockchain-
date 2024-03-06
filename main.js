const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index,data,previousHash = '') {
        this.index = index;
        this.timestamp = this.timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash()
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)+ this.nonce).toString();

    }
    // implementing proof of work
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !==Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash)
    }
}


class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 4;

    }
    createGenesisBlock() {
        return new Block(0, "06/03/2024", "Genesis block", "0")
    }

    getLatesBlock() {
    return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
     newBlock.previousHash = this.getLatesBlock().hash;
     newBlock.mineBlock(this.difficulty);
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

console.log('Mining block 1...');
alatyCoin.addBlock(new Block(1, "18/03/2024", { amount: 4 } ))

console.log('Mining block 2...')
alatyCoin.addBlock(new Block(2, "20/03/2024", { amount: 10 } ))






