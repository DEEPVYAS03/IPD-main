
import Login from './components/js/Login'
import Mock_C from './components/js/Step1';
import Register from './components/js/Register';
import { BrowserRouter, Route, Routes, Switch, Link } from 'react-router-dom';
import Step1 from './components/js/Step1';
import Step2 from './components/js/Step2';
import { useState } from 'react';
import Step3 from './components/js/Step3';
import Mock from './components/js/Mock';
import { UserAuthContextProvider } from './components/context/UserAuthContext';
import Admin from './components/js/Admin'
import Candidate from './components/js/Candidate';

function App() {


  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = (file) => {
    if (currentStep === 1 && file) {
      // Implement logic to handle the uploaded file
      console.log('Uploaded file:', file);
      setCurrentStep(currentStep + 1);
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
      <UserAuthContextProvider>
        <Routes>
          <Route path='/' element={<Login />}></Route>

          <Route path='/register' element={<Register />}></Route>

          <Route path='/mock' element={<Mock />}></Route>
          
          <Route path='/admin' element={<Admin />}></Route>

          <Route path='/candidate' element={<Candidate />}></Route>

          <Route path='/mock/step1' element={<Step1 onNext={handleNext} />}></Route>
          <Route path='/mock/step2' element={<Step2 onNext={handleNext} />}></Route>
          <Route path='/mock/step3' element={<Step3 onNext={handleNext} />}></Route>
          
        </Routes>
        </UserAuthContextProvider>
        </BrowserRouter>
        
    </div>
  );
}

export default App;
