# Cryptography

In this chapter, we explain all the security-based only in the two cryptocurrencies used for the atomic-swap, Bitcoin and Ethereum. We explain what type of function they use in a general way instead of going into the details. We will see also how to create Bitcoin and Ethereum addresses to understand their incentives that they provide.

Bitcoin, Ethereum and many other cryptocurrencies are based on cryptography. Cryptography is a branch of mathematics used mainly in computer security. It allows to digital currencies the use of digital keys, addresses, and digital signatures. Most people think that a wallet contains the cryptocurrencies. This information is false, a wallet is a database containing the digitals keys only. The keys allow ownership attestation and the cryptographic-proof security model.

`Digitals signatures` are used to spends the funds from transactions. Most of the cryptocurrency transactions need a valid digital signature to be added into the blockchain. The digital signature can be generated only by the way of a secret called the private key. Anyone who has a copy of this private key can control the coins.

We talk also about digital `fingerprints` called more commonly addresses corresponding to the public key of the recipient. An address can be represented in real life like a bank account where the private key is the code to access the account. This address is generated from and target to a public key and the public key is generated from the private key. Addresses are defined as the destination of the transaction, more precisely the recipient of the funds.

The main cryptographic functions used by Bitcoin and Ethereum are \gls{ecc} and cryptographic hash function all described below :

#### Elliptic Curve Cryptographic :

Elliptic curve cryptography is a function that implements an approach of public-key cryptography based on the discrete logarithm problem from the algebraic structure of \gls{ec}. It is expressed by the addition and multiplication on the points of a \gls{ec} function. It exists multiples kind of Elliptic Curve, but Bitcoin and Ethereum are based on the same, `secp256k1`.

#### Cryptographic Hash Function :

A cryptographic hash function is a `one-way` hash function that takes an input data of any size and returns an output of a fixed size. The input to a hash function is called a `pre-image` or `message`. The output from the hash function is called the `hash value` or `digest`. The hash function is used to produce a `fingerprint`. Bitcoin and Ethereum don't use the same hash functions. Bitcoin uses `SHA-2` known by `SHA256` and Ethereum `SHA-3` also known by `Keccak-256`.

## Private and Public Key

As we have seen in the chapter above, each cryptocurrency works with a wallet using a pair of keys that consists of a private key and a public key. The private key that we called $k$ is a number randomly generated between $1$ and $2^{256}$. With the private key, we can get the public key using \gls{ecc} which generates $K$, the public key. With the public key $K$, we can generate the address $A$ by using a cryptographic hash function.

These functions have the advantages that it is easy to do in one direction but impossible in the inversed direction. To recap (see figure \ref{fig:keypairs}), It is impossible with the address to reverse the hash functions and calculate the public key and from the public key, no one can reverse the \gls{ecc} function and calculate the private key. These mathematical functions are the mechanism of the secure digital signatures that prove ownership of funds.

\input{fig/keypairs}


## Generation of a Bitcoin address

A bitcoin address looks like `1J7mdg5rbQyUHENYdx39WVWK7fsLpEoXZy`. It is a string of digits and characters that are shared for anyone who wants to send money. An address is the recipient funds. It is derivated from the public key using the cryptographic hash function that produces a fingerprint or "hash". Starting with the public key $K$ derivated from private key $k$, we compute the hash function $\mathcal{H}_\textit{160}(K)$, which consists of a `SHA256` hash and then compute the `RIPEMD160` hash of the result, producing a 160-bit (20-byte) number. This algorithm is also called `Double Hashed` or `HASH160`. Then Bitcoin address is encoded as `Base58Check`. `Base58Check` is used for better human readability and for avoiding ambiguity. It protects against errors in address transcription and entry. The process is illustrated in the equation below :

\begin{equation}
\begin{split}
    k& : \text{the private key} ; \text{ where } k \in [1, 2^{256}] \\
    K& : \text{the public key} ; \text{ where } K = k \cdot G \\
    h& : \text{the hash value of K} ; \text{ where } h = \mathcal{H}_\textit{160}(K) \\
    A& : \text{the address} ; \text{ where } A = Base58Check(h) \\
\end{split}
\end{equation}

## Generation of an Ethereum address

An ethereum address looks like `0x95FCA54fDA1bA3c2aF5BA54F3ec250B8Fe3Ae697`. Generate an Ethereum address is simpler than generate a Bitcoin address that we have described above. Instead of computing the algorithm `HASH160` and then make a `Base58Check`, we compute only the algorithm `Keccak-256` to calculate the hash of the public key. Starting with the public key $K$ derivated from private key $k$, we compute the the hash function $Keccak(K)$ Then we take only the last 20 bytes (least significant bytes)making our Ethereum address: The process is illustrated in the equation below :
\begin{equation}
\begin{split}
    k& : \text{the private key} ; \text{ where } k \in [1, 2^{256}] \\
    K& : \text{the public key} ; \text{ where } K = k \cdot G \\
    h& : \text{the hash value} ; \text{ where } h = Keccak256(K) \\
    A& : \text{the Address} ; \text{ where } A \text{ is the last 20 bytes } \in h \\
\end{split}
\end{equation}

