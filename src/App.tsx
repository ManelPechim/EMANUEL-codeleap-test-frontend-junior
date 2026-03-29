import MainPage from './pages/main-screen/MainPage';
import SignUpPage from './pages/sign-up/SignUpPage'
import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SignUpPage />} />
        <Route path='/main' element={<MainPage />} />
      </Routes>
    </>
  );
};

