import { createSlice } from '@reduxjs/toolkit'

let timeoutId

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNoti(state, action) {
      return action.payload
    },
    clearNoti() {
      return ''
    }
  }
})

export const { setNoti, clearNoti } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  return dispatch => {
    clearTimeout(timeoutId)
    dispatch(setNoti(message))
    timeoutId = setTimeout(() => {
      dispatch(clearNoti())
    }, timeout * 1000)
  }
}

export default notificationSlice.reducer