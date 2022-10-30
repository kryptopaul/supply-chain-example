// SPDX-License-Identifier: Undefined
pragma solidity 0.8.17;

contract SupplyChainGreenwich {


    // RANDOM ADDRESSES!!
    // Tesco: 0xaA1ff6275788BA755bECEeb1161e24c3164072c9
    // Waitrose: 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
    // Sainsbury's: 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
    // Morrisons: 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB



    mapping (address => Order[]) public orders;
    mapping(string => address) public companies;

    struct Order {
        uint timestamp;
        string name;
        uint256 priceGBP;
        string status;
    }

    constructor() {

        //Assign company names
        companies["Tesco"] = 0xaA1ff6275788BA755bECEeb1161e24c3164072c9;
        companies["Waitrose"] = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;
        companies["Sainsbury's"] = 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db;
        companies["Morrisons"] = 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB;


        //Random Tesco orders
        orders[companies["Tesco"]].push(Order(block.timestamp, "500L Milk", 7500, "In transit"));
        orders[companies["Tesco"]].push(Order(block.timestamp, "127 loaves Bread", 10250, "Delivered"));
        orders[companies["Tesco"]].push(Order(block.timestamp, "4250 Eggs", 2500, "Delivered"));
        orders[companies["Tesco"]].push(Order(block.timestamp, "5kg Butter", 1250, "In transit"));       

        //Random Waitrose orders
        orders[companies["Waitrose"]].push(Order(block.timestamp, "100 Coca-Cola bottles", 1200, "In transit"));
        orders[companies["Waitrose"]].push(Order(block.timestamp, "300kg Sugar", 3000, "In transit"));
        orders[companies["Waitrose"]].push(Order(block.timestamp, "125 Nutella Jars", 5000, "Delivered"));  
        orders[companies["Waitrose"]].push(Order(block.timestamp, "720kg Bananas", 750, "Delivered")); 

        // Random Sainsbury's orders
        orders[companies["Sainsbury's"]].push(Order(block.timestamp, "10kg Chicken", 500, "In transit"));
        orders[companies["Sainsbury's"]].push(Order(block.timestamp, "15kg Pork", 750, "Delivered"));
        orders[companies["Sainsbury's"]].push(Order(block.timestamp, "12kg Beef", 100, "Delivered"));
        orders[companies["Sainsbury's"]].push(Order(block.timestamp, "7kg Lamb", 120, "In transit"));

        // Random Morrisons orders
        orders[companies["Morrisons"]].push(Order(block.timestamp, "25kg Pasta", 2500, "In transit"));
        orders[companies["Morrisons"]].push(Order(block.timestamp, "50kg Rice", 300, "Delivered"));
        orders[companies["Morrisons"]].push(Order(block.timestamp, "20kg Tomatoes", 500, "Delivered"));
        orders[companies["Morrisons"]].push(Order(block.timestamp, "20kg Potatoes", 750, "In transit"));
    }



    function addNewOrder(
        string calldata _name,
        uint256 _priceGBP
        ) 
        public 
    {
        // I know it's not the best way to do it, but it's just a school project LOL
        require(msg.sender == companies["Tesco"] || msg.sender == companies["Waitrose"] || msg.sender == companies["Sainsbury's"] || msg.sender == companies["Morrisons"], "You are not a registered company"); 
        Order memory newOrder = Order(block.timestamp, _name, _priceGBP, "New order");

        // We are Tesco
        orders[msg.sender].push(newOrder);
    }


    // Website will use that to fetch data
    function getOrderByStoreName(string calldata _name) public view returns (Order[] memory) {
        return orders[companies[_name]];
    }


}