const sdk = require("@defillama/sdk");
const {usdCompoundExports} = require('../helper/compound');
const { transformBscAddress } = require("../helper/portedTokens.js");

const BANANA_TOKEN = '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95'
const unitroller_bsc = "0xad48b2c9dc6709a560018c678e918253a65df86e"


const abis = {
  oracle: {"constant":true,"inputs":[],"name":"getRegistry","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},
  underlyingPrice: {"constant":true,"inputs":[{"internalType":"address","name":"cToken","type":"address"}],"name":"getPriceForUnderling","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
}

const lendingMarket = usdCompoundExports(unitroller_bsc, "bsc", "0x34878F6a484005AA90E7188a546Ea9E52b538F6f", abis)


module.exports = {
  timetravel: true,
  doublecounted: false,
  misrepresentedTokens: true,
  bsc:{
    tvl: lendingMarket.tvl,
    borrowed: lendingMarket.borrowed
  },
  methodology: "Counts the tokens locked in the contracts to be used as collateral to borrow or to earn yield. Borrowed coins are not counted towards the TVL, so only the coins actually locked in the contracts are counted. There's multiple reasons behind this but one of the main ones is to avoid inflating the TVL through cycled lending.. TVL is calculated by getting the market addresses from comptroller and calling the getCash() on-chain method to get the amount of tokens locked in each of these addresses, then we get the price of each token from coingecko. To view the Borrowed amounts along with the currently liquidity, click the 'Borrowed' check box",
}