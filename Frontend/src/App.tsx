import { Routes, Route } from 'react-router';

import Login from './pages/login';

function App() {
  return (
    <div className='h-screen w-screen bg-[#0E3A5B] '>
      <Routes>
        <Route index element={<Login />} />
      </Routes>
    </div>
  )
}

export default App