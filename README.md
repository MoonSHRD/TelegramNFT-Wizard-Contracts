# Telegram NFT Wizard

Smart contracts for Telegram NFT-Wizard bot

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

## Generating ABI
```
solc --abi --bin ./contracts/FactoryNFT.sol -o build ..=.. --overwrite --allow-paths *,/node_modules/,
solc --abi --bin ./contracts/SampleNFT.sol -o build ..=.. --overwrite --allow-paths *,/node_modules/,
solc --abi --bin ./contracts/SingletonNFT.sol -o build ..=.. --overwrite --allow-paths *,/node_modules/,


```


## Generating GO
```
abigen --abi="build/FactoryNFT.abi" --pkg=FactoryNFT --out="./go/FactoryNFT.go"
abigen --abi="build/SingletonNFT.abi" --pkg=SingletonNFT --out="./go/SingletonNFT.go"
```
