import React, { useState } from 'react'
import { Button, Typography, Paper } from '@mui/material'

const PrintContentButton = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleContent = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div style={{ margin: '20px' }}>
      <Button variant="contained" onClick={toggleContent} fullWidth>
        {isOpen ? 'Hide Content' : 'Show Content'}
      </Button>

      {isOpen && (
        <Paper style={{ marginTop: '10px', padding: '10px' }}>
          <Typography variant="body1">{renderContent(content)}</Typography>
        </Paper>
      )}
    </div>
  )
}

const renderContent = (content) => {
  return (
    <ul>
      {Object.entries(content).map(([key, value]) => (
        <li key={key}>
          <strong>{key}: </strong>
          {Array.isArray(value) ? (
            <ul>
              {value.map((elem, idx) => (
                <li key={idx}>{elem}</li>
              ))}
            </ul>
          ) : typeof value === 'object' ? (
            renderNestedContent(value)
          ) : (
            value
          )}
        </li>
      ))}
    </ul>
  )
}

const renderNestedContent = (content) => {
  if (Array.isArray(content)) {
    return content.map((item, index) => <li key={index}>{renderContent(item)}</li>)
  } else {
    return renderContent(content)
  }
}

export default PrintContentButton
