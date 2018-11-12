import Model from '../../models';
import emailer from '../emailService';
import userRepo from '../../repository/userRepository';
import createArticleTemplate from '../../emailTemplates/newArticleTemplate';

const { User, Follower } = Model;

export default async (notification, message, emailTitle) => {
  const { userId, articleId } = notification;

  const sender = await userRepo.getUserByParam('id', userId);
  const senderName = sender.username;
  const followers = await Follower.findAll({
    where: {
      userId
    }
  });
  const receipientIds = followers.map(follower => follower.dataValues.followerId);
  const recipents = await User.findAll({
    where: {
      id: {
        $in: receipientIds
      },
      allowNotifications: true
    },
  });
  const receipientEmails = recipents.map(recipient => recipient.dataValues.email).join(',');
  if (receipientEmails === '') {
    return {
      accepted: []
    };
  }
  const htmlBody = createArticleTemplate(senderName, message, articleId);
  const mailOptions = emailer.setMailOptions(
    receipientEmails,
    emailTitle,
    htmlBody
  );
  const mailInformation = await emailer.sendEmail(mailOptions);
  return mailInformation;
};
