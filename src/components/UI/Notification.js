import classes from './Notification.module.css';

const Notification = ({notification}) => {

  let specialClasses = '';

  if (notification.type === 'error') {
    specialClasses = classes.error;
  }
  if (notification.type === 'success') {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{notification.title}</h2>
      <p>{notification.message}</p>
    </section>
  );
};

export default Notification;