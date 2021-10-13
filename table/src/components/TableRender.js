import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Table } from "semantic-ui-react";

function TableRender() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const url =
      "https://mindfuleducation-cdn.s3.eu-west-1.amazonaws.com/misc/data.json";
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result.getColleges);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
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
            {data.map(({ name, logo, ofstedRating, groupPrefix }) => (
              <Table.Row>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{groupPrefix}</Table.Cell>
                <Table.Cell>
                  <img src={logo} alt="mindfuleducation logo" />
                </Table.Cell>
                <Table.Cell>{ofstedRating}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default TableRender;
