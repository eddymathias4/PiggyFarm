abi = [{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAffiliateCommision","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"affiliateCommision","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getProfitFromSender","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"referral","type":"address"}],"name":"investETH","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"lastInvest","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getInvested","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"customer","type":"address"}],"name":"getProfit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"investedETH","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"reinvestProfit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAffiliateCommision","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
contractAddress = 'TNRb6eYEx9oZKRZakqy6eBpmaUf8NwHsz6';

function investETH(_0xc09ex2) {
    eth = document['getElementById']('investAmount')['value'] * 1000000000000000000;
    var _0xc09ex3 = web3['eth']['contract'](abi);
    var _0xc09ex4 = _0xc09ex3['at'](contractAddress);
    var _0xc09ex5 = _0xc09ex4['investETH']['getData'](getCookie('ref'));
    var _0xc09ex6 = web3['eth']['sendTransaction']({
        to: contractAddress,
        from: null,
        data: _0xc09ex5,
        value: eth
    }, function(_0xc09ex7, _0xc09ex8) {
        if (!_0xc09ex7) {
            console['log']('investETH ', eth);
            _0xc09ex2()
        } else {
            console['log']('error :(')
        }
    })
}

function reinvestProfit(_0xc09ex2) {
    var _0xc09ex3 = web3['eth']['contract'](abi);
    var _0xc09ex4 = _0xc09ex3['at'](contractAddress);
    var _0xc09ex5 = _0xc09ex4['reinvestProfit']['getData']();
    var _0xc09ex6 = web3['eth']['sendTransaction']({
        to: contractAddress,
        from: null,
        data: _0xc09ex5
    }, function(_0xc09ex7, _0xc09ex8) {
        if (!_0xc09ex7) {
            _0xc09ex2()
        } else {
            console['log']('error :(')
        }
    })
}

function getInvested(_0xc09ex2) {
    var _0xc09ex3 = web3['eth']['contract'](abi);
    var _0xc09ex4 = _0xc09ex3['at'](contractAddress);
    var _0xc09ex5 = _0xc09ex4['getInvested']['getData']();
    var _0xc09ex6 = web3['eth']['call']({
        to: contractAddress,
        from: null,
        data: _0xc09ex5
    }, function(_0xc09ex7, _0xc09ex8) {
        if (!_0xc09ex7) {
            _0xc09ex2(web3['toDecimal'](_0xc09ex8))
        } else {
            console['log']('error :(')
        }
    })
}

function getAffiliateCommision(_0xc09ex2) {
    var _0xc09ex3 = web3['eth']['contract'](abi);
    var _0xc09ex4 = _0xc09ex3['at'](contractAddress);
    var _0xc09ex5 = _0xc09ex4['getAffiliateCommision']['getData']();
    var _0xc09ex6 = web3['eth']['call']({
        to: contractAddress,
        from: null,
        data: _0xc09ex5
    }, function(_0xc09ex7, _0xc09ex8) {
        if (!_0xc09ex7) {
            _0xc09ex2(web3['toDecimal'](_0xc09ex8))
        } else {
            console['log']('error :(')
        }
    })
}

function withdrawAffiliateCommision(_0xc09ex2) {
    var _0xc09ex3 = web3['eth']['contract'](abi);
    var _0xc09ex4 = _0xc09ex3['at'](contractAddress);
    var _0xc09ex5 = _0xc09ex4['withdrawAffiliateCommision']['getData']();
    var _0xc09ex6 = web3['eth']['sendTransaction']({
        to: contractAddress,
        from: null,
        data: _0xc09ex5
    }, function(_0xc09ex7, _0xc09ex8) {
        if (!_0xc09ex7) {
            _0xc09ex2()
        } else {
            console['log']('error :(')
        }
    })
}

function getMyProfit(_0xc09ex2) {
    var _0xc09ex3 = web3['eth']['contract'](abi);
    var _0xc09ex4 = _0xc09ex3['at'](contractAddress);
    var _0xc09ex5 = _0xc09ex4['getProfitFromSender']['getData']();
    var _0xc09ex6 = web3['eth']['call']({
        to: contractAddress,
        from: null,
        data: _0xc09ex5
    }, function(_0xc09ex7, _0xc09ex8) {
        if (!_0xc09ex7) {
            _0xc09ex2(web3['toDecimal'](_0xc09ex8))
        } else {
            console['log']('error :(')
        }
    })
}

function withdrawProfit(_0xc09ex2) {
    var _0xc09ex3 = web3['eth']['contract'](abi);
    var _0xc09ex4 = _0xc09ex3['at'](contractAddress);
    var _0xc09ex5 = _0xc09ex4['withdraw']['getData']();
    var _0xc09ex6 = web3['eth']['sendTransaction']({
        to: contractAddress,
        from: null,
        data: _0xc09ex5
    }, function(_0xc09ex7, _0xc09ex8) {
        if (!_0xc09ex7) {
            console['log']('withdraw ');
            _0xc09ex2()
        } else {
            console['log']('error :(')
        }
    })
}

function devFee(_0xc09ex10, _0xc09ex2) {
    var _0xc09ex3 = web3['eth']['contract'](abi);
    var _0xc09ex4 = _0xc09ex3['at'](contractAddress);
    var _0xc09ex5 = _0xc09ex4['devFee']['getData'](_0xc09ex10);
    var _0xc09ex6 = web3['eth']['call']({
        to: contractAddress,
        from: null,
        data: _0xc09ex5
    }, function(_0xc09ex7, _0xc09ex8) {
        if (!_0xc09ex7) {
            console['log']('devFee ', web3['toDecimal'](_0xc09ex8));
            _0xc09ex2(web3['toDecimal'](_0xc09ex8))
        } else {
            console['log']('error :(')
        }
    })
}

function getBalance(_0xc09ex2) {
    var _0xc09ex3 = web3['eth']['contract'](abi);
    var _0xc09ex4 = _0xc09ex3['at'](contractAddress);
    var _0xc09ex5 = _0xc09ex4['getBalance']['getData']();
    var _0xc09ex6 = web3['eth']['call']({
        to: contractAddress,
        from: null,
        data: _0xc09ex5
    }, function(_0xc09ex7, _0xc09ex8) {
        if (!_0xc09ex7) {
            console['log']('getBalance ', web3['toDecimal'](_0xc09ex8));
            _0xc09ex2(web3['toDecimal'](_0xc09ex8))
        } else {
            console['log']('error :(')
        }
    })
}