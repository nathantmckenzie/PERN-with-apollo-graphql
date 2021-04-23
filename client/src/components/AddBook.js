import React, { useState } from "react";
import { gql } from "apollo-boost";
import BookList from "./BookList";

const ADD_BOOK = gql`
  mutation($name: String!) {
    addBook(name: $name) {
      name
    }
  }
`;

const AddBook = (props) => {
  let name, bookId;
  const [input, setInput] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("input", input);
          props.props.addBookMutation({
            variables: {
              name: input,
            },
          });
        }}
      >
        <input
          id="name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new book"
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default AddBook;
