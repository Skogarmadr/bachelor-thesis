modifier minimumFund() {
        require(msg.value > 0, "No founds sent !");
        _;
}