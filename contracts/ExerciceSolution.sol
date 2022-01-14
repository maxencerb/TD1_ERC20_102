pragma solidity ^0.6.0;

import "./ERC20Claimable.sol";
import "./ERC20Solution.sol";

contract ExerciceSolution {

    ERC20Claimable claimableERC20;
    ERC20Solution solutionERC20;
    mapping(address => uint256) custody;

    constructor (ERC20Claimable _claimableToken, ERC20Solution _solutionERC20) public {
        claimableERC20 = _claimableToken;
        solutionERC20 = _solutionERC20;
    }

    function claimTokensOnBehalf() external {
        claimableERC20.claimTokens();
        uint256 amount = claimableERC20.distributedAmount();
        custody[msg.sender] += amount;
        solutionERC20.mint(msg.sender, amount);
    }

	function tokensInCustody(address callerAddress) external returns (uint256){
        return custody[callerAddress];
    }

	function withdrawTokens(uint256 amountToWithdraw) external returns (uint256) {
        require(custody[msg.sender] >= amountToWithdraw, "Not enough tokens in custody");
        require(amountToWithdraw > 0, "Amount to withdraw must be greater than 0");
        uint256 balance = claimableERC20.balanceOf(address(this));
        require(balance >= amountToWithdraw, "Not enough tokens in contract");
        claimableERC20.transfer(msg.sender, amountToWithdraw);
        custody[msg.sender] -= amountToWithdraw;
        solutionERC20.burn(msg.sender, amountToWithdraw);
        return amountToWithdraw;
    }

	function depositTokens(uint256 amountToWithdraw) external returns (uint256){
        require(amountToWithdraw > 0, "Amount to deposit must be greater than 0");
        uint256 allowance = claimableERC20.allowance(msg.sender, address(this));
        require(allowance >= amountToWithdraw, "Not enough allowance");
        claimableERC20.transferFrom(msg.sender, address(this), amountToWithdraw);
        custody[msg.sender] += amountToWithdraw;
        solutionERC20.mint(msg.sender, amountToWithdraw);
        return amountToWithdraw;
    }

	function getERC20DepositAddress() external returns (address) {
        return address(solutionERC20);
    }
}