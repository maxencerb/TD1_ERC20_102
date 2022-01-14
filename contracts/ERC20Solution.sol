pragma solidity ^0.6.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Solution is ERC20
{

    mapping(address => bool) minters;
    mapping(address => mapping(address => uint256)) custody;


    constructor(string memory name, string memory symbol,uint256 initialSupply) public ERC20(name, symbol) {
        minters[msg.sender] = true;
        _mint(msg.sender, initialSupply);
    }    

	function setMinter(address minterAddress, bool isMinter)  external {
        require(minters[msg.sender], "Sender is not a minter");
        minters[minterAddress] = isMinter;
    }

	function mint(address toAddress, uint256 amount) external {
        require(minters[msg.sender], "Sender is not a minter");
        // Increase allowance for the minter
        custody[toAddress][msg.sender] += amount;
        _mint(toAddress, amount);
    }

	function isMinter(address minterAddress) external returns (bool) {
        return minters[minterAddress];
    }

    function burn(address fromAddress, uint256 amount) external {
        require(minters[msg.sender], "Sender is not a minter");
        custody[fromAddress][msg.sender] -= amount;
        _burn(fromAddress, amount);
    }
}