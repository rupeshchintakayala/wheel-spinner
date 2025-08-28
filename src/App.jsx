import { useState } from 'react'
import WheelSpinner from './components/WheelSpinner'

function App() {
  const [names, setNames] = useState(['Yasin', 'Ali', 'Beatriz', 'Charles', 'Diya', 'Eric', 'Fatima', 'Gabriel'])
  const [newName, setNewName] = useState('')

  const addName = () => {
    if (newName.trim() && !names.includes(newName.trim())) {
      setNames([...names, newName.trim()])
      setNewName('')
    }
  }

  const removeName = (nameToRemove) => {
    if (names.length > 1) {
      setNames(names.filter(name => name !== nameToRemove))
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addName()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Wheel Spinner</h1>
          <p className="text-gray-600">Add names and spin the wheel to pick a winner!</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Wheel Section */}
            <div className="flex justify-center">
              <WheelSpinner names={names} />
            </div>

            {/* Names Management Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Names</h2>
              
              {/* Add Name Input */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter a name..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={addName}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Add
                </button>
              </div>

              {/* Names List */}
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Current Names ({names.length})</h3>
                <div className="max-h-64 overflow-y-auto">
                  {names.map((name, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-800 font-medium">{name}</span>
                      {names.length > 1 && (
                        <button
                          onClick={() => removeName(name)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
