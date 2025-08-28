import { useState, useRef } from 'react'

const WheelSpinner = ({ names }) => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [winner, setWinner] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [rotation, setRotation] = useState(0)
  const wheelRef = useRef(null)

  // Colors for the wheel segments
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', 
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ]

  const segmentAngle = 360 / names.length

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setShowResult(false)
    setWinner('')

    // Calculate the angle to land on "Yasin" (rigged logic)
    const yasinIndex = names.indexOf('Yasin')
    let targetAngle
    
    if (yasinIndex !== -1) {
      // Calculate the center angle of Yasin's segment (accounting for -90 degree offset)
      const yasinCenterAngle = yasinIndex * segmentAngle + segmentAngle / 2 - 90
      // We want the pointer (at top) to point to Yasin's segment
      // The wheel rotates clockwise, so we need to calculate backwards
      targetAngle = 360 - yasinCenterAngle + (Math.random() * 20 - 10) // Add small random variation
    } else {
      // Fallback to random if Yasin is not in the list
      targetAngle = Math.random() * 360
    }

    // Add multiple full rotations for dramatic effect
    const totalRotation = rotation + 1800 + targetAngle // Current rotation + 5 full rotations + target angle

    // Apply the rotation using state to trigger CSS transition
    setRotation(totalRotation)

    // Show result after animation completes
    setTimeout(() => {
      setIsSpinning(false)
      setWinner(yasinIndex !== -1 ? 'Yasin' : names[Math.floor(Math.random() * names.length)])
      setShowResult(true)
    }, 3000)
  }

  const resetWheel = () => {
    setShowResult(false)
    setWinner('')
    setRotation(0)
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Wheel Container */}
      <div className="relative">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 z-10">
          <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-red-600 drop-shadow-lg"></div>
        </div>

        {/* Wheel */}
        <div className="relative">
          <svg
            ref={wheelRef}
            width="300"
            height="300"
            viewBox="0 0 300 300"
            className={`transition-transform duration-[3000ms] ease-wheel ${isSpinning ? '' : 'hover:scale-105'}`}
            style={{ 
              transformOrigin: 'center',
              transform: `rotate(${rotation}deg)`
            }}
          >
            {names.map((name, index) => {
              // Start from top (12 o'clock) by subtracting 90 degrees
              const startAngle = index * segmentAngle - 90
              const endAngle = (index + 1) * segmentAngle - 90
              const startAngleRad = (startAngle * Math.PI) / 180
              const endAngleRad = (endAngle * Math.PI) / 180

              const x1 = 150 + 140 * Math.cos(startAngleRad)
              const y1 = 150 + 140 * Math.sin(startAngleRad)
              const x2 = 150 + 140 * Math.cos(endAngleRad)
              const y2 = 150 + 140 * Math.sin(endAngleRad)

              const largeArcFlag = segmentAngle > 180 ? 1 : 0

              const pathData = [
                `M 150 150`,
                `L ${x1} ${y1}`,
                `A 140 140 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ')

              // Text position
              const textAngle = startAngle + segmentAngle / 2
              const textAngleRad = (textAngle * Math.PI) / 180
              const textX = 150 + 100 * Math.cos(textAngleRad)
              const textY = 150 + 100 * Math.sin(textAngleRad)

              return (
                <g key={index}>
                  <path
                    d={pathData}
                    fill={colors[index % colors.length]}
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#fff"
                    fontSize="14"
                    fontWeight="bold"
                    transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                  >
                    {name}
                  </text>
                </g>
              )
            })}
            
            {/* Center circle */}
            <circle cx="150" cy="150" r="20" fill="#fff" stroke="#333" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={spinWheel}
          disabled={isSpinning || names.length === 0}
          className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all ${
            isSpinning || names.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 shadow-lg'
          }`}
        >
          {isSpinning ? 'Spinning...' : 'SPIN THE WHEEL!'}
        </button>

        {showResult && (
          <button
            onClick={resetWheel}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Reset Wheel
          </button>
        )}
      </div>

      {/* Winner Display */}
      {showResult && winner && (
        <div className="bg-white rounded-lg shadow-lg p-6 text-center animate-bounce">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">🎉 Winner! 🎉</h2>
          <p className="text-3xl font-bold text-purple-600">{winner}</p>
        </div>
      )}
    </div>
  )
}

export default WheelSpinner
