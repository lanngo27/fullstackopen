const Notification = ({ message, error }) => {
  if (message === null)
    return null
  let messageType = 'message'
  if (error) {
    messageType = 'error'
  }
  return (
    <div className={`${messageType} notification`}>
      {message}
    </div>
  )
}

export default Notification