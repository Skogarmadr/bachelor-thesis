# Implementation in Bitcoin with TypeScript

For this project, we  describe a very simple method of constructing and executing smart contracts that sacrifice some privacy and potentially some security. The implementation is spread into four main components (i) a `generation of a wallet`, (ii) `how estimate the fees in Bitcoin`, (iii) `implementation of the funding transaction`, (iv) `implementation of the claiming transaction`, and (v) `implementation of the refunding transaction`. Noted that the current
implementation is NOT production ready. This implementation is a more a educational work than an implementation for production and needs to be
reviewed and tested more thoroughly before being used in production.

This chapter refers to the implementation available on GitHub at
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

In this project we use always the same set of addresses, but in production the practice say that the use shouldn't reuse the same addresses. For that, we need a wallet. We decide to create our own wallet to see how a wallet is built from the beginning to the end.

## Getting free Testnet coins

## Reading data from the Testnet blockchain

## Estimate fees

## Funding transaction

## Claiming transaction

## Refunding transaction

## Pushing transaction into the network  