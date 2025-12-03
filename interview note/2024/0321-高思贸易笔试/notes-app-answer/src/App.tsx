// import { useState } from 'react'

import Navbar from "./View/Navbar";
import EditorPanel from "./View/EditorPanel";
import { NotesProvider } from './context/NotesContext';

function App() {


  return (
    <div id="app">
      <NotesProvider>
        <Navbar />
        <EditorPanel />
      </NotesProvider>
    </div>
  )
}

export default App
