import './App.scss';
import { ApolloProvider, HttpLink, from, ApolloClient, InMemoryCache} from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import SelectDropdown from './components/SelectDropdown';

const errorLink = new RetryLink({
  attempts: {
    max: 3
  }
})
const link = from([
  errorLink,
  new HttpLink({ uri: "http://smart-meeting.herokuapp.com/graphql"})
])
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})
function App() {
  return (
    <ApolloProvider client={client}>
      <div className='app-container'>
        <SelectDropdown name='buildings' />
      </div>
    </ApolloProvider>
  );
}

export default App;
