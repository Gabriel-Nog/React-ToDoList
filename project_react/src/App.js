import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';

import Container from './components/layuot/Container';
import Navbar from './components/layuot/Navbar';
import Footer from './components/layuot/Footer'
import Projects from './components/pages/Projects';
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Container customClass="min-height">
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/projects' element={<Projects />} />
            <Route exact path='/company' element={<Company />} />
            <Route exact path='/contact' element={<Contact />} />
            <Route exact path='/newproject' element={<NewProject />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </>
  );
}

export default App;
