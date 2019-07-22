async function getUnspentTx(address: string) {
    try {
      return $.get('https://chain.so/api/v2/get_tx_unspent/' + APINETWORK + address);
    } catch (error) {
    }
  }