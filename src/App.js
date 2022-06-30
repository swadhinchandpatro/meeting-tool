import React, { Suspense } from 'react'
import './App.scss';
import { ApolloProvider, HttpLink, from, ApolloClient, InMemoryCache} from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import MeetingView from './screens/MeetingView'
import reducers from './reducers/reducer'
import './App.scss'
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const RoomSelection = React.lazy(() => import('./components/RoomSelection'))
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

const store = createStore(reducers);
function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <div className='app-container'>
          <MeetingView />
          <Suspense loading={<></>}>
            <RoomSelection />
          </Suspense>
        </div>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
