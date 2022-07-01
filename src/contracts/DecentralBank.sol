// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import './GYM.sol';
import './Theter.sol';

contract DecentralBank {
    string public name =  'Gym Finance';
    address public owner;
    Theter public theter;
    GYM public gym;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(GYM _gym, Theter _theter) {
        gym = _gym;
        theter = _theter;
        owner = msg.sender;


    }

    //funcion de staking
    function depositTokens(uint _amount) public {
        //requerir cantidad de staking debe ser mayor que  0
        require(_amount > 0, 'Amount cannot be 0');

        //Transferir  theter tokens al contrato  para  staking
        theter.tranferFrom(msg.sender, address(this), _amount);

        //actualizar balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        //actualizar balance de staking
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;

    }
    //funcion de UnStaking
    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];

        //requerir la cantidad sea mayor que cero
        require(balance > 0, 'Staking balance must be above 0');
        //transferir tokens a la persona
        theter.transfer(msg.sender, balance);
        //resetear balance de staking
        stakingBalance[msg.sender] = 0;

        //actualizar  estado isStaking
        isStaking[msg.sender] = false;
    }
    //funcion de recompensas
    function issueTokens() public {
        // Solo el dueno debe poder enviar tokens
        require(msg.sender == owner, 'Only the ownerr can make that call');

        // Recompensar al cliente por hacer staking
        for (uint i=0; i<stakers.length; i++) {
              address recipient = stakers[i]; 
              uint balance = stakingBalance[recipient] / 9;
              if(balance > 0) {
              gym.transfer(recipient, balance);
            }
        }
    }
}