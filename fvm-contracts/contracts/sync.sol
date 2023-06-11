// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract sync {
    mapping(address => string) public registerars;
    mapping(address => mapping(address => bool)) public invites;
    mapping(address => mapping(address => string)) public sdpCids;

    event register(address indexed registerar, string cid);
    event invite(address indexed registerar, address indexed peer, string cid);
    event sdp(address indexed from, address indexed to);
    event negotiation(address indexed from, address indexed to);

    function Register(string calldata cid) public {
        registerars[msg.sender] = cid;
        emit register(msg.sender, cid);
    }

    function Invite(address peer) public {
        require(invites[msg.sender][peer] == false);
        invites[msg.sender][peer] = true;
        emit invite(msg.sender, peer, registerars[msg.sender]);
    }

    function declineInvite(address registerar) public {
        require(invites[registerar][msg.sender] == true);
        invites[registerar][msg.sender] = false;
    }

    function acceptInvite(address registerar, string calldata sdpCid) public {
        require(invites[registerar][msg.sender] == true);
        sdpCids[msg.sender][registerar] = sdpCid;
        emit sdp(msg.sender, registerar);
    }

    function shareSDP(address to, string calldata cid) public {
        require(invites[msg.sender][to] == true);
        sdpCids[msg.sender][to] = cid;
        emit sdp(msg.sender, to);
    }

    function negotiationNeeded(address to, string calldata sdpCid) public {
        require(invites[msg.sender][to] == true);
        sdpCids[msg.sender][to] = sdpCid;
        emit negotiation(msg.sender, to);
        emit sdp(msg.sender, to);
    }

    function getLatestSDP(
        address from,
        address to
    ) public view returns (string memory) {
        return sdpCids[from][to];
    }
}
