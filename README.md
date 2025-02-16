# 💧🇽 usersKeepKeys 🔏

This is just an WIP example at the moment. This can be expanded to have signing so that users do not need to rely on any 'not-your-keys-not-your-coins' style code.

### **How to Add a New Coin from Common Crypto Libraries**  

#### **1. bitcoinjs-lib (Bitcoin-based coins like BTC, LTC, DOGE, DASH, etc.)**  
Modify **network parameters** to support a new coin.  
```javascript
const newCoin = {
    messagePrefix: '\x18NewCoin Signed Message:\n',
    bech32: 'nc', // Bech32 prefix if applicable
    bip32: { public: 0x0488B21E, private: 0x0488ADE4 }, // BIP32 HD wallet prefixes
    pubKeyHash: 0x23, // Address prefix (change for your coin)
    scriptHash: 0x05, // Script address prefix (optional)
    wif: 0x80  // Wallet Import Format prefix
};
```
🔹 **Use it**:  
```javascript
generateBitcoinLikeAddress(newCoin);
```

---

#### **2. ethers.js / web3.js (Ethereum-based coins like BSC, Polygon, Avalanche, etc.)**  
Modify the **RPC URL and Chain ID** in `ethers.providers.JsonRpcProvider()`.  
```javascript
const provider = new ethers.providers.JsonRpcProvider("https://rpc.newcoin.org");
const wallet = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);
```
🔹 **Deploy Contracts?** Modify **chainId** in `wallet.sendTransaction()`.  

---

#### **3. solana-web3.js (Solana-based coins)**  
Use **new RPC URL** and **custom program ID** for token minting.  
```javascript
const connection = new solanaWeb3.Connection("https://rpc.newcoin.org");
```
🔹 **Deploy a new SPL token?** Change `mintAuthority` in `Token.createMint()`.  

---

#### **4. polkadot.js (Polkadot & Substrate chains like Kusama, Moonbeam, etc.)**  
Modify the **API endpoint** and **genesisHash** in `ApiPromise.create()`.  
```javascript
const api = await ApiPromise.create({ provider: new WsProvider("wss://rpc.newcoin.org") });
```
🔹 **Custom Address Format?** Adjust `keyring.setSS58Format(format)`.  

---

#### **5. Stacks.js (STX & sBTC, for Stacks blockchain)**  
Change the **network configuration** in `StacksMainnet()`.  
```javascript
const network = new StacksMainnet({ url: "https://stacks-node.newcoin.org" });
```
🔹 **Use custom contract calls?** Modify `callReadOnlyFunction()`.  

---

#### **6. near-api-js (NEAR-based coins)**  
Modify **networkId and RPC URL** in `connect()`.  
```javascript
const near = await connect({ networkId: "newcoin", nodeUrl: "https://rpc.newcoin.org" });
```

---

#### **7. cosmjs (Cosmos-based chains like Osmosis, Terra, etc.)**  
Change **tendermint RPC URL** in `SigningStargateClient.connect()`.  
```javascript
const client = await SigningStargateClient.connect("https://rpc.newcoin.org");
```

---

### **General Steps to Add a New Coin**
1. **Find its base protocol** (Bitcoin, Ethereum, Solana, etc.).  
2. **Modify network parameters** (RPC URL, prefixes, Chain ID).  
3. **Ensure address encoding matches** (Base58Check, Bech32, etc.).  
4. **Test transactions on testnet** before mainnet.  
