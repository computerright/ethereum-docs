# geth-console

Some information that helps explain how the geth console works. Maybe helpful for those not familiar with js consoles in general.

Geth uses a JavaScript Runtime Environment called [jsre](https://github.com/ethereum/go-ethereum/blob/master/internal/jsre/jsre.go) in order to process javascript commands. It needs to do this when a ‘console’ is created either by starting geth with the 'console' or 'attach' flag.
 
Internally jsre uses a javascript interpreter, written in go, called [otto](https://github.com/robertkrimen/otto) which actually ‘runs’ the javascript.
 
Geth [imports](https://github.com/ethereum/go-ethereum/blob/master/console/console.go) the existing javascript file web3.js which encompasses the ‘net’, ‘eth’, ‘db’ and ‘shh’ apis.

Geth also [extends](https://github.com/ethereum/go-ethereum/blob/master/internal/web3ext/web3ext.go) the web3.js apis with ‘admin’, ‘chequebook’, ‘clique’, ‘debug’, ‘miner’, ‘personal’, ‘rpc’, ‘swarmfs’ and ’txpool’. These are not all loaded by default though.

## Running javascript in the console.

Because the console is essentially just a javascript interpreter with some pre-loaded modules it is possible to 'just run javascript' in it. This includes running javascript loaded from a file.

An example javascript file called *getAllBalances.js* has been added to [../geth-console/code]() which will list all accounts and their current balances in ether.

It can be executed from the console like this:

Start geth with a console (this is starting geth on our private-blockchain network '100')

```bash
$ geth --datadir privatenetwork --networkid 100 console
```

Load the javascript from file

```bash
> loadScript('../geth-console/code/checkAllBalances.js')
```

You will only see a true/false response.

```bash
> true
```

Now run the function
```bash
> checkAllBalances()
```

And see something similar to this:
```bash
Checking balances...
0x24e02201a9c1a64b3fe9e0ce4a73e4fec0d93f5a:	balance: 485 ether
undefined
```

# In hindsight...

The reason for writing this was that I couldn't quite understand how the commands available in the go console related to those in the web3js module. There seemed to be extras in the go console yet the ones that were similar were VERY similar to the ones in web3js.

If I had looked at what the console actually printed out when it starts up I may have had more of a clue as it states it is a javascript console and even lists the modules that are loaded.

```bash
Welcome to the Geth JavaScript console!

instance: Geth/v1.7.3-stable/darwin-amd64/go1.9.2
coinbase: 0x24e02201a9c1a64b3fe9e0ce4a73e4fec0d93f5a
at block: 97 (Sat, 02 Dec 2017 21:39:18 GMT)
 datadir: /Users/errolc/code/ethereum-docs/private-blockchain/privatenetwork
 modules: admin:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0
```

