function checkAllBalances() { 
    console.log('Checking balances...'); 
        web3.eth.getAccounts(function(err, accounts) { 
        if(err) return console.log(err); 
        accounts.forEach(function(id) { 
            web3.eth.getBalance(id, function(err, balance) { 
                if(err) return console.log(err); 
                console.log("" + id + ":\tbalance: " + web3.fromWei(balance, "ether") + " ether"); 
            }); 
        }); 
    }); 
};