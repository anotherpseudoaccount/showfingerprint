const FingerPrintPresentation = ({ component }) => {
  const unwrapComponent = (printComponent) => {
    // if components are somehting nested the only possible options should be objects or arrays
    if (Array.isArray(printComponent)) {
      return (
        <div>
          {printComponent.map((elem, idx) => (
            <li key={idx}>{unwrapComponent(elem)}</li>
          ))}
        </div>
      )
    } else if (typeof printComponent === 'object') {
      return (
        <div>
          {Object.entries(printComponent).map(([key, value], idx) => (
            <li key={idx}>
              {key}: {unwrapComponent(value)}
            </li>
          ))}
        </div>
      )
    }

    return printComponent
  }

  return <div>{unwrapComponent(component)}</div>
}

export default FingerPrintPresentation
