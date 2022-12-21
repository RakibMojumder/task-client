
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Home from './components/Home';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className='w-[90%] mx-auto py-10 md:py-0'>
        <Home />
        <Toaster position='top-center' />
      </div>
    </QueryClientProvider>

  );
}

export default App;
