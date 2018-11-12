import notifiers from './notifiers';

const {
  articleNotifier,
  commentNotifier,
  reactionNotifier
} = notifiers;

export default async (notification) => {
  const { notificationType } = notification.dataValues;
  let mailInformation;
  let message;
  let title;
  switch (notificationType) {
    case 'NEW_Article':
      message = 'created a new article';
      title = 'NEW ARTICLE UPDATE';
      mailInformation = await articleNotifier(notification.dataValues, message, title);
      break;
    case 'NEW_Comment':
      message = 'posted a new comment on an article you follow';
      title = 'NEW COMMENT UPDATE';
      mailInformation = await commentNotifier(notification.dataValues, message, title);
      break;
    case 'NEW_Reaction':
      message = 'reacted on an article you follow';
      title = 'NEW REACTION UPDATE';
      mailInformation = await reactionNotifier(notification.dataValues, message, title);
      break;
    default:
      return null;
  }

  if (mailInformation && mailInformation.accepted.length > 0) {
    await notification.destroy();
    return true;
  }
  return false;
};
