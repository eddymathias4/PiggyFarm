function buyEggs(trx, callback) {
    myContract.buyEggs().send({
        callValue: trx
    }).then(result => {
        callback();
    }).catch((err) => {
        console.log(err)
    });
}


function getFreeDragon(callback) {
    myContract.getFreeDragon().send().then(result => {
        callback();
    }).catch((err) => {
        console.log(err)
    });
}


function hatchEggs(ref, callback) {
    myContract.hatchEggs(ref).send().then(result => {
        callback();
    });
}


function sellEggs(callback) {
    myContract.sellEggs().send().then(result => {
        callback();
    }).catch((err) => {
        console.log(err)
    });
}


function calculateEggBuy(trx, contractBalance, callback) {
    myContract.calculateEggBuy(trx, contractBalance).call().then(result => {
        callback(tron.toDecimal(result));
    }).catch((err) => {
        console.log(err)
    });
}


function calculateEggBuySimple(trx, callback) {
  myContract.calculateEggBuySimple(trx).call().then(result => {
      callback(tron.toDecimal(result));
  }).catch((err) => {
      console.log(err)
  });
}


function calculateEggSell(eggs, callback) {
    myContract.calculateEggSell(eggs).call().then(result => {
        callback(tron.toDecimal(result));
    }).catch((err) => {
        console.log(err)
    });
}

function claimedEggs(callback) {
    myContract.claimedEggs().call().then(result => {
        callback(tron.toDecimal(result));
    }).catch((err) => {
        console.log(err)
    });
}


function EGGS_TO_HATCH_1Dragon(callback) {
    myContract.EGGS_TO_HATCH_1Dragon().call().then(result => {
        callback(tron.toDecimal(result));
    }).catch((err) => {
        console.log(err)
    });
}

function devFee(amount, callback) {
    myContract.devFee(amount).call().then(result => {
        callback(tron.toDecimal(result));
    }).catch((err) => {
        console.log(err)
    });
}

function getBalance(callback) {
    myContract.getBalance().call().then(result => {
        callback(tron.toDecimal(result));
    }).catch((err) => {
        console.log(err)
    });
}

function getEggsSinceLastHatch(address, callback) {
    myContract.getEggsSinceLastHatch(address).call().then(result => {
        callback(tron.toDecimal(result));
    }).catch((err) => {
        console.log(err)
    });
}


function getMyEggs(callback) {
    myContract.getMyEggs().call().then(result => {
        callback(tron.toDecimal(result));
    }).catch((err) => {
        console.log(err)
    });
}


function getMyDragon(callback) {
    myContract.getMyDragon().call().then(result => {
        if (result == '0x') {
            result = 0;
        }
        callback(tron.toDecimal(result));
    }).catch((err) => {
        console.log(err)
    });
}


function lastHatch(address, callback) {
    myContract.lastHatch(address).call().then(result => {
        console.log(result);
        console.log(tron);
        callback(tron.toDecimal(result));
    }).catch((err) => {
        console.log(err)
    });
}


function marketEggs(callback) {
    myContract.marketEggs().call().then(result => {
        console.log(result)
        console.log(tron.toDecimal(result))
        callback(tron.toDecimal(result));
    }).catch((err) => {
        console.log(err)
    });
}
