import Error from '@/components/shadcn-studio/blocks/error-page-01/error-page-01';
import Footer from '@/components/shadcn-studio/blocks/footer-component-01/footer-component-01';
import Navbar from '@/components/shadcn-studio/blocks/navbar-component-01/navbar-component-01';

import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import Home from '@/pages/Home';
import Invoice from '@/pages/Invoice';
import Subjects from '@/pages/Subjects';

const navigationData = [
  { title: 'Home', href: '/' },
  { title: 'Invoice', href: '/invoice' },
  { title: 'Subjects', href: '/subjects' },
  { title: 'About Us', href: '/about' },
  { title: 'Contacts', href: '/contacts' }
];

function App() {

  return (
    <BrowserRouter>
      <div className='min-h-screen'>
        <Navbar navigationData={navigationData}/>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/invoice' element={<Invoice />} />
          <Route path='/subjects' element={<Subjects />} />
          <Route path='*' element={<Error />} />
        </Routes>

        <Footer navigationData={navigationData}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
