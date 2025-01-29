import { useState } from 'react';
import "./index.css";
import Frontend from './components/frontend.jsx';
import Header from './components/header.jsx';
import Content from './components/content.jsx';
import Footer from './components/footer.jsx';

function App() {
  return (
    <div className="min-h-screen bg-[#0f1015]"> {/* Added background color and min-height */}
      <div className="flex flex-col min-h-screen">
        <Header />
        {/* <Frontend/> */}
        <main className="flex-grow">
          <Content />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;