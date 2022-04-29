import { connect } from 'react-redux'

const Notification = (props) => {
  if (props.notification === null) return null
  let messageType = 'message'
  if (props.notification.error) {
    messageType = 'error'
  }
  return (
    <div className={`${messageType} notification`}>
      {props.notification.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)
