async function broadcastTx(txHex: string) {
    try {
        $.post('https://chain.so/api/v2/send_tx/' + APINETWORK, "tx_hex=" + txHex).done(() => {
            swal.fire("Transaction bitcoin broadcasted")
        });
    } catch (error) {
        console.log(error);
    }
}