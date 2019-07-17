
# Protocol

We describe a protocol for an on-chain atomic swap between Bitcoin and Ethereum, but the protocol can be generalized for Ethereum and any other cryptocurrencies that fulfill the same requirements as Bitcoin ( e.g. LiteCoin), see \ref{bitcoinPrerequisites}. This protocol is heavily based on the BIP 199 (\gls{bip}) \citep{bip199} for the Bitcoin part. For Ethereum the concept is roughly the same but with less prerequisites than Bitcoin. For sending funds, each participant must generate a specific address to lock fund on each chain (cross-chain) where each other party can take control of the funds from the other chain (swap) only.

## Limitations

The most important process of the protocol is the `liveness`. Liveness means that participant must be online for respecting the protocol (at least one participant is still online). In the worst scenario where someone doesn't follow the procotol, it can happen the coalition end up and loose the funds. This happen only if a party is not remained online during the swap or it has not claimed the funds in time.


## Scenario
test 
\input{fig/atomic-swap} 

## Prerequisite

## Hashed Timelock Contract
