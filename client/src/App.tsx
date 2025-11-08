import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HomePage } from './pages/HomePage';
import { CarDetailPage } from './pages/CarDetailPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-900 text-white/90">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/car/:id" element={<CarDetailPage />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
