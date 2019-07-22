const senderKeyPair = bitcoin.ECPair.fromWIF(senderWif, NETWORK);
const senderP2wpkh = bitcoin.payments.p2wpkh({ pubkey: senderKeyPair.publicKey, network: NETWORK });
const senderAddress = senderP2wpkh.address as string;
const sequence = bip68.encode({ blocks: nbBlock });ddd
const witnessScript = csvCheckSigOutput(senderKeyPair.publicKey, pubKeyReceiver, revHash, sequence);
const p2wsh = bitcoin.payments.p2wsh({ redeem: { output: witnessScript }, network: NETWORK });
const p2wshAddress = p2wsh.address as string;