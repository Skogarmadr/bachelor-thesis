# Atomic Swap, A Method of Exchanging Different Cryptocurrencies

**Definition** : `Atomic Swap is the process of peer-to-peer exchange of two cryptocurrencies between two parties, without using any third-party service like a crypto exchange.`

In a few explications, an atomic cross-chain swap is a smart contract distributed where two parties or more exchange two cryptocurrencies across different blockchains. It is called cross-chain because you are no longer dependant on the blockchain. An atomic swap protocol guarantees if both parties follow the protocol, then all swaps take place. But if one of the two parties deviates from the protocol, then no conforming party and the no coalition produce automatically the cancel of the swap. At any moment, no one can control both coins, hence no coalition has an incentive to deviate from the protocol.

## Atomicity

`Atom` comes from Greek and means 'a' -not/un, 'tom' -cut, in another word, no divisible or cuttable. It means that atomic transactions cannot be splittable into parts. We use the familiar expression `all or nothing` in atomic where it is the same applied concept in bitcoin. For example, Alice pays Bob in one transaction, they all know that either Bob will be paid or either bob won't. There are only two ways, the transaction is confirmed or not but there is no way for having an half-confirmation. That's the reason why the atomicity is fundamental in an atomic swap, to protect both parties, there must be no scenario in which one part can control both coins at the same time.

Another example, no atomic transaction for illustrating is when Alice wants to buy something in a web store. First, she needs to transfer the money to the site and then wait for the store to send her the object back. Here there always is a chance that Alice doesn't get her purchase.

## Difference with Payment Channels

In Bitcoin, Payment Channel is a class of techniques designed to allow users to make multiple Bitcoin transactions without committing all of the transactions to the Bitcoin blockchain. In a typical payment channel, only two transactions are added to the blockchain but an unlimited or nearly unlimited number of payments can be made between the participants\footnotemark. It is faster, cheaper transactions between parties because each transaction doesn’t need to be written to the blockchain. Therefore there is only the net result of multiple transactions.

An atomic swap is not a payment channel but uses tools of it like \gls{htlc}, a technique that can allow payments to be securely routed across multiple payment channels that we describe below (see chapter \ref{security-by-hashed-timelock-contracts}).  It is a concept from the Bitcoin community that is used in the Lightning Network.


\footnotetext{Micropayment channel: \href{https://bitcoin.org/en/contracts-guide\#micropayment-channel}{Bitcoin.org Developer Guide}}

## Security by Hashed Timelock Contracts

Atomic swaps use HTLC (Hashed Timelock Contracts), which are part of the scripting language used by most major cryptocurrencies in existence right now. Both parties involved in a cross-chain transaction submit their transactions to the appropriate blockchain.

\gls{htlc} is a kind of smart contracts that allows eliminating counterparty risk using tools like hash lock and timelock. It enables time-bound transactions between the two parties. A time-bound means when a recipient at the other end of the transaction is required to acknowledge the transaction, the person needs to provide cryptographic proof. The person also needs to provide that cryptographic proof within a time-frame. In case of failing so will automatically make the transaction null and void. In practical terms, this means that recipients of a transaction have to acknowledge payment by generating cryptographic proof within a certain timestamp. Otherwise, the transaction isn't valid. The cryptographic proof of payment that the receiver generates can then be used to trigger other actions in other payments, making \gls{htlc} a powerful technique for producing conditional payments in Bitcoin. 

There are many benefits for HTLC :

1. It prevents the person who is making the payment from having to wait indefinitely to find out whether or not his or her payment goes through. 
2. The person who makes the payment will not have to waste his or her money if the payment is not accepted. It will simply be returned.
3. The recipient helps to validate the payment on the blockchain because cryptographic proof of payment is required for the recipient to accept the payment.
4. The hashes that are created for the HTLC can be easily added to blockchains.
5. The structure of the method allows the people sending and receiving the payments do not have to trust each other or even know each other to make sure that the contract will be executed properly. In other words, each party is protected from counterparty risk.


To work, A Hashed Timelock Contract implements several elements from existing cryptocurrency transactions. The concept of signatures, HTLC uses multiple signatures that consist of using a private key and public key to verify and validate transactions. The main elements that make HTLC a powerful method are the concept of `hash lock` and `timelock`.


### Hashlock

A hashlock is a type of encumbrance that restricts the spending of an output until a specified piece of data is publicly revealed. Hashlocks have the useful property that once any hashlock is opened publicly, any other hashlock secured using the same key can also be opened. The hashlock is a scrambled version of a cryptographic key generated by the originator of a transaction.

### Absolute Timelock

\begin{minipage}{\linewidth}\centering
\begin{lstlisting}[caption={[Example of locking script with CheckSequenceVerify]Example of locking script with CheckLockTimeVerify.},label=lst:cltv]
IF
    <provider pubkey> CHECKSIGVERIFY
ELSE
    <expiry time> CHECKLOCKTIMEVERIFY DROP
ENDIF
<client pubkey> CHECKSIG
\end{lstlisting}
\end{minipage}

### Relative Timelock

The second one is CheckSequenceVerify (CSV). It is not dependent on time. Instead, it uses the number of blocks generated as a measure to keep track of when to finalize a transaction.

\begin{minipage}{\linewidth}\centering
\begin{lstlisting}[caption={[Example of locking script with CheckSequenceVerify]Example of locking script with CheckSequenceVerify.},label=lst:csv]
IF
    <provider pubkey> CHECKSIGVERIFY
ELSE
    <expiry time> CHECKSEQUENCEVERIFY DROP
ENDIF
<client pubkey> CHECKSIG
\end{lstlisting}
\end{minipage}
