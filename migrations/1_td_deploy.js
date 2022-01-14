var TDErc20 = artifacts.require("ERC20TD.sol");
var ERC20Claimable = artifacts.require("ERC20Claimable.sol");
var evaluator = artifacts.require("Evaluator.sol");
const exerciceSolution = artifacts.require("ExerciceSolution.sol");
const ERC20Solution = artifacts.require("ERC20Solution.sol");


const account = "0x3Ab484E75884b42AD86BE388D04b7B3208a5c6cD"

module.exports = (deployer, network, accounts) => {
    if(network == 'rinkeby') return
	deployer.then(async () => {
        await deployTDToken(deployer, network, accounts); 
        await deployEvaluator(deployer, network, accounts); 
        await setPermissionsAndRandomValues(deployer, network, accounts);
        await deployRecap(deployer, network, accounts);
		await makeExercise(deployer, network, accounts);
    });
};

async function deployTDToken(deployer, network, accounts) {
	TDToken = await TDErc20.new("TD-ERC20-101","TD-ERC20-101",web3.utils.toBN("20000000000000000000000000000"))
	ClaimableToken = await ERC20Claimable.new("ClaimableToken","CLTK",web3.utils.toBN("20000000000000000000000000000"))
}

async function deployEvaluator(deployer, network, accounts) {
	Evaluator = await evaluator.new(TDToken.address, ClaimableToken.address)
}

async function setPermissionsAndRandomValues(deployer, network, accounts) {
	await TDToken.setTeacher(Evaluator.address, true)
}

async function deploySolution(deployer, network, accounts) {
	SolutionERC20 = await ERC20Solution.new("ERC20", "ERC20", 1000000)
	Solution = await exerciceSolution.new(ClaimableToken.address, SolutionERC20.address, {from:account})
	await SolutionERC20.setMinter(Solution.address, true, {from:account})
}

async function deployRecap(deployer, network, accounts) {
	console.log("TDToken " + TDToken.address)
	console.log("ClaimableToken " + ClaimableToken.address)
	console.log("Evaluator " + Evaluator.address)
	// console.log("Solution " + Solution.address)
}

async function makeExercise(deployer, network, accounts) {
	const startBalance = await TDToken.balanceOf(accounts[0])
	console.log("startBalance " + startBalance)

	// let send = await web3.eth.sendTransaction({from:accounts[0],to:Evaluator.address, value:web3.utils.toBN(web3.utils.toWei('0.05', "ether"))});

	await deploySolution(deployer, network, accounts)
	console.log("Solution " + Solution.address)

	// Submit Exercise
	console.log("====== Submit Exercise ======")
	await Evaluator.submitExercice(Solution.address , {from:account})
	const submit_balance = await TDToken.balanceOf(account)
	console.log("submit_balance " + submit_balance)

	// Exercice 1
	console.log("====== Exercice 1 ======")
	await ClaimableToken.claimTokens({from: account})
	await Evaluator.ex1_claimedPoints({from: account})
	const ex1_balance = await TDToken.balanceOf(account)
	console.log("ex1_balance " + ex1_balance)

	// Exercice 2
	console.log("====== Exercice 2 ======")
	await Evaluator.ex2_claimedFromContract({from:account})
	const ex2_balance = await TDToken.balanceOf(account)
	console.log("ex2_balance " + ex2_balance)

	// Exercice 3
	console.log("====== Exercice 3 ======")
	await Evaluator.ex3_withdrawFromContract({from:account})
	const ex3_balance = await TDToken.balanceOf(account)
	console.log("ex3_balance " + ex3_balance)

	// Exercice 4
	console.log("====== Exercice 4 ======")
	await ClaimableToken.approve(Solution.address, 100, {from:account})
	await Evaluator.ex4_approvedExerciceSolution({from:account})
	const ex4_balance = await TDToken.balanceOf(account)
	console.log("ex4_balance " + ex4_balance)

	// Exercice 5
	console.log("====== Exercice 5 ======")
	await ClaimableToken.approve(Solution.address, 0, {from: account})
	await Evaluator.ex5_revokedExerciceSolution({from:account})
	const ex5_balance = await TDToken.balanceOf(account)
	console.log("ex5_balance " + ex5_balance)

	// Exercice 6
	console.log("====== Exercice 6 ======")
	await Evaluator.ex6_depositTokens({from:account})
	const ex6_balance = await TDToken.balanceOf(account)
	console.log("ex6_balance " + ex6_balance)

	// Exercice 7
	console.log("====== Exercice 7 ======")
	await Evaluator.ex7_createERC20({from:account})
	const ex7_balance = await TDToken.balanceOf(account)
	console.log("ex7_balance " + ex7_balance)

	// Exercice 8
	console.log("====== Exercice 8 ======")
	await Evaluator.ex8_depositAndMint({from:account})
	const ex8_balance = await TDToken.balanceOf(account)
	console.log("ex8_balance " + ex8_balance)

	// Exercice 9
	console.log("====== Exercice 9 ======")
	await Evaluator.ex9_withdrawAndBurn({from:account})
	const ex9_balance = await TDToken.balanceOf(account)
	console.log("ex9_balance " + ex9_balance)
}