 function refund() external onlySender busy(msg.sender) refundable returns (bool) {
        LockContract memory c = ownerToContract[msg.sender];

        busyAddresses[msg.sender] = false;
        c.sender.transfer(c.amount);

        emit RefundSpent(c.sender, c.amount);

        return true;
    }