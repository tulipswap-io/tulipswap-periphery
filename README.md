# Tulip Router

### Oasis Testing

The following assumes the use of `node@>=10`.

## Install Dependencies

`yarn`

## Compile Contracts

`yarn compile`

## Run Tests

`yarn test`

# Deployment

To deploy the Router02 contract to a network, rename `installation_data_example.json`
to `installation_data.json` and fill it's values with the required data.

The code below shows how the contract should look. The `tulip_factory` should already be deployed and it's address is needed here.

`woeth` and `tulip_router_02` will be filled in automatically when the deployer is run.

```
{
  "private_key": {
    "alice": "YOUR_PRIVATE_KEY_HERE"
  },
  "public_key": {
    "alice": "YOUR_PUBLIC_KEY_HERE"
  },
  "contract_address": {
    "tulip_factory": "FACTORY_ADDRESS_HERE"
    "woeth": "",
    "tulip_router_02": ""
  },
  "provider": {
    "rpc_endpoint": "https://rpc.oasiseth.org:8545"
  }
}
```

Once all the required values are filled in run the command `node deployer.js`
this will deploy your Router02 and WOETH contracts and fill in the addresses they were deployed at in the `tulip_router_02` and `woeth` keys.

# Oasis Paratime Addresses

Deployer Address: `0xC02656186C435D960E719d7D53ECF92b3ecdCB87`
FeeTo Address: `0xC02656186C435D960E719d7D53ECF92b3ecdCB87`
TulipFactory Address: `0xD2749DB505d3C35CC004F018A503AA24b5087144`
WOETH Address: `0xC088AeA3EBd1e30F3F39FC9B0d2B67FabC59506A`
TulipRouter02 Address: `0xdF38DA2918F5f0C8bbd138c697a8fAE2e3D645af`

[Oasis ETH (OETH) faucet on MainNet Beta](http://faucet.oasiseth.org/)
[scan.oasiseth.org](http://scan.oasiseth.org/)
