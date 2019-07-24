- [HashedTimelockContract](#hashedtimelockcontract)
  - [*function* ownerToContract](#function-ownertocontract)
  - [*function* refund](#function-refund)
  - [*function* busyAddresses](#function-busyaddresses)
  - [*function* unlock](#function-unlock)
  - [*function* lock](#function-lock)
  - [*event* NewLockContract](#event-newlockcontract)
  - [*event* FundClaimed](#event-fundclaimed)
  - [*event* RefundSpent](#event-refundspent)

# HashedTimelockContract

Luca Srdjenovic <luca.srdjenovi@gmail.com> Cross chain Atomic-Swap This contract referring the protocol BIP 199 to exchange Ether for Bitcoin in Ethereum.


## *function* ownerToContract

HashedTimelockContract.ownerToContract() `view` `41b0b808`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |



## *function* refund

HashedTimelockContract.refund() `nonpayable` `590e1ae3`

**For getting the refund, the function must be refundable, timelock > block.number**

> Refund the sender when the timelock is reached.



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* |  | undefined |

## *function* busyAddresses

HashedTimelockContract.busyAddresses() `view` `6e77860d`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |


## *function* unlock

HashedTimelockContract.unlock(_owner, _preimage) `nonpayable` `785fd544`

**For unlocking the contract, the caller must be the receiver and timelock < number.block**

> Unlock the contract with the address of the caller. This function allows to withdraw the balance of the contract by the receiver's address.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _owner | The address of the recipient of the balance. |
| *bytes32* | _preimage | The preimage to unlock. |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* |  | undefined |

## *function* lock

HashedTimelockContract.lock(_receiver, _hashlock, _block) `payable` `a80de0e8`

**Lock `a new LockContract` from the account of `message.caller.address()` with the differents parameters.**

> Create a new LockContract and lock it.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _receiver | The address of the recipient of the Ethers. |
| *bytes32* | _hashlock | The hashlock of the contract. |
| *uint256* | _block | The number to add for the timelock. |

## *event* NewLockContract

HashedTimelockContract.NewLockContract(sender, receiver, amount, hashlock, timelock) `4012c4df`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | sender | indexed |
| *address* | receiver | indexed |
| *uint256* | amount | not indexed |
| *bytes32* | hashlock | not indexed |
| *uint256* | timelock | not indexed |

## *event* FundClaimed

HashedTimelockContract.FundClaimed(receiver, preimage, amount) `d9546f4c`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | receiver | indexed |
| *bytes32* | preimage | not indexed |
| *uint256* | amount | not indexed |

## *event* RefundSpent

HashedTimelockContract.RefundSpent(owner, amount) `6e6abc5f`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | owner | indexed |
| *uint256* | amount | not indexed |


---