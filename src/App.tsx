import NotebooksProvider from './providers/NotebooksProvider';
import NoteProvider from './providers/NoteProvider';
import Dashboard from './components/Dashborad';
import CurrentNotebook from './providers/CurrentNotebook';

function App() {
  return (
    <div className="App">
      <NotebooksProvider>
        <NoteProvider>
          <CurrentNotebook>
            <Dashboard />
          </CurrentNotebook>
        </NoteProvider>
      </NotebooksProvider>
    </div>
  );
}

export default App;
