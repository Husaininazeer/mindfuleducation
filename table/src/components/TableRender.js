import React, { Component } from "react";
import _ from "lodash";
import { Table, TableHeader } from "semantic-ui-react";

export class TableRender extends Component {
  state = {
    loading: true,
    data: [],
  };
  // Reducer function for sorting table columns

  // Function to load component is mounted...
  // Fetches the data
  async componentDidMount() {
    const url =
      "https://mindfuleducation-cdn.s3.eu-west-1.amazonaws.com/misc/data.json";
    const response = await fetch(url);
    const JSONData = await response.json();
    this.setState({ data: JSONData.getColleges, loading: false });
  }
  render() {
    return (
      <div>
        {this.state.loading ? (
          <div>Loading...</div>
        ) : (
          <Table celled fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Prefix</Table.HeaderCell>
                <Table.HeaderCell>Logo/Preroll</Table.HeaderCell>
                <Table.HeaderCell>Ofsted Rating</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.data.map(
                ({ name, logo, ofstedRating, groupPrefix }) => (
                  <Table.Row>
                    <Table.Cell>{name}</Table.Cell>
                    <Table.Cell>{groupPrefix}</Table.Cell>
                    <Table.Cell>
                      <img src={logo} />
                    </Table.Cell>
                    <Table.Cell>{ofstedRating}</Table.Cell>
                  </Table.Row>
                )
              )}
            </Table.Body>
          </Table>
        )}
      </div>
    );
  }
}

export default TableRender;
