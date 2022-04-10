import React from 'react'

const Notification = ({ message, messageType }) => {
    if (message === null) {
      return null
    }

    return (
       <div className={`${messageType} notification`}>
        {message}
      </div>
    )
}

export default Notification