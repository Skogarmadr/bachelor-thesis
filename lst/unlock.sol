function unlock(address _owner, bytes32 _preimage)
        external
        onlyReceiver(_owner)
        busy(_owner)
        hashlockMatches(_owner, _preimage)
        claimable(_owner)
        returns (bool)
    {
        LockContract memory c = ownerToContract[_owner];

        busyAddresses[_owner] = false;

        c.receiver.transfer(c.amount);

        emit FundClaimed(c.receiver, _preimage, c.amount);
        return true;
    }