pragma solidity ^0.5.0;

contract Marketplace {
    string public lastName;
    string public name;
    string public url;
    uint public productCount = 0;
    mapping(uint => Product) public products;

    struct Product {
      uint id;
      string lastName;
      string name;
      uint price;
      address payable owner;
      bool purchased;
      string url;
    }

    event ProductCreated(
      uint id,
      string lastName,
      string name,
      uint price,
      address payable owner,
      bool purchased,
      string url
    );

    event ProductPurchased(
      uint id,
      string lastName,
      string name,
      uint price,
      address payable owner,
      bool purchased,
      string url
    );

    constructor() public {
      name = "Marketplace";
    }

    function createProduct(string memory _lastName, string memory _name, uint _price, string memory _url) public {
      // Require a valid last name
      require(bytes(_lastName).length > 0, "Invalid last name");
      // Require a valid name
      require(bytes(_name).length > 0, "Invalid first name");
      // Require a valid price
      require(_price > 0, "Invalid price");
      // Increment product count
      productCount++;
      // Create the product
      products[productCount] = Product(productCount, _lastName, _name, _price, msg.sender, false, _url);
      // Trigger an event
      emit ProductCreated(productCount, _lastName, _name, _price, msg.sender, false, _url);
    }

    function purchaseProduct(uint _id) public payable {
      // Fetch the product
      Product memory _product = products[_id];
      // Fetch the owner
      address payable _seller = _product.owner;
      // Make sure the product has a valid id
      require(_product.id > 0 && _product.id <= productCount, "Invalid product ID");
      // Require that there is enough Ether in the transaction
      require(msg.value >= _product.price, "Not enough Ether in transaction");
      // Require that the product has not been purchased already
      require(!_product.purchased, "Product is purchased already");
      // Require that the buyer is not the seller
      require(_seller != msg.sender, "You can not buy your own product");
      // Transfer ownership to the buyer
      _product.owner = msg.sender;
      // Mark as purchased
      _product.purchased = true;
      // Update the product
      products[_id] = _product;
      // Pay the seller by sending them Ether
      address(_seller).transfer(msg.value);
      // Trigger an event
      emit ProductPurchased(productCount, _product.lastName, _product.name, _product.price, msg.sender, true, _product.url);
    }
}