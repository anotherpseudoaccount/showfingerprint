import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { getFingerprint, getFingerprintData } from '@thumbmarkjs/thumbmarkjs'
import { TailSpin } from 'react-loader-spinner'

const App = () => {
  const [showContent, setShowContent] = useState(false)
  const [fingerprint, setFingerprint] = useState(false)
  const [hash, setHash] = useState(false)
  const [loading, setLoading] = useState(false)

  const toggleContent = async () => {
    if (!fingerprint) {
      setLoading(true)
      // all json data
      const fData = await getFingerprintData()
      const thumbMark = await getFingerprint()
      setHash(thumbMark)
      setFingerprint(fData)
      console.log(fData)
    }
    setLoading(false)
    setShowContent(!showContent)
  }

  const handleButtonClick = () => {
    alert('Button clicked!')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '20px' }}>
        <Button variant="contained" onClick={toggleContent} style={{ marginRight: '10px' }}>
          {showContent ? 'Hide fingerprint' : 'Show fingerprint'}
        </Button>
        <Button variant="contained" onClick={handleButtonClick}>
          Save fingerprint to the server
        </Button>
      </div>

      {showContent && (
        <div
          style={{
            width: '100%',
            border: '1px solid black',
            padding: '10px',
            boxSizing: 'border-box',
          }}
        >
          {loading ? (
            <TailSpin type="TailSpin" color="#00BFFF" height={80} width={80} />
          ) : (
            <div>
              <div>{`Hash: ${hash}`}</div>
              {Object.entries(fingerprint).map(([key, value], idx) => (
                <li key={idx}>{`${key}:\t${value}`}</li>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
