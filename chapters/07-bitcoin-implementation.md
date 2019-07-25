# Implementation in Bitcoin with bitcoinjs-lib

For this project, we describe a very simple method of constructing and executing bitcoin smart contracts that sacrifice some privacy and potentially some security. The implementation is spread into five main components (i) a `generation of a wallet`, (ii) `how estimate the fees in Bitcoin`, (iii) `implementation of the funding transaction`, (iv) `implementation of the claiming transaction`, and (v) `implementation of the refunding transaction`. Note that the current
implementation is not ready for production. This implementation is more an educational work than an implementation for production and needs to be reviewed and tested more deeply before being used in production.

This chapter refers to the implementation available on GitLab at \url{https://gitlab.com/Skogarmadr/atomic-swap/tree/master} of the writing of this report. Note that the sources may change or evolve from the last version of the code. So, the last version is updated in the GitLab. 

## Configuration

The project employs NodeJS with modern Typescript, for the simplicity of use and the installation of dependance modules. The library used is `bitcoinjs-lib` to manage all parts of Bitcoin. The incentive of this library is, (i) compatible with Typescript, (ii) still active, (iii) has a large number of contributors and releases and (iv) has a folder full of clear examples. The project employs NodeJS with modern Javascript, for the simplicity of use and the installation of dependance modules. The library used is `bitcoinjs-lib` to manage all parts of Bitcoin. The incentive of this library is, (i) compatible with Typescript, (ii) still active, (iii) has a large number of contributors and releases and (iv) has a folder full of clear examples.

There is `config.json` file that contents all the data needed for the environment works (i.e. Alice and Bob entropy for getting back the key pair). It is important to note this config file in production must be saved only on the client-side because it is private data. Note also that the project works with the `Tesnet Network` because he is still in development and not testing for the mainnet Network.

\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[Example of a config file for Bitcoin] Example of a config file for Bitcoin.},label=lst:configbtc,language=Json]{lst/config.test.json}
\end{minipage}


## Generation of an HD wallet

In this project, we use always the same set of addresses, but in production, the practice says that the user shouldn't reuse the same addresses. For that, we need a wallet. We decide to create our wallet to see how a wallet is built from the beginning to the end. To do anything with Bitcoin, you need a private and a public key pair. The public key can be used by other people to send you Bitcoin, and the private key can be used by you to send Bitcoin to someone else by verifying who created the transaction.

We generate our mnemonic and with this we create two different BIP32  \gls{hd} wallets for Alice and Bob, each containing one distinct \gls{ecdsa} key pairs. From each public key is derived one set of Bitcoin address for each type of \gls{pkh} output. The code for generating an HD wallet is in Listing \ref{generatewallet}

\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[Generation of a HD wallet] Generation of a HD wallet.},label=lst:generatewallet,language=Javascript]{lst/generate_wallet.js}
\end{minipage}

\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[Example of a wallet] Example of a wallet.},label=lst:wallets,language=Json]{lst/btcWallets.json}
\end{minipage}

In the Listing \ref{lst:wallets}, \gls{wif} is the version of the compressed private key. With that, we can get our \gls{ec} key pair. With the key pair, we can derivate all data that we need (e.g. the address of each person).


## Get free Testnet bitcoins

