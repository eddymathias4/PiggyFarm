var modal
var modalContent
var lastNumEggs = -1
var lastNumCrocs = -1
var lastSecondsUntilFull = 100
lastHatchTime = 0

var lastUpdate = new Date().getTime()

var tron;
var scatter;
var myContract;
var contractAddress = "TNRb6eYEx9oZKRZakqy6eBpmaUf8NwHsz6";

function main() {
    // console.log('test')
    modal = document.getElementById('myModal');
    modalContent = document.getElementById('modal-internal')
    setTimeout(waitForTronWeb, 500);
}

async function waitForTronWeb() {
    if (typeof(window.tronWeb) === 'undefined') {
        // console.log('Waiting for tron...');
        // setTimeout(waitForTronWeb, 1000);

        // Lets try scatter
        ScatterJS.plugins( new ScatterTron() );
        const network = ScatterJS.Network.fromJson({
            blockchain:'trx',
            host:'api.trongrid.io',
            port:443,
            protocol:'https',
            chainId:'1' // <-- this is the MAINNET
        });

        const httpProvider = new TronWeb.providers.HttpProvider(network.fullhost());
        tron = new TronWeb(httpProvider, httpProvider, network.fullhost());
        tron.setDefaultBlock('latest');
        myContract = await tron.contract().at(contractAddress);


        // Let's try connecting to Scatter first to make sure the user has Scatter installed.
        // https://get-scatter.com/docs/setting-up-for-web-apps
        ScatterJS.scatter.connect('trxanthill.farm').then(async (connected) => {
            if(!connected){
                // Either the user doesn't have Scatter, or it's closed.
                console.error('Could not connect to Scatter or TronLink.');
                setTimeout(waitForTronWeb, 1000);
                return;
            }

            // If we are connected, let's make a reference to the Scatter object now.
            scatter = ScatterJS.scatter;
            console.log(scatter);

            scatter.getIdentity({ accounts:[network] }).then(async (id) => {
                if(!id) return false;
                console.log(id);
                // Since we have a user with Scatter we're going to overwrite the tronweb instance
                // with one that can sign transactions with Scatter.
                tron = scatter.trx(network, tron);

                // YOU MUST ALSO RESET THE CONTRACT REFERENCE NOW!
                myContract = await tron.contract().at(contractAddress);

                setTimeout(function() {
                    controlLoop()
                    controlLoopFaster()
                }, 1000);

            }).catch(e => console.log(e))

            window.ScatterJS = null;
        })

    } else {
        tron = tronWeb;
        // If we have tronlink installed go here
        myContract = await tron.contract().at(contractAddress);
        setTimeout(function() {
            controlLoop()
            controlLoopFaster()
        }, 1000);
    }
}


function controlLoop() {
    refreshData()
    setTimeout(controlLoop, 2500)
}

function controlLoopFaster() {
    liveUpdateEggs()
    // console.log('clf')
    setTimeout(controlLoopFaster, 30)
}

