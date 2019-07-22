const feeRate = await getFeeRateByTarget(0.5);
const estimatedTxSize = inputCount * 104 + outputCount * 32;
const estimatedTxSizeReceiver = 104 + 32;
let index = 0;
const estimatedFeeAmount = Math.floor(feeRate * estimatedTxSize);
const estimatedFeeAmountReceiver = Math.floor(feeRate * estimatedTxSizeReceiver);