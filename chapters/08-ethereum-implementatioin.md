# Implementation in Ethereum with Solidity

For this project, we describe a straightforward method of constructing the protocol in the Ethereum smart contract. The implementation is spread into three main components (i) a `description of the function lock,` (ii) `description of the function unlock,` (iii) `description of the function refund.` The current implementation is ready for a demonstration; however, for the production, we need to add a coverage test phase for assuring the complete deployment.
This chapter refers to the implementation available on GitLab at \url{https://gitlab.com/Skogarmadr/atomic-swap/tree/master} of the writing of this report. Note that the sources may change or evolve from the last version of the code. So, the last version is updated in the GitLab. 

## Configuration

For constructing the smart contract in Ethereum, we use the high-level language `Solidity.` The version of the solidity required is the **0.5.9**.
We also use a framework to facilitate the building of smart contracts, the compilation, and the deployment of them. This framework is the `Truffle Framework` Truffle is a NodeJS module. We use `Ganache` that is a program for emulating an Ethereum local wallet that generates us 10 addresses which each one has a balance of 100 ethers. It is a useful tool for testing our \gls{dapp} quickly because we can incorporate these addresses into our software wallet `Metamask.`

## Deployment

The contract when is thoroughly tested in local can be deployed on a Testnet network to simulate a real use case instead of directly pushing it onto the mainnet. The Testnet used is `Ropsten` but we can also use other testnet.

## Lock Function

\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[Implementation of the function lock] Implementation of the function lock.}, label=lst:lock,language=solidity]{lst/lock.sol}
\end{minipage}

The listing \ref{lst:lock} describes how is implemented the function for locking `lock` funds into the smart contract.
First, we need parameters for validating data. We use the type `bytes32` for the hashlock instead of using a string. This is because bytes take fewer bytes than the variable string at the compilation. Thus that allows saving fees. For being allowed to execute this function, we need to verify if the sender is not busy, which means that he hasn't already a contract swap in progress. He needs to send funds otherwise the function revert. Moreover, the receiver cannot be the sender; therefore, we need to verify the addresses. When all these restrictions are verified, we can create a new `LockContract` and the address of the sender to true saying he can't call this function unless his swap is claim or refund.

## Unlock function


\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[Implementation of the function unlock] Implementation of the function unlock.}, label=lst:unlock,language=solidity]{lst/unlock.sol}
\end{minipage}

The listing \ref{lst:unlock} describes how is implemented the function `lock`  for unlocking the smart contract and claim the funds. Only the receiver of the contract can call this function for the security of the program. We need to check if the contract exists before. Then we check if the function can be claimable. For that, we check the value is equal to the hashlock, and the timelock is not reached. When all these conditions are fulfilled, the funds are transferred to the receiver of the LockContract. So we free the owner of the contract. A new swap can start again.

## Refund function

\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[Implementation of the function refund] Implementation of the function refund.}, label=lst:refund,language=solidity]{lst/refund.sol}
\end{minipage}

The listing \ref{lst:refund} describes how is implemented the function `refund` for spending the funds of the smart contract and get the funds back. Only the owner of the contract can call this function for the security reason. We need to check if the contract exists before. Then we check if the function can be refundable. For that, we check if the timelock is reached. When all these conditions are fulfilled, the funds are transferred to the receiver of the LockContract. So we free the owner of the contract. A new swap can start again.



## Interact with the contract

For executing the contract code in our \gls{dapp}, we need to use \gls{web3} Javascript Library. web3.js is a collection of libraries that allow us to interact with a local or remote ethereum node, using an HTTP or IPC connection. The web3 JavaScript library interacts with the Ethereum blockchain. It can retrieve user accounts, send transactions, interact with smart contracts. The library used for the project is Web3x, a port of web3.js to TypeScript with a focus on tiny builds (~150k uncompressed), perfect types and clean, modular code. The purpose of using web3x instead of web3 is to simplify the development.
