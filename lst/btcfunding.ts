const txb = new bitcoin.TransactionBuilder(NETWORK);

let totalBalance = 0;
let inputCount = 0;
const values = [utxos.length];


for (const utxo in utxos) {
    if (utxo) {
    totalBalance += Math.floor(parseFloat(utxos[utxo].value) * 1e8);
    values[inputCount] = Math.floor(parseFloat(utxos[utxo].value) * 1e8);
    txb.addInput(utxos[utxo].txid, utxos[utxo].output_no, undefined, senderP2wpkh.output);
    console.log("adding input: " + utxos[utxo].txid + " to funding transaction");
    inputCount++;
    }

}

const estimatedTxSize = inputCount * 104 + 2 * 32;
const feeRate = await getFeeRateByTarget(0.5);

const estimatedFeeAmount = Math.floor(100 * estimatedTxSize);
const sendAmount = amountSatoshis + estimatedFeeAmount;

if (totalBalance - sendAmount > 0) {
    if (totalBalance - sendAmount !== 0) {
    txb.addOutput(senderAddress, (totalBalance - sendAmount));
    }

    txb.addOutput(p2wshAddress, sendAmount);

    for (let i = 0; i < inputCount; i++) {
    txb.sign(i, senderKeyPair, undefined, undefined, values[i]);
    }

    const fundingTransaction = txb.buildIncomplete();
    console.log("");
    console.log("===== Funding Transaction to " + p2wshAddress + " ) =======");
    console.log("Transaction ID: " + fundingTransaction.getId());
    console.log("Transaction (needed for broadcasting TX): " + fundingTransaction.toHex());

    await broadcastTx(fundingTransaction.toHex());
}