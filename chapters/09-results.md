# Results

In this chapter, we analyze the benefit of the atomic swap in comparison standard platform of exchange. We also analyze a certain result of the implementation that can be review for improvement. 

## Advantages

When the atomic swap works, it triggers a lot of benefits that are an important part of this protocol. Atomic Swap allows the interoperability between different cryptocurrencies, that is a huge problem today in cryptocurrencies. We have seen in the project that the 2 participants can exchange two different coins from the different blockchain. It is fully trustless, we have seen that users don't need before initiating a swap to pay attention to whom they exchange their money. If the protocol doesn't go through to the success, that is no a problem because as we have seen, there are only 2 ways that the users can go if they follow the protocol. Thus atomic swap can't be open to a host attack. Atomic swaps remove the need for having a 3rd party and make the trade as direct as possible. It also allows us to save money by avoiding the fees and other charges, which you need to pay when you are using an exchange.


## Limitations known

We resolve some issues relied upon the cryptocurrencies, but there are still issues with this protocol that we have implemented :

### Adoption

When we want to add the other cryptocurrency to our program, the new cryptocurrency must fulfill the prerequisite (see part \ref{prerequisites}) for being compatible with our protocol. That means that the limitation of atomic swaps must have the prerequisite required to allow two cryptocurrencies to engage in atomic swaps.

* Both cryptocurrencies must have a hash algorithm which is inherent to both of them
* Both the cryptos must be capable of initiating hashed timelock contracts
* Both must implement a type of smart contract.

These characteristics are going to greatly limit the number of cryptos that can actually take part in these swaps. However, that doesn't mean that it is impossible to make an atomic swap with a cryptocurrency that doesn't use these prerequisites. We must find another protocol than ours. An example below :

\begin{tabular}{|l|c|r|}
  \hline
  & Hashlock & Timelock \\
  \hline
  Bitcoin & OK & OK \\
  \hline
  Ethereum & OK & OK \\
  \hline
  Monero & KO & KO \\
  \hline
\end{tabular}


We can see that Bitcoin and Ethereum are easy to swap because they have the same requirements. However, Monero doesn't. But it possible to swap Monero for Bitcoin, it is more difficult because we have to implement a protocol without locktime and hashlock. A project of Monero and Bitcoin atomic swap already exists, see  `Bitcoin & monero cross-chain atomic swap` from \citep{monero}.

### Speed

An atomic swap is quicker than an exchange platform, but they still remain slow. We have seen that the speed of the protocol depends on the confirmation of the transaction, which is different is Bitcoin and Ethereum, and the fee rates that we choose. Atomic swap still needs tons of refinement and enhancement before it becomes fast enough to handle large volumes of data — this one area where the lightning network can aid atomic swaps in a major way.

## Reducing fees by P2WSH

Integrate Segregated Witness in Bitcoin was not in our objective of this thesis. But as mentioned above, atomic swaps are pretty slow because they need to be synchronized with both different blockchain transactions.  This is why we make an extra effort to add these features to the Bitcoin side for resolving a problem of transaction malleability. In bitcoin, we needed to create P2SH, but instead, we create a P2WSH. To compare the difference, see the part below :

For a transaction with 1 input and 2 outputs and a fee rate of 8 sat/vB, we calculate the fees for SegWit & non-SegWit transaction :

\begin{tabular}{|l|c|r|}
  \hline
    & satoshi (Non-Segwit) & satoshi (SegWit)   \\
  \hline
  transaction & 1833 & 1338 \\
  \hline
\end{tabular}

In the table above, we can see that a transaction using Non-SegWit will cost 1833 satoshis and SegWit transaction will cost 1338. SegWit allows saving 36 % of fees in less in this type of transactions. This is really big, and it is why we must not avoiding  to use this transaction's structure. For more information, how to get the fee rate, see [https://fees.truelevel.io/#/btc](https://fees.truelevel.io/#/btc).


## Problem of dependance

The project is functional by using the combination of centralized and decentralized components. For getting the data from the blockchains, we need to use a block explorer. A block explorer is a centralized tool that provides a view of cryptocurrency transactions online. Unfortunately, this technic has some issues. The main issue is that we are dependent on the block explorer. That means, if we cannot get information from it, our program is unusable. To resolve these issues for getting the data, we can run our node of each blockchain in a local server. It is the best approach for being decentralized and especially not depending on a third party. However, we sacrifice the user-friendly concept of our program, because that's a need for each user who wants to use our program to install and also run a node in local into his computer. This step can be complicated for some users, and even they can be lost for using our programs. It is why we have preferred to keep block explorer, the users have the minimum of task, and we conserve the interface user-friendly.
