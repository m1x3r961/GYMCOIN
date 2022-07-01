// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract GYM {
    string public  name="Gymcoin";
    string public symbol = "GYM";
    uint256 public totalSuply = 1000000000000000000000000;
    uint8 public decimals = 18;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;


    constructor(){
        balanceOf[msg.sender] = totalSuply;
    }
    function transfer(address _to, uint256 _value) public returns (bool success){
        //requerir que valor sea  mayor o igual a la transferencia
        require(balanceOf[msg.sender] >= _value);
        //transferir monto
        balanceOf[msg.sender] -= _value;
        // agregar al balance
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
        
    }

    function tranferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        //revisar balance y comparar con valor de envio
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        //agregar  balance de transferform
        balanceOf[_to] += _value;
        balanceOf[_from] -= _value;
        allowance[msg.sender][_from] -= _value;

        emit Transfer(_from, _to, _value);
        return true;
    }
    




}