# Blockchain TD on ERC20

&copy; Maxence Raballand 2021

The migration automatically validates the exercices.

There is one deployement for local network (ganache) in `1_td_deploy.js` and one for test network (rinkeby) in `2_rinkeby_deploy.js`.

To test it locally, first you will need to install truffle globally :

```bash
yarn add global truffle
# or
npm i -g truffle
```

Then you should install dependencies as such :

```bash
yarn
# or
npm i
```

Then create a `.env` file containing your infura api key and mnemonic.

```
INFURA_API_KEY=<you-api-key>
MNEMONIC=<your-mnemonic>
```

You can then deploy by running :

```bash
# locally with ganache
truffle migrate
# on rinkeby
truffle migrate --network rinkeby --skip-dry-run
```

## Informations about the Exercices

Here are the adresses of the contracts and wallet used to validate these exercices.

| Name | Address |
| --- | --- |
| My Solution contract | [0x0410f4DE799eB92fc01B2605dFC94594476A4652](https://rinkeby.etherscan.io/address/0x0410f4DE799eB92fc01B2605dFC94594476A4652) |
| ERC20 Solution contract | [0xb5d82FEE98d62cb7Bc76eabAd5879fa4b29fFE94](https://rinkeby.etherscan.io/address/0xb5d82FEE98d62cb7Bc76eabAd5879fa4b29fFE94) |
| My address | [0x3Ab484E75884b42AD86BE388D04b7B3208a5c6cD](https://rinkeby.etherscan.io/address/0x3Ab484E75884b42AD86BE388D04b7B3208a5c6cD) |
| Claimable ERC20 | [0xb5d82FEE98d62cb7Bc76eabAd5879fa4b29fFE94](https://rinkeby.etherscan.io/address/0xb5d82FEE98d62cb7Bc76eabAd5879fa4b29fFE94) |
| Evaluator | [0x384C00Ff43Ed5376F2d7ee814677a15f3e330705](https://rinkeby.etherscan.io/address/0x384C00Ff43Ed5376F2d7ee814677a15f3e330705) |
| ERC20TD | [0x77dAe18835b08A75490619DF90a3Fa5f4120bB2E](https://rinkeby.etherscan.io/address/0x77dAe18835b08A75490619DF90a3Fa5f4120bB2E) |
