# Bitcoin, A Peer-to-Peer Payment System

Invented in 2008, Bitcoin is a digital currency that follows the ideas of mysterious pseudonymous developer software, Satoshi Nakamoto. Bitcoin is one of the first digital currency to use the peer-to-peer technology for executing payments with his currency called Bitcoin for goods. Bitcoin deviates from the traditional online payment system (e.g. bank system) and centralized to emerge a decentralized authority that operates it. Today bitcoin takes any such breadth to the level of economic, political and security point that we can define it like a distributed computing innovation.

## Functioning of Bitcoin

The blockchain relies on a shared public ledger which includes all the confirmations of the transactions. The bitcoin wallets use these data for computing their spendable balance, thus new transactions may be verified and in this way ensuring that the spender owns them. All the integrity and the order from the beginning of the blockchain are secure with cryptography.

Another part of bitcoin is the distributed consensus system called mining that allows confirming pending transactions by including them into the blockchain. It enforces the chronological order of the blockchain protecting the neutrality of the Bitcoin network and enables different computers to agree and change the state of all the system. The modification of previous blocks is prevented by theses rules for any modifications and will conclude by the invalidation of all the subsequent blocks. It also prevents the fact to add easily new blocks successively to the blockchain. Therefore, no one can control what is included in the blockchain or modify parties of the blockchain to get back theirs spends. The transactions in the blockchain are irreversible.

## Fees

Each time there is a transaction in bitcoin, the payer must include transaction fees. The fees are the reward for the miners and they are given to them after each confirmation of a new block containing transactions. Transactions pay fees that are based on the total byte size also called `virtual size` of the signed transaction. That means for each byte of the transaction, we calculate the fees. The bytes is based on the demand for space in mined blocks they consume. In addition, we can choose a ratio that influences the transaction fee. If we give no transaction fees, our transaction will never be added to the blockchain and if we put to low fees, we have a chance that our transaction will never be mined or it will take an infinite time. This is because miners prefer to mine transactions that have higher fees.

## Transaction

A transaction in bitcoin is the process to transfer coins between Bitcoin wallets all include in the blockchain. For each wallet, a secret data called private key is used to sign transactions providing a mathematical proof they are the owner of their wallet. A signature can also prevent the alteration of the transaction by another party. All transactions are broadcast to the Bitcoin network and their confirmations begin only within 10-20 minutes on average through a process called mining. 

\input{fig/transaction}

The figure \ref{fig:transaction} above shows the main part of a Bitcoin transaction. Each transaction must possess one input and one output. Each input spends a payment in satoshi\footnotemark for a previous output. Each output then waits as an \gls{utxo} until an input spends it. A simple example, when our Bitcoin wallet tells us that we have a 10 bitcoins in our balance, that means in reality that we have 10 bitcoins waiting in one or more \gls{utxo}.

\footnotetext{Smallest unit in Bitcoin where $1 \texttt{ satoshi} = 10^{-8} \texttt{ bitcoin}$}

To summarize, a transaction is composed of a set of inputs and outputs. Input is based on a `UTXO` at the address from the one who sends it.  Output refers to an address where the funds are sent. 

## Bitcoin Script
As we have seen in chapter \ref{transaction}, a transaction has one input and one output. Input refers to a transaction identifier called `txid` and an output index number called `vout` for identifying a specific output to be spent. The output also has an amount in satoshi which it sends it. 

A script is a list of instructions included in the transaction to explain how a person wants to spend the amount of satoshi. In a typical Bitcoin transaction, a person who satisfies the conditions of the script can gain access to it. The spender must provide a public key that then hashed can provide the target destination address. He also must give a signature to prove ownership of the private key corresponding to the public key just provided. The two next figures below are an example of how bitcoin script resembles with its system of the stack:

\input{fig/script1}

\newpage

\input{fig/script2}

## P2PKH Script

\gls{p2pkh} is the basic form of making a transaction and is the most common form of transaction on the Bitcoin network. Transaction paying Bitcoin to an address which it has P2PKH scripts are resolved only on sending the public key and a digital signature providing by the private key that corresponds. Theses data are concatenated into an unlocking script that needs to be evaluated for the script :

\begin{minipage}{\linewidth}\centering
\begin{lstlisting}[mathescape=true, caption={An unlocking script for P2PKH script.},label=lst:unlocking]  
    <Sig> <PubKey> OP_DUP 
    OP_HASH160 <PubkeyHash> OP_EQUALVERIFY OP_CHECKSIG
\end{lstlisting}
\end{minipage}


For checking if a transaction is valid, a signature script and public key script are executed at the same time. The figure \ref{fig:script1} and \ref{fig:script2} shows the evaluation of a standard P2PKH pubkey script : 

1. The signature is pushed to an empty stack. The public key is pushed on top of the signature.
2. The `OP_DUP` operation executes the script pubkey. `OP_DUP` pushes onto a copy of the data from the top of the stack.
3. `OP_HASH160`, pushes onto the stack a hash of the data currently on top of and creates a hash of the public key.
4. The pubkey hash is then pushed onto the top of the stack where now there are two copies.
5. `OP_EQUALVERIFY` is the equivalent of `OP_EQUAL` followed by `OP_VERIFY`. `OP_EQUAL` check the two values at the top of the stack and return true on the stack whether they are equal. `OP_VERIFY` check the boolean value on the top of the stack and terminates if the value is `FALSE`.
6. Finally, `OP_CHECKSIG` checks the signature provided against the now-authenticated public key provided. If the signature matches the public key and was generated using all of the data required to be signed, `OP_CHECKSIG` pushes the value `TRUE` onto the top of the stack.

A transaction to be valid must have `TRUE` value onto the top of the stack.

## P2SH Script

\gls{p2sh} was standardized in \gls{bip} 16 and is the second common script the most used in the blockchain. It allows a transaction to be sent into a script hash instead of using the P2PKH script providing a public key hash. The receiver of the transaction must give a script that matches the script hash and the data inside for making the evaluation script to `true`. When this process is valid, the receiver can spend the amount of the output sent via `P2SH`. `P2SH` has the advantage to create various unusual ways for securing a transaction, e.g. adding a required password in additional of the signature into the script to unlock the transaction and spend it.

## Segregated Witness

\gls{segwit} is a \gls{bip} 141 that allows the modification of the transaction format of the cryptocurrency bitcoin. Segregated Witness means `consensus layer`. Its purpose is to prevent problems came from standard transaction structure as such bitcoin transaction malleability and fix them. The protocol allows optional data transmission and goes trough certain protocol restrictions. The protocol is described as an intention for reducing the blockchain size limitation problem that slows bitcoin transaction speed. It does this by separating the transaction into two segments, remove the unlocking signature data called `witness` from the original portion and adds it to a split structure in the end. The first section continues to keep the sender and receiver data and the new structure `witness` contains only scripts and signatures. The advantage of this technique is the size of the data segment doesn't change, however, witness data segment will have its size divided by four instead of keeping its real size in the standard protocol.

