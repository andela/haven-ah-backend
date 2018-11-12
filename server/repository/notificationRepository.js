import Model from '../models';
import notifyWorker from '../services/notifyWorker';
import { NEW_ARTICLE, NEW_COMMENT, NEW_REACTION } from '../utilities/notificationConstants';

const { Notifications } = Model;

/**
 * Tag repository class
 */
class NotificationRepository {
  /**
 * Function to create a new notification
 * @param {object} notification
 * @returns {object} notification
 */
  static async createNotification(notification) {
    let content;
    let newNotification = {};
    switch (notification.type) {
      case NEW_ARTICLE:
        notification.notificationType = 'NEW_Article';
        break;
      case NEW_COMMENT:
        notification.notificationType = 'NEW_Comment';
        break;
      case NEW_REACTION:
        notification.notificationType = 'NEW_Reaction';
        break;
      default:
        content = null;
    }
    if (content === null) {
      return null;
    }
    newNotification = await Notifications.create(notification);
    notifyWorker(newNotification);
    return newNotification;
  }
}

export default NotificationRepository;
