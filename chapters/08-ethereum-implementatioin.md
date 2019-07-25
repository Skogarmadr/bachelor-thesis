# Implementation in Ethereum with Solidity

For this project, we describe a very simple method of constructing the protocol in the Ethereum smart contract. The implementation is spread into three main components (i) a `description of the function lock`, (ii) `description of the function unlock`, (iii) `description of the function refund`. The current implementation is ready for a demonstration, however, for the production, we need to add a coverage test phase for assuring the complete deployment.
This chapter refers to the implementation available on GitLab at \url{https://gitlab.com/Skogarmadr/atomic-swap/tree/master} of the writing of this report. Note that the sources may change or evolve from the last version of the code. So, the last version is updated in the GitLab. 

## Configuration

For constructing the smart contract in Ethereum, we use the high-level language `Solidity`. The version of the solidity required is the **0.5.9**.
We use also a framework to facilitate the building of smart contracts, the compilation and the deployment of them. This framework is the `Truffle Framework` Truffle is a NodeJS module. We use `Ganache` that is a program for emulating an Ethereum local wallet that generates us 10 addresses which each one has a balance of 100 ethers. It is a useful tool for testing our \gls{dapp} quickly because we can incorporate these addresses into our software wallet `Metamask`.

## Deployment

The contract when is fully tested in local can be deployed on a Testnet network to simulate a real use case instead of directly pushing it onto the mainnet. The Testnet used is `Ropsten` but we can also use other testnet.

## Lock Function

\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[Implementation of the function lock] Implementation of the function lock.}, label=lst:lock,language=solidity]{lst/lock.sol}
\end{minipage}

## Unlock function


\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[Implementation of the function unlock] Implementation of the function unlock.}, label=lst:lunlockock,language=solidity]{lst/unlock.sol}
\end{minipage}


## Refund function


\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[Implementation of the function refund] Implementation of the function refund.}, label=lst:refund,language=solidity]{lst/refund.sol}
\end{minipage}


## Interact with the contract

For executing the contract code in our \gls{dapp}, we need to use \gls{web3} Javascript Library. web3.js is a collection of libraries that allow us to interact with a local or remote ethereum node, using an HTTP or IPC connection. The web3 JavaScript library interacts with the Ethereum blockchain. It can retrieve user accounts, send transactions, interact with smart contracts. The library used for the project is Web3x, a port of web3.js to TypeScript with a focus on tiny builds (~150k uncompressed), perfect types and clean modular code. The purpose of using web3x instead of web3 is to simplify the development.
