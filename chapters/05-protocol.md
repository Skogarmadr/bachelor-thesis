
# Protocol

We describe a protocol for an on-chain atomic swap between Bitcoin and Ethereum, but the protocol can be generalized for Ethereum and any other cryptocurrencies that fulfill the same requirements as Bitcoin ( e.g. LiteCoin), see \ref{bitcoinPrerequisites}. This protocol is heavily based on the `BIP-199` (\gls{bip}) \citep{bip199} for the Bitcoin part. For Ethereum the concept is roughly the same but with less prerequisites than Bitcoin.  For sending funds, each participant must generate a specific address to lock fund on each chain (cross-chain) where each other party can take control of the funds from the other chain (swap) only.

## Limitations

The most important process of the protocol is the `liveness`. Liveness means that participant must be online for respecting the protocol (at least one participant is still online). In the worst scenario where someone doesn't follow the protocol, it can happen the coalition end up and loose the funds. This happen only if a party is not remained online during the swap or it has not claimed the funds in time.

In an other side, there is an other factor to take on board which is the `Fees`. Each blockchain have different fees because there are built with different internal parameters and transaction complexity. It is also due to a factor, the blockspace that depend of the demand. In this project, we use the Bitcoin Blockchain like a tool, more precisely, we use some advanced features that increase the cost of the transaction for bitcoin side. In general, the transaction is more expensive on Bitcoin than Ethereum, because Ethereum the cost transactions doesn't depend by the user.

The difficult problem with cross chain swaps is the off chain coordination required to have the two parties meet and agree on conditions. This consist to an accord between the two peers by the speed of the protocol (i.g. to considerate that a confirmation is confirmed) but the speed is influenced with the  slowness and a number of confirmation required for validating a confirmation in each blockchain side. The protocol is slow but it can be extended by way of setups. The only things we can change from the setups is the ranges of fees that can consume but in any case we cannot deviate the worst scenario that consists to have an amount of fee in each chain.

## Scenario


\input{fig/atomic-swap} 

Let's see the process in figure \ref{fig:atomicswap} :

* Alice owns Bitcoin (BTC) and wants to exchange Ether (ETH).
* Alice is the instigator of the swap, she starts by creating a contract address HTLC in bitcoin chain.
* Alice generate a key and hash it.
* Alice deposits the BTC and the value in the contract address. It's called the funding transaction.
* Upon doing this, Alice sends her hash to Bob.
* Bob generates too a contract address using the hash that has been given to him by Alice in ethereum chain. 
* Only Alice can unlock the ETH in this address because she has the value which generates that particular hash. It's the claiming transaction.
* Alice can get her ETH by signing a transaction for Bob’s contract address and Bob can retrieve the BTC by signing a transaction for Alice contract address.
* When Alice signs Bob’s contract address with the value, she unlocks the address and reveals the value to Bob as well.
* Bob, now knowing the value, signs off the transaction for Alice’s address and retrieves his BTC.

To summarize the process , the scenario describes the participants and their incentives. `Alice` owns Bitcoin (BTC) and Bob owns ether (ETH), they want to swap funds. Alice and Bob have already negotiated the price in advance and are agreed (i.e. amount of bitcoin for amount of ether to swap). They are only two possible ways of execution path for both parties :

1. `The protocol succeed` - Alice get her ETH and Bob his BTC.
2. `The protocol failed` - both parties keep their fund (they will lost some amounts because they need to pay some fees for each transaction).

### Successful swap

For having a successful swap, both parties must follow the protocol. They will be four transactions in total, 2 transactions for Bitcoin blockchain and 2 transactions for Ethereum blockchain :

1. Lock the funds in Bitcoin and make it ready for the swap.
2. Lock the funds in Ethereum and make it ready for the swap.
3. Unlock the funds in Ethereum.
4. Unlock the funds in Bitcoin.

When participants unlock the funds, they take control of the output of the contract in the other chain. here is the most simple and optimal way to perform the protocol. Here, no timelock is required but both participant must care about the minimum number of transaction and for the minimal transaction, the funding transaction (locking fund). Confirmations vary between each chain, so it needs to be considered if both parties are expecting the funding transaction to be considered final and are sure to keep going the protocol.

### Swap aborted

The swap is aborted only if one party wants not to continue the process. To get the refund of the locked funds, Alice or Bob must wait for the timelock is reached. When Alice starts, there are no ETH but only BTC locked into a contract. If bob doesn't follow, so Alice wait her timelock and after that she can spent refund. The length of time on each lock is important to ensure that the game can only be played fairly.  Alice’s time lock should be longer and Bob’s lock should be much shorter. This is because Alice knows the hash lock secret and therefore has a major advantage. It is very important because if Alice's timelock had the shorter refund time, Alice could wait until that time expires, refund herself the Bitcoin and after that then  enter the secret preimage into Ethereum to claim  the ETH that Bob sent. Alice would have both coins and Bob would loose his ETH.

### Worst scenario

There is possibility that the protocol can be broken again if a party doesn't follow the rules from the Bitcoin part. If the swap process succeed with Alice claiming ETH funds and Bob doesn't claim his BTC fund before the Alice's timelock, then Alice can spent her refund as soon as her timelock is reached. It will conclude that Bob would lost his funds and Alice would get both coins. In Ethereum this can't happend because when the timelock is reached, claim fund are automatically blocked and Alice cannot claim the fund, only Bob spent the refund to avoid that situation.
To resolve this problem, we must implement a protocol that force Bob to be not offline or compensate Bob if Alice doesn't follow correctly the protocol.

## Prerequisite

In the chapter \ref{scenario}, we describe the conditional process that must be followed to guarantee a swap with atomicity. Bitcoin has a small stack-based script language that allows for conditional execution and timelocks. Whereas Ethereum use full smart contract that allows hashing and timelocks too. The challenge is then to implement the BIP-199 in Ethereum.

### Bitcoin

### Ethereum

### Elliptic Curve

\begin{equation}
\begin{split}
    p&: \text{a prime number;}\ p = 2^{256} - 2^{32} - 2^9 - 2^8 - 2^7 - 2^6 - 2^4 - 1 \\
    a&: \text{an element of } \mathbb{F}_p;\ a = 0 \\
    b&: \text{an element of } \mathbb{F}_p;\ b = 7 \\
    E'&: \text{an elliptic curve equation};\ y^2 = x^3 + bx + a \\
    G'&: \text{a base point};\ G' = \\ (&\texttt{\scriptsize0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798},\\ &\texttt{\scriptsize0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8}) \\
\end{split}
\end{equation}

## Hashed Timelock Contract

\input{fig/protocol}

The scenario describe the participants and their incentives. `Alice`, who owns monero (XMR), and Bob, who owns bitcoin (BTC), want to swap funds. We assume
that they already have negotiated the price in advance (i.e. amount of bitcoin
for amount of monero to swap.) This negotiation can also be integrated into the
protocol, for example by swap services who provide a price to their customers.
Both participants wish to only have two possible execution paths (which are
mutually exclusive to each other) when executing the protocol: (1) the protocol
succeeds and Alice gets bitcoin, Bob gets monero, or (2) the protocol fails and
both keep their original funds minus the minimum transaction fees possible.