function refreshData() {
    var sellsforexampledoc = document.getElementById('sellsforexample')
    marketEggs(function(eggs) {
        eggs = eggs / 10
        calculateEggSell(eggs, function(sun) {
            devFee(sun, function(fee) {
                console.log('examplesellprice ', sun)
                sellsforexampledoc.textContent = '(' + formatEggs(eggs) + ' eggs would sell for ' + formatTrxValue(tron.fromSun(sun)) + ')'
            });
        });
    });
    lastHatch(tron.defaultAddress['base58'], function(lh) {
        lastHatchTime = lh
    });
    EGGS_TO_HATCH_1CROCS(function(eggs) {
        eggstohatch1 = eggs
    });
    getMyEggs(function(eggs) {
        if (lastNumEggs != eggs) {
            lastNumEggs = eggs
            lastUpdate = new Date().getTime()
            updateEggNumber(eggs/eggstohatch1)

        }
        var timeuntilfulldoc = document.getElementById('timeuntilfull')
        secondsuntilfull = eggstohatch1 - eggs / lastNumCrocs
        console.log('secondsuntilfull ', secondsuntilfull, eggstohatch1, eggs, lastNumCrocs)
        lastSecondsUntilFull = secondsuntilfull
        timeuntilfulldoc.textContent = secondsToString(secondsuntilfull)
        if (lastNumCrocs == 0) {
            timeuntilfulldoc.textContent = '?'
        }
    });
    getMyCrocs(function(crocs) {
        lastNumCrocs = crocs
        var gfsdoc = document.getElementById('getfreecrocs')
        if (crocs > 0) {
            gfsdoc.style.display = "none"
        } else {
            gfsdoc.style.display = "inline-block"
        }
        var allnumcrocs = document.getElementsByClassName('numcrocs')
        for (var i = 0; i < allnumcrocs.length; i++) {
            if (allnumcrocs[i]) {
                allnumcrocs[i].textContent = translateQuantity(crocs, 0)
            }
        }
        var productiondoc = document.getElementById('production')
        productiondoc.textContent = formatEggs(lastNumCrocs * 60 * 60)
    });
    updateBuyPrice()
    updateSellPrice()
    var prldoc = document.getElementById('playerreflink')
    prldoc.textContent = window.location.origin + "?ref=" + tron.defaultAddress['base58']
    var copyText = document.getElementById("copytextthing");
    copyText.value = prldoc.textContent
}

function updateEggNumber(eggs) {
    var hatchcrocsquantitydoc = document.getElementById('hatchcrocsquantity')
    hatchcrocsquantitydoc.textContent = translateQuantity(eggs, 0)
    var allnumeggs = document.getElementsByClassName('numeggs')
    for (var i = 0; i < allnumeggs.length; i++) {
        if (allnumeggs[i]) {
            allnumeggs[i].textContent = translateQuantity(eggs)
        }
    }
}

function hatchEggs1() {
    ref = getQueryVariable('ref')
    if (!tron.isAddress(ref)) {
          ref = tron.defaultAddress['base58']
    }
    console.log('hatcheggs ref ', ref)
    hatchEggs(ref, displayTransactionMessage())
}

function liveUpdateEggs() {
    if (lastSecondsUntilFull > 1 && lastNumEggs >= 0 && lastNumCrocs > 0 && eggstohatch1 > 0) {
        currentTime = new Date().getTime()
        if (currentTime / 1000 - lastHatchTime > eggstohatch1) {
            return;
        }
        difference = (currentTime - lastUpdate) / 1000
        additionalEggs = Math.floor(difference * lastNumCrocs)
        updateEggNumber((lastNumEggs + additionalEggs)/eggstohatch1)
    }
}

function updateSellPrice() {
    var eggstoselldoc = document.getElementById('sellprice')
    //eggstoselldoc.textContent='?'
    getMyEggs(function(eggs) {
        calculateEggSell(eggs, function(sun) {
            devFee(sun, function(fee) {
                console.log('sellprice ', sun)
                eggstoselldoc.textContent =  formatTrxValue(tron.fromSun(sun - fee))
            });
        });
    });
}

function updateBuyPrice() {
    var eggstobuydoc = document.getElementById('eggstobuy')
    //eggstobuydoc.textContent='?'
    var trxtospenddoc = document.getElementById('ethtospend')
    suntospend = tron.toSun(trxtospenddoc.value)
    calculateEggBuySimple(suntospend, function(eggs) {
        devFee(eggs, function(fee) {
            eggstobuydoc.textContent = formatEggs(eggs - fee)
        });
    });
}

function investETH() {
    var trxspenddoc = document.getElementById('ethtospend')
    suntospend = tron.toSun(trxspenddoc.value)
    investETH(suntospend, function() {
        displayTransactionMessage();
    });
}

function formatEggs(eggs) {
    return translateQuantity(eggs / eggstohatch1)
}

