import React, { useState, useEffect, useReducer } from "react";
import _ from "lodash";
import { Table } from "semantic-ui-react";

function sortReducer(state, action) {
  console.log("Array in reducer function:", state.data);
  switch (action.type) {
    case "CHANGE_SORT":
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
      }
      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: "ascending",
      };
    default:
      throw new Error();
  }
}

// var obj;

// // Fetching
// function fetching() {
//   const url =
//     "https://mindfuleducation-cdn.s3.eu-west-1.amazonaws.com/misc/data.json";
//   fetch(url)
//     .then((res) => res.json())
//     .then((result) => {
//       obj = result.getColleges;
//       console.log(obj); // this works!
//       // var decoupledFetchedData = result.getColleges;
//       // console.log("inside the fetch:", decoupledFetchedData);
//       // return decoupledFetchedData;
//     })
//     .then(() => {
//       console.log(obj); // works!
//     });
//   // undefined here!
// }

// console.log("outside the fetch", fetching()); // undefined

async function fetching() {
  const url =
    "https://mindfuleducation-cdn.s3.eu-west-1.amazonaws.com/misc/data.json";
  const response = await fetch(url);
  const jsonData = await response.json();
  console.log(jsonData.getColleges);
  return jsonData.getColleges;
}
// console.log("outside the fetch:", obj);
function TableRender() {
  // Declaring the states for fetching
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  // fetching()
  // setFetchedData(fetching());
  useEffect(() => {
    setIsLoaded(true);
    const fetchData = async () => {
      const response = await fetching();
      setFetchedData(response);
    };

    fetchData();
    // dispatch({ data: fetchedData });
  }, []);

  // console.log(fetchedData);
  // states for sorting
  const [state, dispatch] = useReducer(sortReducer, {
    column: null,
    data: fetchedData,
    direction: null,
  });
  const { column, data, direction } = state;

  // function updateMainState() {}
  // Fetching
  // useEffect(() => {
  //   const url =
  //     "https://mindfuleducation-cdn.s3.eu-west-1.amazonaws.com/misc/data.json";
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         setIsLoaded(true);
  //         setFetchedData(result.getColleges);
  //         // dispatch({ data: fetchedData });
  //         console.log("Array in useEffect", fetchedData);
  //       },
  //       (error) => {
  //         setError(error);
  //         setIsLoaded(true);
  //       }
  //     );
  // }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Table celled fixed sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === "name" ? direction : null}
                onClick={() =>
                  dispatch({
                    type: "CHANGE_SORT",
                    // data: fetchedData,
                    column: "name",
                  })
                }
              >
                name
              </Table.HeaderCell>
              <Table.HeaderCell>Prefix</Table.HeaderCell>
              <Table.HeaderCell>Logo/Preroll</Table.HeaderCell>
              <Table.HeaderCell>Ofsted Rating</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {fetchedData.map(({ name, logo, ofstedRating, groupPrefix }) => (
              <Table.Row key={name}>
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
