import './App.css';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Genre from './components/Genre';
import Language from './components/Language';
import Nav from './components/Nav';
import NavBar from './components/NavBar';
import Platforms from './components/Platforms';
import Row from './components/Row';
import requests from './request';
import bannerLogo from './images/bannerLogo.jpg';

function App() {
  return (
    <>
   <div className='rel'>
   <div className="nnn">
          <Nav/>
        </div>
     
      <div className="aaa">
        
  
  <div className='first'>
    
          <NavBar/>
  </div>
  
   <div className='second'>
  
    <div className='stick'>
      
     <Banner/>
    </div>
    <div className='lg'>
    <img src={bannerLogo} alt="Banner Logo" />
            <h3>2025 . 2h 13m . 4 languages . <span>U/A 16+</span> </h3>
            <p>A new era is born in the iconic Jurassic World series as a covert extraction team makes a dangerous discovery on a hidden island of deadly dinosaurs </p>
            <h3>Action | Adventure | Science Fiction | Thriller </h3>
            <button className='btn'>Subscribe to Watch</button>
            <button className='bb btn'>+</button>
  
  
  
    </div>
    <div className='z'>
            
      <Row title="Latest releases" fetchUrl={requests.fetchActionMovies} />
      <Row title="Free-Newly Added" fetchUrl={requests.fetchComedyMovies}/>
      <Row title="Disney Movies" fetchUrl={requests.fetchDocumentaries}/>
      <Platforms/>
      <Language/>
      <Genre/>
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies}/>
      <Row title="Romantic Movies" fetchUrl={requests.fetchRomanceMovies}/>
      <Row title="Populer Movies" fetchUrl={requests.fetchDoc}/>
      <Footer/>
    </div>
    
    
   </div>
      </div>
   </div>
    </>
  );
}

export default App;
