const feeRate = await getFeeRateByTarget(0.5);
const estimatedTxSize = inputCount * 104 + outputCount * 32;
const estimatedTxSizeReceiver = 104 + 32;
const estimatedFeeAmount = Math.floor(feeRate * estimatedTxSize);
const estimatedFeeAmountReceiver = Math.floor(feeRate * estimatedTxSizeReceiver);