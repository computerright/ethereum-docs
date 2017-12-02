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
$ geth --datadir privatenetwork --network 100 console
```

Check if a primary account exists

```bash
> eth.accounts
```

You should see at least one account in the list. The first one is the primary one.

```bash
> [""]
```

Otherwise create an account

```bash
> [""]
```

Make sure the account is unlocked.

```bash
> [""] 
```

Make sure the account has some ether.

```bash
> [""] 
```

Otherwise mine some for a bit

```bash
> [""] 
```

```bash
> [""] 
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
