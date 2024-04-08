const FingerPrintComponent = ({ componentKey, componentValue, visible }) => {
  const unwrapValue = (value) => {
    console.log(value, typeof value)
    // if components are somehting nested the only possible options should be objects or arrays
    if (Array.isArray(value)) {
      return (
        <div>
          {value.map((elem, idx) => (
            <li key={idx}>{elem}</li>
          ))}
        </div>
      )
    } else if (typeof value === 'object') {
      return (
        <div>
          {Object.entries(value).map(([key, Objvalue], idx) => (
            <li key={idx}>
              {key}:
              <ul>
                <li>{unwrapValue(Objvalue)}</li>
              </ul>
            </li>
          ))}
        </div>
      )
    }

    return typeof value === 'boolean' ? value.toString() : value
  }

  return visible ? (
    <div>
      <div>
        <b>{`${componentKey}:`}</b>
      </div>
      <div>{unwrapValue(componentValue)}</div>
    </div>
  ) : null
}

export default FingerPrintComponent
