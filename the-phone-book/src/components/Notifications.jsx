const Notifications = ({ messages }) => {
  if (messages == null) return null;

  return <div className="notificationMessages">{messages}</div>;
};

export default Notifications;
