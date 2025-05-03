import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './utils/AppRouter';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-full flex flex-col bg-white sm:bg-[#F9FAFA]">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
