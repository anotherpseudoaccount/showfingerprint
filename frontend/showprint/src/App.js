import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { getFingerprint, getFingerprintData } from '@thumbmarkjs/thumbmarkjs'
import { TailSpin } from 'react-loader-spinner'
import FingerPrintComponent from './components/FingerPrintComponent'
import PrintContentButton from './components/PrintContentButton'
import axios from 'axios'

const App = () => {
  const [showContent, setShowContent] = useState(false)
  const [fingerprint, setFingerprint] = useState(false)
  const [hash, setHash] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

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
    console.log(fingerprint)
    if (fingerprint) {
      axios
        .post('http://localhost:3001/log/print', { hash, ...fingerprint })
        .then((response) => {
          console.log(response.status)
          setSaved(true)
        })
        .catch((error) => alert('FAILED TO SAVE'))
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '20px' }}>
        <Button variant="contained" onClick={toggleContent} style={{ marginRight: '10px' }}>
          {showContent ? 'Hide fingerprint' : 'Show fingerprint'}
        </Button>
        {fingerprint ? (
          <Button
            variant="contained"
            onClick={handleButtonClick}
            color={saved ? 'success' : 'primary'}
          >
            {saved ? 'Saved fingerprint to the server!' : 'Save fingerprint to the server'}
          </Button>
        ) : (
          <Button variant="contained" disabled>
            Save fingerprint to the server
          </Button>
        )}
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
              <div>
                {/* {Object.entries(fingerprint).map(([key, value], idx) => (
                  <FingerPrintComponent
                    key={key}
                    componentKey={key}
                    componentValue={value}
                    visible={true}
                  />
                  // <li key={idx}>{`${key}:\t${value}`}</li>
                ))} */}
                <PrintContentButton content={fingerprint} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
