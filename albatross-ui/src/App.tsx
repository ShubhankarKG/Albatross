import React from 'react';
import Header from './components/Header';
import Manual from './components/Manual';

function App() {
  return (
    <div className="flex flex-col h-full text-black">
      <Header />
      <Manual />
    </div>
  );
}

export default App;
