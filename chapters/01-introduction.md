# Introduction

## Motivation
The main problem when two parties want to exchange some goods is the problem of
trust. For dealing with an exchange that works, we need a certain level of trust that must be applied, particularly when the transaction depends on no one. To illustrate this, we cannot simply assure that a party A will get a good after paying some money to a party B and vice versa. A trusted third party or escrow may resolve this problem to arbitrate a transaction without no
one try to swindle the other. But in compensation for this, an extra cost may be added to
the transaction, and there is still no guarantee that the escrow is a trusted source.

Secondly, most of the crypto-based exchanges are still fully centralized even though the main goal of
cryptocurrencies is to create a decentralized system of finance.  When two parties would like to exchange two different coins, they would usually use a crypto-currency exchange, but these platforms remain centralized in general. Anyone who uses these exchanges may potentially risk various additional problems like an inherent
risk of being hacked or having a breach of user confidentiality, some delays, and many other
problems. We also mention the risk of regulatory, such as a corrupt government trying to seize people's funds. We can cite the example of `WikiLeaks` when all their donations got seized, and only bitcoin donations have made them survive. Another more recent example was one of `Coinbase` when this exchange platform started to freeze `wallets` of users because people used them on gambling sites.

 The atomic swap is one way to address theses issue by assuring a trustless and decentralized system
that exists, authorizing the blockchain application to interact with another blockchain without risks.


## Purpose of the thesis

Our main objective is to understand the conception of the cross-chain atomic swap, to know how it works and to implement an example of an atomic swap with two participants exchanging Bitcoin for Ethereum cryptocurrencies.

The focus of this work is on individual swaps where we assume that the two participants are able to negotiate an amount and a price, which for simplicity of the implementation we assume that one participant is an offeror who proposes an offer of sale at a given price through a web application.  This would result in a centralized service, but where there is no counterparty risk.


## Challenge

Programming on a blockchain for developing programs is not an easy task. Programming on two different blockchains at the same time is worse, especially when we do not know about it. Every blockchain has its lot of features to take into account; however, there are also several similarities. Blockchain implementation deviates from the standard way of thinking in software development. The main goal here is to explain the atomic swap method that must be generic and therefore, can be easily understandable and used by a large number of people. For doing this, we need to care about all the constraints and limit coming from each blockchain. The best approach to handle this challenge is to gather all the knowledge we can get and just start to code. Practices make perfect.


## Description of the work



This thesis is composed of ten chapters, starting with the introduction, which includes this section, together with the motivation, objective, and challenges of the thesis.

Chapter \ref{bitcoin-a-peer-to-peer-payment-system} begins by introducing the relevant aspects of the Bitcoin blockchain such as the transactions model, the bitcoin fees, the scripts, and what is the Segregated Witness. All these elements are required to understand the implementation of the code outlined in the thesis for the Bitcoin part.

Chapter \ref{ethereum-a-decentralized-computing-platform} provides a definition of the Ethereum ecosystem and explains all the relevant aspects of this ecosystem as such the Ether, the Gas and the fees,
the type of accounts, the transactions, the \gls{evm}, smart contract, and the Solidity. All those aspects need to be understood for the implementation of the ethereum part.

Chapter \ref{cryptography} introduces the security about cryptocurrencies in general as such the private and public key, the definition of hash and \ref{ecc} function and the steps to generate an address in Bitcoin and Ethereum. These aspects are important to know how digital signature and fingerprint are defined.

Chapter \ref{atomic-swap-a-method-of-exchanging-different-cryptocurrencies} defined what is atomic sway by explaining its features such as atomicity, the difference with payment channels, and the security by \gls{htlc}.

Chapter \ref{protocol} covers all the analyze of the atomic swap protocol in detail, such as the limitation, the scenario, the prerequisites, and all the parameters of the hashed timelock contracts.

Chapter \ref{implementation-in-bitcoin-with-bitcoinjs-lib} explains all conception from the beginning to achieve and to implement the project in the Bitcoin part.

Chapter \ref{implementation-in-ethereum-with-solidity} explains the main components to understand to reproduce the implementation of the project in the Ethereum part.

Chapter \ref{results} covers the work that has been made and analyzes the advantages and the inconveniences.

Finally, in chapter \ref{discussion} we conclude the work of this thesis by synthesizing all the work made and what is the perspective  in the future to improve the work and solve
some of its current issues.

