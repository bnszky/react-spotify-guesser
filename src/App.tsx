import './App.css'

function App() {

  return (
    <div className='h-screen flex items-center justify-center'>
    <div className="bg-neutral p-6 flex flex-col gap-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white text-center">Paste link to your playlist</h2>
      <input type="text" placeholder="Your link" className="input input-bordered w-full max-w-xs" />
      <button className="btn btn-secondary">Search</button>
    </div>
    </div>
  )
}

export default App
