import CSVRead from './CSVRead/CSVRead'; 
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <CSVRead />
      <Footer />
    </div>
  );
}

export default App;
