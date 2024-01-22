import Carousel from './Components/recipe_sharing/Carousel';
import Navbar from './Components/recipe_sharing/Navbar';


function App() {
  return (
    <>
    <Navbar />
    <Carousel />
    <div className='container'>
      <div className='row'>
        <div className='col-md-8 offset-md-2 mt-5'>
            <h1>Where extraordinary meals are made</h1>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
