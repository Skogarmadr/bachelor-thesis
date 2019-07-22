const signatureHash = txRaw.hashForWitnessV0(0, p2wsh.redeem.output, totalBalance, hashType);

const witnessStack = bitcoin.payments.p2wsh({
redeem: {
    input: bitcoin.script.compile([
    bitcoin.script.signature.encode(senderKeyPair.sign(signatureHash), hashType),
    senderKeyPair.publicKey,
    bitcoin.opcodes.OP_FALSE
    ]),
    output: witnessScript
},
}).witness;

txRaw.setWitness(0, witnessStack);