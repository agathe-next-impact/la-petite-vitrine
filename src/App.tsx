import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './screens/LandingPage';
import { CGVPage } from './pages/CGV';
import { MentionsLegalesPage } from './pages/MentionsLegales';
import { PolitiqueConfidentialitePage } from './pages/PolitiqueConfidentialite';
import { EcommercePage } from './pages/Ecommerce';
import { Success } from './pages/Success';
import EmailTestPage from './pages/email-test';


function App() {
  return (
      <div className="w-full overflow-x-hidden">
        <Router future={{ 
          v7_startTransition: true,
          v7_relativeSplatPath: true 
        }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/commande" element={<EcommercePage />} />
            <Route path="/cgv" element={<CGVPage />} />
            <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
            <Route path="/success" element={<Success />} />
            <Route path="/email-test" element={<EmailTestPage />} />
          </Routes>
        </Router>
      </div>
  );   
}

export default App;
