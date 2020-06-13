import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Add Product</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const lastName = this.productLastName.value
          const name = this.productName.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          const url = this.productImage.value.toString()
          this.props.createProduct(lastName, name, price, url)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productLastName"
              type="text"
              ref={(input) => { this.productLastName = input }}
              className="form-control"
              placeholder="Last Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Product Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Product Price"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productImage"
              type="text"
              ref={(input) => { this.productImage = input }}
              className="form-control"
              placeholder="Product Image URL (optional)"
              />
          </div>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
        <p>&nbsp;</p>
        <div id="url"></div>
        <h2>Buy Product</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Last Name</th>
              <th scope="col">Owner</th>
              <th scope="col">Status</th>
              <th scope="col">Image</th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.products.map((product, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                  <td>{product.lastName}</td>
                  <td>{product.owner}</td>
                  <td>
                  {
                    !(this.props.account===product.owner)
                      ?
                        !product.purchased
                          ? <button
                              name={product.id}
                              value={product.price}
                              onClick={(event) => {
                                this.props.purchaseProduct(event.target.name, event.target.value)
                                var promptText
                                var promptName = prompt("Please enter your last name:", "")
                                if (promptName === null || promptName === "") {
                                  promptText = product.lastName
                                } else {
                                  promptText = promptName
                                }
                                product.lastName = promptText
                                console.log(promptText)
                              }}>
                              Buy
                            </button>
                          : "Bought"
                      : "Owned"
                  }
                  </td>
                  <td>
                  {
                    !(product.url.length === 0)
                      ? <button
                        onClick={() => {
                          var url = document.getElementById('url')
                          url.innerHTML = `
                            <div class="card card-body" style="position: fixed; left: 1000px; top: 103px">
                              <div class="col-mid-3">
                                <img class="img-fluid mb-2" style="width: 300px" src="${product.url}">
                              </div>
                            </div>
                          `
                        }}>
                        Preview
                      </button>
                    : "No preview available"
                  }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;