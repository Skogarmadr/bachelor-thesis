const signatureHash = txRaw.hashForWitnessV0(0, p2wsh.redeem!.output!, totalBalance, hashType);

const witnessStack = bitcoin.payments.p2wsh({
  redeem: {
    input: bitcoin.script.compile([
      bitcoin.script.signature.encode(receiverKeyPair.sign(signatureHash), hashType),
      receiverKeyPair.publicKey,
      Buffer.from(preimage, 'hex'),
      bitcoin.opcodes.OP_TRUE
    ]),
    output: witnessScript
  },
}).witness;