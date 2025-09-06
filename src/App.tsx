import './App.css'
import Home from './pages/home'

function App() {

  return (
    <div>

      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Home />
      <footer className="mt-6 text-center text-sm text-gray-500">
        Icons by{" "}
        <a
          href="https://icons8.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Icons8
        </a>
      </footer>
    </div>
  )
}

export default App
