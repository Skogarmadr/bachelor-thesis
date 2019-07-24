    function lock (address payable _receiver, bytes32 _hashlock, uint _block)
        external
        payable
        noBusy
        minimumFund
        differentReceiver(_receiver)
    {
        ownerToContract[msg.sender] = LockContract(
            msg.sender,
            _receiver,
            msg.value,
            _hashlock,
            block.number + _block
        );

        busyAddresses[msg.sender] = true;

        emit NewLockContract(msg.sender, _receiver, msg.value, _hashlock, block.number + _block);
    }