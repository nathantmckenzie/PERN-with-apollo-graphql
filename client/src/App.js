import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import BookList from "./components/BookList";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <div className="App">hi</div>{" "}
      </div>
    </ApolloProvider>
  );
}

export default App;
