import { gql } from "apollo-boost";

const ADD_BOOK = gql`
  mutation addBook($name: String!) {
    addBook(name: $name) {
      name
      id
    }
  }
`;

export default ADD_BOOK;
