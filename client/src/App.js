import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.state = {
      price: 0,
      thresholdPrice: null
    };
    this.setThresholdPrice = this.setThresholdPrice.bind(this);
  }

  componentDidMount() {
    const socket = socketIOClient("http://127.0.0.1:4001");
    socket.on("bitcoin", price => {
      this.setState({ price })
    });
  }

  setThresholdPrice(e) {
    this.setState({ thresholdPrice: parseInt(e.target.value) });
  }

  render() {
    const { price } = this.state;
    if(price && price <= this.state.thresholdPrice) {
      window.alert("Bitcoin alert!")
    }
    return (
      <div style={{ textAlign: "center" }}>
        <p>Enter the price(in ₹) below which you want to get alerted for</p>
        <input type='number' onChange={this.setThresholdPrice} value={this.state.threshold} />
        {price
          ? <p>
              The Bitcoin price is: ₹{price}
            </p>
          : <p>Hold on...Fetching the latest bitcoin price</p>}
      </div>
    );
  }
}
export default App;