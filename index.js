const bitcoin = require('bitcoinjs-lib');
const bs58check = require('bs58check');
const { createHash } = require('crypto');
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

// Function to generate a Bitcoin-like address
function generateBitcoinLikeAddress(network) {
    const keyPair = bitcoin.ECPair.makeRandom({ network });
    const { publicKey } = keyPair;

    // Hash the public key (SHA256 + RIPEMD160)
    const hash160 = bitcoin.crypto.ripemd160(bitcoin.crypto.sha256(publicKey));

    // Add network prefix (e.g., 0x00 for Bitcoin, 0x30 for Litecoin, 0x1E for Dogecoin)
    const addressBytes = Buffer.concat([Buffer.from([network.pubKeyHash]), hash160]);

    // Base58Check encode
    const address = bs58check.encode(addressBytes);

    return {
        address,
        privateKey: keyPair.toWIF()  // Export private key in WIF format
    };
}

// Function to generate a Stacks (STX, sBTC) address
function generateStacksAddress() {
    const keyPair = ec.genKeyPair();
    const publicKey = keyPair.getPublic().encodeCompressed('hex');

    // Hash public key using ripemd160(sha256(pubkey))
    const hash160 = createHash('ripemd160').update(createHash('sha256').update(Buffer.from(publicKey, 'hex')).digest()).digest('hex');

    return {
        address: `SP${hash160.toUpperCase()}`,  // Stacks addresses usually start with SP or SM
        privateKey: keyPair.getPrivate('hex')
    };
}

// Function to generate a Hedera Hashgraph (HBAR) keypair
function generateHederaKeypair() {
    const keyPair = ec.genKeyPair();
    return {
        publicKey: keyPair.getPublic().encodeCompressed('hex'),
        privateKey: keyPair.getPrivate('hex')
    };
}

// Example networks
const networks = {
    bitcoin: bitcoin.networks.bitcoin,  // BTC
    litecoin: { ...bitcoin.networks.bitcoin, pubKeyHash: 0x30 },  // LTC (0x30)
    dogecoin: { ...bitcoin.networks.bitcoin, pubKeyHash: 0x1E },   // DOGE (0x1E)
};

// Generate addresses for BTC, LTC, DOGE
console.log("Bitcoin:", generateBitcoinLikeAddress(networks.bitcoin));
console.log("Litecoin:", generateBitcoinLikeAddress(networks.litecoin));
console.log("Dogecoin:", generateBitcoinLikeAddress(networks.dogecoin));

// Generate addresses for STX, sBTC, HBAR
console.log("Stacks (STX):", generateStacksAddress());
console.log("Stacks (sBTC):", generateStacksAddress());
console.log("Hedera (HBAR):", generateHederaKeypair());
