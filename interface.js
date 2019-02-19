function investETH(trx, callback) {
    myContract.investETH().send({
        callValue: trx
    }).then(result => {
        callback();
    }).catch((err) => {
        console.log(err)
    });
}


function getProfit(callback) {
    myContract.getProfit().send().then(result => {
        callback();
    }).catch((err) => {
        console.log(err)
    });
}