function translateQuantity(quantity, precision) {
    quantity = Number(quantity)
    finalquantity = quantity
    modifier = ''

    //console.log('??quantity ',typeof quantity)
    if (quantity > 1000000) {
        modifier = 'M'
        finalquantity = quantity / 1000000
    }
    if (quantity > 1000000000) {
        modifier = 'B'
        finalquantity = quantity / 1000000000
    }
    if (quantity > 1000000000000) {
        modifier = 'T'
        finalquantity = quantity / 1000000000000
    }
    if (precision == undefined) {
        precision = 0
        if (finalquantity < 10000) {
            precision = 1
        }
        if (finalquantity < 1000) {
            precision = 2
        }
        if (finalquantity < 100) {
            precision = 3
        }
        if (finalquantity < 10) {
            precision = 4
        }
    }
    if (precision == 0) {
        finalquantity = Math.floor(finalquantity)
    }
    return finalquantity.toFixed(precision) + modifier;
}

function removeModal2() {
    $('#adModal').modal('toggle');
}


function removeModal() {
    modalContent.innerHTML = ""
    modal.style.display = "none";
}

function displayTransactionMessage() {
    displayModalMessage("Transaction Submitted")
}

function displayModalMessage(message) {
    modal.style.display = "block";
    modalContent.textContent = message;
    setTimeout(removeModal, 3000)
}

function weiToDisplay(trxprice) {
    return formatTrxValue(tron.toSun(trxprice))
}

function formatTrxValue(trxstr) {
    return parseFloat(parseFloat(trxstr).toFixed(5));
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

function copyRef() {
    var copyText = document.getElementById("copytextthing");
    copyText.style.display = "block"
    copyText.select();
    document.execCommand("Copy");
    copyText.style.display = "none"
    displayModalMessage("copied link to clipboard")
    //alert("Copied the text: " + copyText.value);
}
function secondsToString(seconds) {
    seconds = Math.max(seconds, 0)
    var numdays = Math.floor(seconds / 86400);

    var numhours = Math.floor((seconds % 86400) / 3600);

    var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);

    var numseconds = ((seconds % 86400) % 3600) % 60;
    var endstr = ""

    return numhours + "h " + numminutes + "m " //+numseconds+"s";
}


function disableButtons() {
    var allnumanthill = document.getElementsByClassName('btn-lg')
    for (var i = 0; i < allnumanthill.length; i++) {
        if (allnumanthill[i]) {
            allnumanthill[i].style.display = "none"
        }
    }
    var allnumanthill = document.getElementsByClassName('btn-md')
    for (var i = 0; i < allnumanthill.length; i++) {
        if (allnumanthill[i]) {
            allnumanthill[i].style.display = "none"
        }
    }
}

function enableButtons() {
    var allnumanthill = document.getElementsByClassName('btn-lg')
    for (var i = 0; i < allnumanthill.length; i++) {
        if (allnumanthill[i]) {
            allnumanthill[i].style.display = "inline-block"
        }
    }
    var allnumanthill = document.getElementsByClassName('btn-md')
    for (var i = 0; i < allnumanthill.length; i++) {
        if (allnumanthill[i]) {
            allnumanthill[i].style.display = "inline-block"
        }
    }
}

function onlyLetters(text) {
    return text.replace(/[^0-9a-zA-Z\s\.!?,]/gi, '')
}

function checkOnlyLetters(str) {
    var pattern = new RegExp('^[0-9a-zA-Z\s\.!?,]*$')
    if (!pattern.test(str)) {
        return false;
    } else {
        return true;
    }
}

function onlyurl(str) {
    return str.replace(/[^0-9a-zA-Z\.?&\/\+#=\-_:]/gi, '')
}

function validurlsimple(str) {
    var pattern = new RegExp('^[a-z0-9\.?&\/\+#=\-_:]*$')
    if (!pattern.test(str)) {
        return false;
    } else {
        return true;
    }
}

function ValidURL(str) {
    var pattern = new RegExp('^(https?:\/\/)?' + // protocol
        '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|' + // domain name
        '((\d{1,3}\.){3}\d{1,3}))' + // OR ip (v4) address
        '(\:\d+)?(\/[-a-z\d%_.~+]*)*' + // port and path
        '(\?[;&a-z\d%_.~+=-]*)?' + // query string
        '(\#[-a-z\d_]*)?$', 'i'); // fragment locater
    if (!pattern.test(str)) {
        alert("Please enter a valid URL.");
        return false;
    } else {
        return true;
    }
}

function callbackClosure(i, callback) {
    return function() {
        return callback(i);
    }
}