For making new transactions, we need bitcoin. Testnet Network is a useful tool that offers Testnet Bitcoin, a valueless coin for testing our application without spending any money. For that, we need to get theses free Testnet Bitcoins. We use `faucet` to get theses bitcoin Testnet, they can be hard to found sometimes. The one we use is [https://tbtc.bitaps.com/](https://tbtc.bitaps.com/) for the two reasons: (i) it gives us 0.01 Bitcoin every 5 minutes and (ii) it is compatible with the \gls{segwit} addresses.


## Get data from the Testnet blockchain

To read data from a public blockchain, we use a block explorer that is a third-party REST API instead of running our node in local and explore it ourselves. Here, for this project, we use [(https://chain.so/api](https://chain.so/api) because they have a solid API, an excellent documentation site, and you don’t need an API key. This allows us to get e.g. the \gls{gls-utxo} for having got the balance of an address.d

\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[Get Unspent Transactions Output from REST API] Get Unspent Transactions Output from API.},label=lst:getUxto,language=javascript]{lst/getUtxos.ts}
\end{minipage}


## Estimate fees

For building a valid transaction, there is an important part to not forget in Bitcoin transaction: the fee. The fee is important because if you set it too low then the transaction won’t be attractive to miners and might take a long time to appear in the blockchain or it might even never get accepted. This is not such a problem on the Network Testnet because there is less traffic, but that can be a big issue for the Bitcoin main network. We set the fee with a REST API that supplies a list of fee recommended per byte of transaction data. We use always the fastest fee rates because we don't need to be precious with the satoshis of Testnet Bitcoin. We need only test it and we don't want to wait one day for our transactions must be accepted. In production, the fee rate will depend on the need of the user, if he wants his transactions must be confirmed quickly or slowly.

\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[Get the estimation of fee amount] Get the estimation of fee amount.},label=lst:getFees,language=javascript]{lst/getFees.ts}
\end{minipage}

To calculate the fee, we base us on the SegWit size of a transaction. We compute the number of `inputs` minimum equal to 1 and his `outputs` maximum equal to 2, more precisely if the sender has a rest. For the receiver, the size of the transaction is simpler, the HTLC has only 1 input and 1 output.

## Funding transaction

For creating a funding transaction we base us on the Bitcoin Script from the protocol \ref{swaplock} in the chapter \ref{protocol}. First, we need to construct a `csvCheckSigOutput` for the building of our `P2SH` Script. Here, we use SegWit transaction, thus we will create instead a `P2WSH`. In a P2WSH context, a redeem script is called a witness script.

\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[csvCheckSigOutput function] csvCheckSigOutput function that returns the redeemScript.},label=lst:csvCheckSigOutput,language=javascript]{lst/csvCheckSigOutput.ts}
\end{minipage}

We need to initiate and create the witness script for the P2WSH address that will be the HTLC address with the parameters required.

\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[Initialization of the P2WSH address] Initialization of the P2WSH address.},label=lst:btcfundinginit,language=javascript]{lst/btcfundinginit.ts}
\end{minipage}

Now we must start building the transaction that will send bitcoins into the P2WSH address. We must add the unspent output as input from the sender address. Then we add outputs sending the desired amount to the receiver address, and the change back to our address. We calculate how much change there is by subtracting the amount we’re sending and the fee that we have estimated from the unspent amount. Then we need to sign that input using the key pair of the sender.

\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[Creation of the funding transaction] Creation of the funding transaction.}, label=lst:btcfunding,language=javascript]{lst/btcfunding.ts}
\end{minipage}

## Claiming transaction

Once funds are sent to the P2SH addresses, we can spend them using the unlocking input scripts. We have already generated the witness script so we just need to get it and to create a transaction with it and sign it. First, we must prepare a transaction with the input and output. We generate the hash that will be used to produce the signatures. Then we will add the Witness Stack.  For running the claiming branch of the script we must end the unlocking script by the boolean value `TRUE`.

\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[Preparation of the transaction to claim the funds] Preparation of the transaction to claim the funds.}, label=lst:btcclaim,language=javascript]{lst/btcclaim.ts}
\end{minipage}

## Refunding transaction

For having a valid refunding transaction, the timelock must be reached. To start, initialize the unlocking script with the witness script from the swaplock. Then we must prepare a transaction with the input and output and the timelock used (nSequence).

\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[Preparation of the transaction to spend refund] Preparation of the transaction to spend refund.}, label=lst:btcrefund,language=javascript]{lst/btcrefund.ts}
\end{minipage}


## Broadcast a transaction into the network  

Once a transaction is built, we can get her in the `Hexadecimal form` (the only way to push a transaction). But this transaction for the moment is only known by us, we need to share it into the network for the miners confirm it and include it into a block. With the block explorer `chain.so`, its REST API offers us a POST request to push a transaction in the Testnet. See listing \ref{lst:broadcast}.

\begin{minipage}{\linewidth}\centering
\lstinputlisting[caption={[Function to broadcast a raw transaction] Function to broadcast a raw transaction.}, label=lst:broadcast,language=javascript]{lst/broadcast.ts}
\end{minipage}