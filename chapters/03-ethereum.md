# Ethereum, A Decentralized Computing Platform

Launched in 2015, Ethereum is a decentralized software platform that enables to the developer to build their own  Smart Contracts and \gls{dapp} and allows to avoid any downtime, fraud, control or interference from a third party. The basis of Ethereum was to made a platform system using Turing-complete programming language running in the blockchain instead of using the script language from Bitcoin.  Developers can create distributed applications and publish them into the blockchain that run on the \gls{evm}. Ethereum work on the system of using accounts and balances in a manner called state transitions and doesn't use the \gls{utxo} from Bitcoin. We can define Ethereum as a programmable blockchain.


## Ether
The currency refereed for making operation and transactions in Ethereum is the `ether`, which is a fundamental token. The smallest unit in Ethereum is the `wei` where $1 \texttt{ wei} = 10^{-18} \texttt{ ethers}$ but it exist a multiple of units. The utility of wei is comes from the representation of the data for the users who use it for paying the gas in transaction and Smart Contract. 

## Gaz and Fees

Gas is a unit that measures the amount of computational effort, more precisely Gaz are used to calculate the amount of fees that need to be paid into the network in order to execute an operation. Ethereum Gas is the mechanism of the Ethereum system, we cannot avoid that. A simple transaction or even Smart Contract that creates operations in the Blockchain cost Gas. The fees allow to prevent to break the system e.g. in introducing infinite loop into the code. The amount of fee to pay is defined by $GasLimit \cdot GasPrice$. The fee has the main of rewarding the miners who mine transaction and then put them into block for securing the blockchain.

`Gas Limit` are the limit because there is an maximum amount of gaz that we agree to spend for a transaction.   This is here for avoiding e.g. if there is an error in the code and produce to overpay accidentally to much amount without our will.

`Gas Price`, is the amount that will increase or decrease the speed of the confirmation of the transaction by the miners in the blockchain. On spending less fees on a transaction, this won't be interesting for the miners, thus your transaction should take more time to be mined. In the opposite, higher is the amount of fees , more the transaction will be mined quickly because it is more attractive for them.


## Account

In Ethereum, it exists two type of account. The Regular Account which represents the owned account and Smart Contract account. An account is often confused with `address` but both terms have the same meaning. A regular account can be controller by an external part of the blockchain (e.g. a user). An account to function need to hold a private key for signing transactions that allows to send ether and the public key that allows to receiver ether.

An account introduce the concept of `Account state` that is defined by :

* **Nonce** : Represent simply the transaction count of an account.
* **Balance** : The ether balance owned by an account
* **Storage Root** :  The storage contents of the account by default empty.
* **Code** :  For contract accounts, this represent the code of the contract account stored.

## Transaction

In Ethereum there are two terms to distinct for defining a transaction, `Transaction` and `Message`. A `transaction` is a piece of data, signed by a regular account. It represents either a Message or a new Autonomous Object. Transactions are stored into each block of the blockchain. That's means that a transaction can be either a message or a new contract. A `message` is a piece of data and an amount of Ether that is transferred between two accounts.  A message is created by contracts interacting with each other, or by a transaction from it. The main difference is that a regular account sends a Transaction and a contract account sends message.

## Ethereum Virtual Machine

\gls{evm} is the heart of Ethereum mechanism. This machine is a Turing complete system provided by Ethereum and capable to execute codes into the Ethereum blockchain with a environment runtime for compiling smart contract and then execute them altering the state of the blockchain. The code of the smart contract is compiled into Bytecode by the EVM compiler for being executed and then managed in  transactions initiated by accounts in the blockchain for integrate the new state. Transactions which have been executed are chained and immutable and represent the system state that is mined and stored on the blockchain. As soon as a new transaction is executed and mined, this produce a transition of a new state.

The EVM is implemented on a stack-based architecture. To compute code on the EVM, the code must be written in low-level stack-based bytecode  language which we can define as an intersection between BitcoinScript and Assembly language. The size of the stack item is 256-bits (32-byte) that is also the size of the word size of the machine that is ordered in set of bytes which information can be stored or operate with the machine. This facilitate  Keccak-256 cryptographic hash scheme and also allows the use of the \gls{ecc} to sign scheme for validating the origin and integrity of transactions. 

Every node runs the EVM in Ethereum networks and can executes all same instructions from other nodes for achieving and maintaining the consensus about the state of the system. The computations are slowly and has a cost but this supplies some advantages like greater data integrity, and censorship-resistance. It's why Ethereum is called a `World Computer`.

## Smart Contract

A contract is a collection of code and data that is possessed by specific address on the Ethereum blockchain. Contract accounts can pass messages between themselves with Turing complete computation.  For living on the blockchain, contract must be implemented in a specific binary format called EVM bytecode. We said smart when conditions of execution are fulfilled , they are automatically executed on the blockchain taking all the specifications, limitations coded into the contract. Smart Contracts are typically written in some high level language like Solidity and then compiled into bytecode to be uploaded on the blockchain.

## Solidity 

Solidity is a language that look like JavaScript which enable the development of contracts and compile them to EVM bytecode format. It is the most popular and the easiest language to learn from the Ethereum Community and developed by Ethereum foundation. Solidity use huge number of programming perceptions that are implemented in other languages. Solidity supports the high typing, variables, string manipulations, classes, functions, arithmetic inheritance, complex structure user, library and a lot of others features. Solidity was influenced by C++, Python, or JavaScript.

We use the features like `Modifier` or `Mapping` of the languages for implementing the contracts in this project. In the following chapters we show few  examples of using different features that Solidity offers us but we cannot explain all unfortunately.

### Structs

Solidity provides a way to define new types in the form of structs. A struct in solidity is just a custom type. A struct is defined with a name and associated properties inside as variables. Implementation of a struct is shown in the following listing \ref{struct}:

\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[Example of a struct type] Example of a struct type Voter which has several variables inside.}, label=lst:struct,language=solidity]{lst/struct.sol}
\end{minipage}


### Mapping
In Solidity, a mapping are represented as such hash tables which consists of having  a key type  and a value type pairs.The following listing \ref{struct} define how a mapping look like :

\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[Example of a mapping] Creation of a mapping, which accepts first the key type an address, and the value type will be uint, the mapping is referenced as `balances` for the name.}, label=lst:mapping,language=solidity]{lst/mapping.sol}
\end{minipage}

### Modifier

Function modifiers are a special function which can't be called directly but allows to modify a behavior or automatically check a condition prior to executing the function. The modifiers is always called before the call of the function itself. 

\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[Example of a modifier] Implementation of modifier that checks if the user has a minimum of Ether to send.}, label=lst:modifier,language=solidity]{lst/modifier.sol}
\end{minipage}

### Globally variables

Solidity provides us a list of special globally variable and function that we can use. One of them is the variable `msg` and `block` we describe below :

* **block.blockhash** : hash of the given block - only works for 256 most recent blocks excluding current
* **block.number** : current block number
* **msg.sender** : sender address the message currently call
* **msg.value** : uint containing the number of wei sent with the message


### Require

`Require` is a function of control allowing to verify a condition. If the condition is false, require will call the REVERT
EVM opcode which stops the execution of the transaction. The advantage of this function is when the condition are not fulfilled, it doesn't consume all of the gas and revert the state changes.The character `_` is used in modifiers. It returns the flow of execution to the original function that is annotated.


### Event

Events are dispatched signals that the smart contracts can execute. \gls{dapp} connected to Ethereum JSON-RPC API, can listen to these events and receipt them taking data inside. The advantage of the events is they can be indexed, so that means the event history is searchable later.
