# Atomic Swap, A Method of Exchanging Different Cryptocurrencies

**Definition** : `Atomic Swap is the process of peer-to-peer exchange of two cryptocurrencies between two parties, without using any third-party service like a crypto exchange.`

In a few explications, an atomic cross-chain swap is a smart contract distributed where two parties or more exchange two cryptocurrencies across different blockchains. It is called cross-chain because you are no longer dependant on the blockchain. An atomic swap protocol guarantees if both parties follow the protocol, then all swaps take place. But if one of the two parties deviates from the protocol, then no conforming party and the no coalition produce automatically the cancel of the swap. At any moment, no one can control both coins, hence no coalition has an incentive to deviate from the protocol.

## Atomicity

`Atom` comes from Greek and means 'a' -not/un, 'tom' -cut, in another word, no divisible or cuttable. It means that atomic transactions cannot be splittable into parts. We use the familiar expression `all or nothing` in atomic where it is the same applied concept in bitcoin. For example, Alice pays Bob in one transaction, they all know that either Bob will be paid or either bob won't. There are only two ways, the transaction is confirmed or not but there is no way for having an half-confirmation. That's the reason why the atomicity is fundamental in an atomic swap, to protect both parties, there must be no scenario in which one part can control both coins at the same time.

Another example, no atomic transaction for illustrating is when Alice wants to buy something in a web store. First, she needs to transfer the money to the site and then wait for the store to send her the object back. Here there always is a chance that Alice doesn't get her purchase.

## Difference with Payment Channels

In Bitcoin, Payment Channel is a class of techniques designed to allow users to make multiple Bitcoin transactions without committing all of the transactions to the Bitcoin blockchain. In a typical payment channel, only two transactions are added to the blockchain but an unlimited or nearly unlimited number of payments can be made between the participants\footnotemark. Actual transaction speeds on a blockchain like Bitcoin or Ethereum does not allow to perform instantaneous or fast transactions. Typically, a transaction can take up to several dozen minutes until it is included in a block. Payments channels are one way to address this issue by allowing participants of a channel to perform transactions off-chain which are performed faster, without compromising on the safety properties of cryptocurrencies. To recap, it is faster cheaper transaction between two parties because each transaction doesn’t need to be written to the blockchain.

An atomic swap is not a payment channel, however atomic swap implement the same off-chain system from payments channel and its tools of it as such \gls{htlc}, a technique that can allow payments to be securely routed across multiple payment channels that we describe below (see chapter \ref{security-by-hashed-timelock-contracts}).  It is a concept from the Bitcoin community that is used in the Lightning Network.


\footnotetext{Micropayment channel: \href{https://bitcoin.org/en/contracts-guide\#micropayment-channel}{Bitcoin.org Developer Guide}}

## Security by Hashed Timelock Contracts

\gls{htlc} is a kind of smart contracts that allows eliminating counterparty risk using tools like hashlock and timelock. It enables time-bound transactions between the two parties. A time-bound means when a recipient at the other end of the transaction is required to acknowledge the transaction, the person needs to provide cryptographic proof. This cryptographic proof  is required until a specific deadline. When the exchanges mights fail, that automatically makes the transaction null and void. In practical terms, this means that recipients of a transaction have to acknowledge payment by generating cryptographic proof within a certain timestamp. Otherwise, the transaction isn't valid. The cryptographic proof of payment that the receiver generates can then be used to trigger other actions in other payments, making \gls{htlc} a powerful technique for producing transactions puzzle.

There are many benefits for HTLC :

1. It prevents the person who is making the payment from having to wait indefinitely to find out whether or not his or her payment is confirmed. 
2. The person who makes the payment will not to be worried about losing his or her money if the payment is not accepted. It will simply be returned.
3. The recipient helps to validate the payment on the blockchain because cryptographic proof of payment is required for the recipient to accept the payment.
4. The hashes that are created for the HTLC can be easily added to blockchains.
5. Each party is protected from counterparty risk. This means that the structure of the method allows the people sending and receiving the payments do not have to trust each other or even know each other to make sure that the contract will be executed properly.

To work, A Hashed Timelock Contract implements several elements from existing cryptocurrency transactions. The concept of signatures, HTLC uses multiple signatures that consist of using a private key and public key to verify and validate transactions. The main elements that make HTLC a powerful method are the concept of `hash lock` and `timelock`.


### Hashlock

A hashlock is a type of primitive that restricts the spending of an output until a specified piece of data is publicly revealed. When a person reveal the hashlock, he allows to any other hashlock secured using the same key can to be open. The hashlock is a hash version of a cryptographic value generated by the originator of a transaction.

### Locktime

A Timelock is a type of smart contract primitive that restricts the spending of some bitcoins until a specified future time or block height. Timelocks are implemented in many Bitcoin smart contracts, payment channels and hashed timelock contracts.

#### Absolute Timelock

The locktime will be set in an absolute way. It can be interpreted as two ways. First way, it is defined by block height or by the time, which will be` Unix Epoch timestamp`. If it is interpreted as a block height, it will be recorded as at block e.g. number 455488. If it is interpreted as the time, it will be set as 1564003242 secondes which means e.g. 07/24/2019 @ 9:20pm (UTC). Relative timelock is represented by  an absolute UTXO-level timelock and has been was added to Bitcoin by the \gls{bip} 65. CLTV included a `nLocktime` is implemented in the Bitcoin’s script are defined in the Bitcoin’s script as `OP_CHECKLOCKTIMEVERIFY` (see the listing \ref{lst:cltv}).

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

#### Relative Timelock

The relative timelock are similar to absolute timelock and can also be presented by either block height or by the time. For example, if we want set a timelock to 1 day, this values is corresponds to 144 blocks in Bitcoin for being achieved. If it is interpreted as the time, it will be set as after 86400 seconds. The relative timelock includes the Check Sequence Verify (CSV) and a nSequence based on the specification \gls{bip} 68. It shows up in the Bitcoin script as the opcode `OP_CHECKSEQUENCEVERIFY` (see the listing \ref{lst:csv}).

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

