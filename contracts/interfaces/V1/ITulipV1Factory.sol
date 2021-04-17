// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;

interface ITulipV1Factory {
    function getExchange(address) external view returns (address);
}
