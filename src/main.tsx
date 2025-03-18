import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tools from './pages/Tools';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tools" element={<Tools />} />
          <Route path="about" element={<About />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          {/* Redirect /blog to /portfolio */}
          <Route path="blog" element={<Navigate to="/portfolio" replace />} />
          <Route path="blog/*" element={<Navigate to="/portfolio" replace />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);