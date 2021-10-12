import React, { Component } from "react";
import PropTypes from "prop-types";

export class FetchData extends Component {
  static propTypes = {};

  state = {
    loading: true,
    data: [],
  };

  async componentDidMount() {
    console.log("Mounted");
    const url =
      "https://mindfuleducation-cdn.s3.eu-west-1.amazonaws.com/misc/data.json";
    const response = await fetch(url);
    const JSONData = await response.json();
    // console.log(JSONData.getColleges[0]);
    this.setState({ data: JSONData.getColleges, loading: false });
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div>{this.state.data[0].name}</div>
            <img src={this.state.data[0].logo}></img>
          </div>
        )}
      </div>
    );
  }
}

export default FetchData;
