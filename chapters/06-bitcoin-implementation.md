# Implementation in Bitcoin with TypeScript

For this project, we  describe a very simple method of constructing and executing smart contracts that sacrifice some privacy and potentially some security. The implementation is spread into five main components (i) a `generation of a wallet`, (ii) `how estimate the fees in Bitcoin`, (iii) `implementation of the funding transaction`, (iv) `implementation of the claiming transaction`, and (v) `implementation of the refunding transaction`. Noted that the current
implementation is NOT production ready. This implementation is a more a educational work than an implementation for production and needs to be
reviewed and tested more thoroughly before being used in production.

This chapter refers to the implementation available on GitLab at
\url{https://gitlab.com/Skogarmadr/atomic-swap/tree/master} at the time of
writing. The sources may evolve after writing this report, to be sure to read
the latest version of the code check out the sources directly on GitHub.

## Configuration

The project employ NodeJS with modern Javascript, for the simplicity of use with the installation of dependance modules. The library used  is  `bitcoinjs-lib` to manage all parts of Bitcoin. The incentive of this library are, (i) compatible with Typescript, (ii) still active, (iii) has a large number of contributors and releases and (iv) has a folder full of clear examples.

There is `config.json` file that contents all the data needed for the environnement works (i.e. Alice and Bob entropy for getting back the key pair). It is important to note that in production must saved only in client side because it is private data. Note also that the project work with the `Tesnet Network` because he is still in development and not testing for the production.

\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[Example of a config file for Bitcoin] Example of a config file for Bitcoin.},label=lst:configbtc,language=Json]{lst/config.test.json}
\end{minipage}


## Generation of a wallet

In this project we use always the same set of addresses, but in production the practice says that the user shouldn't reuse the same addresses. For that, we need a wallet. We decide to create our own wallet to see how a wallet is built from the beginning to the end. In order to do anything with Bitcoin, you need a private and a public key pair. The public key can be used by other people to send you Bitcoin, and the private key can be used by you to send Bitcoin to someone else by verifying who created the transaction.

We generate our own mnemonic and with this we create two different BIP32  \gls{hd} wallets for Alice and Bob, each containing one distinct \gls{ecdsa} key pairs. From each public key is derived one set of Bitcoin address for each type of \gls{pkh} output.

\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[Generation of a HD wallet] Generation of a HD wallet.},label=lst:generatewallet,language=Javascript]{lst/generate_wallet.js}
\end{minipage}

\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[Example of a wallet] Example of a wallet.},label=lst:wallets,language=Json]{lst/btcWallets.json}
\end{minipage}

In the Listing \ref{lst:wallets}, \gls{wif} is the version of the compressed private key. With that, we can get our \gls{ec} key pair. With the key pair, we can derivate all data that we need (e.g. the address of each person).


## Getting free Testnet coins

For making new transactions, we need bitcoin. Testnet Network is useful tool that offers Testnet Bitcoin, a valueless coin for testing our application without spend any money. For that, we need to get theses free Testnet Bitcoins. We use `faucet` to get theses bitcoin Testnet, they can be hard to found sometimes. The one we use is [https://tbtc.bitaps.com/](https://tbtc.bitaps.com/) for the two reasons: (i) it give us 0.01 Bitcoin every 5 minutes and (ii) it is compatible with the \gls{segwit} addresses.


## Reading data from the Testnet blockchain

To read data from a public blockchain, we use a block explorer that is a third-party REST API instead of running our own node in local and explore it ourself. Here, for this project we use [(https://chain.so/api](https://chain.so/api) because they have a solid API, a excellent documentation site, and you don’t need an API key. This allows us to get e.g. the \gls{gls-utxo} for having got the balance of an address.d

\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[Get Unspent Transactions Output from REST API] Get Unspent Transactions Output from API.},label=lst:getUxto,language=javascript]{lst/getUtxos.ts}
\end{minipage}


## Estimate fees

For building a valid transaction, there is an important part to not forget in Bitcoin transaction : the fee. The fee is important because if you set it too low then the transaction won’t be attractive to miners, and might take a long time to appear in the blockchain or it might even never get accepted. This is not such a problem on the Testnet where there isn’t so much traffic, but is a big issue for the Bitcoin main network. We set the fee with a REST API that supplies a list of fee recommended per byte of transaction data. We use always the fastest fee rates because we don't need to be precious with the satoshis of Testnet Bitcoin but we need include them for the practice.


We can practise setting a sensible fee using 21.co’s recommended fees.

You can also choose halfHourFee or hourFee, but (a) this is the testnet so we don’t need to be precious with satoshis, and (b) these are the recommended fees for the main network anyway, so entirely unrelated to the Testnet. We’re just including them here for practice.

The result from 21.co tells you the fee recommended per byte of transaction data. I’m multiplying by the median transaction size (again for the main net, not the Testnet) for convenience, but if you were creating large transactions you’d probably want to work out how large your actual transaction is so that the recommended fees perform as expected.

## Funding transaction

## Claiming transaction

## Refunding transaction

## Pushing transaction into the network  