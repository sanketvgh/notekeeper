import NotebooksProvider from './providers/NotebooksProvider';
import NoteProvider from './providers/NoteProvider';
import './App.css';
import Dashboard from './components/Dashborad';

function App() {
  return (
    <div className="App">
      <NotebooksProvider>
        <NoteProvider>
          <Dashboard />
        </NoteProvider>
      </NotebooksProvider>
    </div>
  );
}

export default App;
