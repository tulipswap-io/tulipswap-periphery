# Tulip Router

### Bsc-Test

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

# Oasis Testnet Addresses

Deployer Address: `0xc5e3B9C6E6d79330765d240eb12f3BB7A5215592`
FeeTo Address: `0xc5e3B9C6E6d79330765d240eb12f3BB7A5215592`
TulipFactory Address: `0xca6bd53Ae0c4e288f3826270c32121bF87ab129d`
WOETH Address: `0x7e71246E2e4202695c1CeA33C69B3888290bb1Ae`
TulipRouter02 Address: `0x572076689102994AD273B448129b4725800B6267`

[Oasis ETH (OETH) faucet on MainNet Beta](http://faucet.oasiseth.org/)
[scan.oasiseth.org](http://scan.oasiseth.org/)
