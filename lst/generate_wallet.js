
const bip32 = require('bip32');
const bip39 = require('bip39');
const crypto = require('crypto');

// 128 bit entropy => 12 words mnemonics
// Generate random entropy
const alice_randomBytes = crypto.randomBytes(16);
const bob_randomBytes = crypto.randomBytes(16);

const alice_entropy = alice_randomBytes.toString('hex');
const bob_entropy = bob_randomBytes.toString('hex');

const funding_path = "m/44'/0'/0'/0/0";

 // Get mnemonic from entropy
 var mnemonic = bip39.entropyToMnemonic(alice_entropy);
 
 // Get seed from mnemonic
 var seed = bip39.mnemonicToSeedSync(mnemonic);

 // Get BIP32 master from seed
 var master = bip32.fromSeed(seed, NETWORK);

 // Get child node
 var child = master.derivePath(funding_path);

 // Get child wif private key
 var wif = child.toWIF();

  // Get child extended private keys
  var childXprv = child.toBase58();
  
  // Get child EC public key
  var ECPubKey = child.publicKey.toString('hex');
  