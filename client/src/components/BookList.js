import React, { useEffect, useState } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import AddBook from "./AddBook";
import addBookQuery from "../queries/queries";
import ADD_BOOK from "../queries/queries";
import { flowRight as compose } from "lodash";

const getDataQuery = gql`
  {
    books {
      name
      id
      author {
        name
      }
      location {
        location
      }
    }
  }
`;

const BookList = (props) => {
  const [books, setBooks] = useState();
  const [authors, setAuthors] = useState([]);
  const data = props.getDataQuery;

  useEffect(() => {
    setBooks(data.books);
  }, [data]);

  useEffect(() => {
    if (books && books.length > 0) {
      console.log("books", books[0].name);
    }
  }, [books]);

  return (
    <div>
      {console.log("PROPS", props)}
      <AddBook setBooks={setBooks} books={books} props={props} />
      Book List:
      <br />
      {books && books != undefined
        ? books.map((book) => {
            return (
              <li className="row" key={book.id}>
                {book.name} by {book.author.name}
                {book.location ? (
                  <div> , which was written in {book.location.location} </div>
                ) : null}
                <span className="x">X</span>
              </li>
            );
          })
        : null}
    </div>
  );
};

export default compose(
  graphql(getDataQuery, { name: "getDataQuery" }),
  graphql(ADD_BOOK, { name: "addBookMutation" })
)(BookList);
