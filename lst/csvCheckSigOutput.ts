function csvCheckSigOutput(senderPubkeyHash: bitcoin.StackElement, receiverPubkeyHash: bitcoin.StackElement, hash: bitcoin.StackElement, sequence: number) {
    return bitcoin.script.compile([
      bitcoin.opcodes.OP_IF,
      bitcoin.opcodes.OP_SHA256,
      hash,
      bitcoin.opcodes.OP_EQUALVERIFY,
      bitcoin.opcodes.OP_DUP,
      bitcoin.opcodes.OP_HASH160,
      receiverPubkeyHash,
      bitcoin.opcodes.OP_ELSE,
      bitcoin.script.number.encode(sequence),
      bitcoin.opcodes.OP_CHECKSEQUENCEVERIFY,
      bitcoin.opcodes.OP_DROP,
      bitcoin.opcodes.OP_DUP,
      bitcoin.opcodes.OP_HASH160,
      senderPubkeyHash,
      bitcoin.opcodes.OP_ENDIF,
      bitcoin.opcodes.OP_EQUALVERIFY,
      bitcoin.opcodes.OP_CHECKSIG,
    ]);
  }