import { BrowserRouter, Route } from 'react-router'
import Login from './pages/login'

function App() {
  return (
    <div className="h-screen w-screen bg-gray-600">
      <BrowserRouter>
        <Route path="/" element={<Login />} />
      </BrowserRouter>
    </div>
  )
}

export default App