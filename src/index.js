import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import { QueryClient, QueryClientProvider } from 'react-query'

const newQueryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root')) 
root.render(
  <React.StrictMode>
      <QueryClientProvider client={newQueryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
  </React.StrictMode>
)
