import { useNotificationText } from "../store"

const Notification = () => {
  const _notification = useNotificationText()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  if (!_notification) {
    return null
  }

  return (
    <div style={style}>
      {_notification}
    </div>
  )
}

export default Notification