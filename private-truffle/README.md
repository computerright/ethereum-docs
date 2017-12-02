# private-truffle

How to deploy contracts on a private blockchain using truffle.

## pre-reqs

These instructions assume you have successfully completed the [hello-world](../hello-world) and [private-blockchain](../private-blockchain) tutorials. It doesn't matter if you are connected to other nodes.

## unlock primary account

The primary account is just the first account in geth. Truffle uses this by default unless a specific account is listed in its config (show example). 

If geth is not running cd in to its folder

```bash
$ cd ~/path/to/private-blockchain
```

Start it up with a console and enable rpc (this is how truffle communicates with it)

```bash
$ geth --datadir privatenetwork --networkid 100 console
```

Check if a primary account exists

```bash
> eth.accounts
```

You should see at least one account in the list. The first one is the primary one. If you see an empty list, as shown below, you need to create one.

```bash
> eth.accounts
[]
```

If you need to, create an account using [personal_newAccount](https://github.com/ethereum/go-ethereum/wiki/Management-APIs#personal_newaccount) providing a passphrase when prompted.

```bash
> personal.newAccount()
Passphrase: 
Repeat passphrase: 
"0x2ebc9a285e2d0fe63c4b473993609be8d3a9c67d"
```

Double check you have a primary account

```bash
> eth.accounts
["0x2ebc9a285e2d0fe63c4b473993609be8d3a9c67d"]
```


Make sure the account is unlocked. (An unlocked account can send transactions).

```bash
> personal.unlockAccount("0x2ebc9a285e2d0fe63c4b473993609be8d3a9c67d")
Unlock account 0x2ebc9a285e2d0fe63c4b473993609be8d3a9c67d
Passphrase: 
true
```


Check if the account has any ether (it won't if you just created it).

```bash
> eth.getBalance("0x2ebc9a285e2d0fe63c4b473993609be8d3a9c67d")
0
```

If not, set the address to be the one to receive ether from mining.

```bash
> miner.setEtherbase("0x2ebc9a285e2d0fe63c4b473993609be8d3a9c67d")
 
```
Mine some ether for a while

```bash
> miner.start()
```

```bash
> miner.stop()
```

That's it for setting up the primary account. Leave geth running.

## update truffle config

 Fire up a new terminal window and cd in to hello-world folder

```bash
$ cd ~/path/to/hello-world
```

Use your favourite text editor to update the config to include a XXXXXXXXX section. The secret sauce here is the gasLimit. Not sure why the value of 4600000 works but that's what the interwebs are whispering...
```json
{
  do: "this",
  gasPrice: 4600000
}
```

## lets do this...

```bash
$ compile
```

```bash
$ migrate
```

The hello-world contract should now be deployed on the private blockchain.

## need more info (or just curious)
This shows the actual rpc requests and responces between truffle and geth. There might be an issue running this as it might not stop listing some kind of update. Not sure why though. See this [issue](PUT_ISSUE_URL_HERE).
```bash
$ "migrate verbose-rpc stuff here"
```


## check it works

Back in the geth console search for the address.

```bash
> ""
```

## errol here >>>

- deploying contracts using truffle

  - assumes completion of hello world and private blockchain
  - be in the hello world folder
  - update the truffle config to have the gas limit
  - unlock the account
  - have ether
  - add note about --verbose mode (plus link to error about it)

- how the console works

  - from previous notes

- running javascript from geth cli

  - give example js file
  - give command to run it
  - show result
