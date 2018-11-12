const data = {
  priscilla: {
    firstName: 'Priscilla',
    lastName: 'Doe',
    username: 'i_ampriscilla',
    password: 'password',
    email: 'priscilla@gmail.com',
  },
  joe: {
    firstName: 'Joe',
    lastName: 'Doe',
    username: 'i_amjoe',
    password: 'password',
    email: 'joe@gmail.com',
  },
  dan: {
    firstName: 'Daniel',
    lastName: 'Doe',
    username: 'i_amdaniel',
    password: 'password',
    email: 'dan@gmail.com'
  },
  moses: {
    firstName: 'Moses',
    lastName: 'Moses',
    username: 'i_amMoses',
    password: 'password',
    email: 'moses@gmail.com',
  },
  michael: {
    firstName: 'Michael',
    lastName: 'Moses',
    username: 'i_amMichael',
    password: 'password',
    email: 'michael@gmail.com',
  },
  theo: {
    firstName: 'Theo',
    lastName: 'IO',
    username: 'i_amtheo',
    password: 'password',
    email: 'theo@gmail.com',
  },
  sull: {
    firstName: 'Sullivan',
    lastName: 'Doe',
    username: 'i_amsull',
    password: 'password',
    email: 'sull@gmail.com',
  },
  wiz: {
    firstName: 'Sullivan',
    lastName: 'Doe',
    username: 'i_wiz',
    password: 'password',
    email: 'wiz2@gmail.com',
  },
  wizzy: {
    firstName: 'Sullivan',
    lastName: 'Doe',
    username: 'i_wiz',
    password: 'password',
    email: 'wizzzy@gmail.com',
  },
  noPassword: {
    email: 'uche@andela.com',
    password: '',
  },
  noEmail: {
    email: '',
    password: 'thepassword',
  },
  wrongPassword: {
    email: 'sull@gmail.com',
    password: 'wrongpassword',
  },
  wrongEmail: {
    email: 'wrongemail@gg.com',
    password: '1234567890',
  },
  admin: {
    firstName: 'Admin',
    lastName: 'Doe',
    username: 'i_amadmin',
    password: 'password',
    email: 'admin@gmail.com',
  },
  jigsaw: {
    firstName: 'Victor',
    lastName: 'jiggy',
    username: 'jigsaw',
    password: 'password',
    email: 'jig@gmail.com',
  },
  sullivan: {
    firstName: 'Sullivan',
    lastName: 'wisdom',
    username: 'wizsurlivan',
    password: 'weirdo',
    email: 'wiz@gmail.com',
  },
  sullibus: {
    firstName: 'Sullivan',
    lastName: 'wisdom',
    username: 'wizslivan',
    password: 'weirdo',
    email: 'wizard@gmail.com',
  },
  xtremeCassey: {
    firstName: 'Sullivan',
    lastName: 'wisdom',
    username: 'extremeCase',
    password: 'weirdo',
    email: 'wizardry@gmail.com',
  },
  jigsawArticle: {
    title: 'Vanity upon vanity',
    slug: 'Vanity-upon-vanity-201811234497',
    userid: 1,
    readtime: 500,
    body: `
      On the other hand, we denounce with righteous indignation and
      dislike men who are so beguiled and demoralized by the charms
      of pleasure of the moment, so blinded by desire, that they cannot
      foresee the pain and trouble that are bound to ensue; and equal
      blame belongs to those who fail in their duty through weakness
      of will, which is the same as saying through shrinking from toil
      and pain.`,
    description: 'On the hedonism of men',
    images: [
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
    ],
  },
  jigArticle: {
    title: 'Vanity upon vanity',
    body: `
      On the other hand, we denounce with righteous indignation and
      dislike men who are so beguiled and demoralized by the charms
      of pleasure of the moment, so blinded by desire, that they cannot
      foresee the pain and trouble that are bound to ensue; and equal
      blame belongs to those who fail in their duty through weakness
      of will, which is the same as saying through shrinking from toil
      and pain.`,
    description: 'On the hedonism of men',
    images: `
      https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895,
      https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895,
      https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895,
      https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895
    `,
  },
  sulliArt: {
    title: 'Vanity upon vanity',
    slug: 'Vanity-upon-vanity-201811234497',
    userid: 2,
    readtime: 500,
    body: `
      On the other hand, we denounce with righteous indignation and
      dislike men who are so beguiled and demoralized by the charms
      of pleasure of the moment, so blinded by desire, that they cannot
      foresee the pain and trouble that are bound to ensue; and equal
      blame belongs to those who fail in their duty through weakness
      of will, which is the same as saying through shrinking from toil
      and pain.`,
    description: 'On the hedonism of men',
    images: [
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
    ],
  },
  sampleArticle: {
    title: 'Looking ahead lol',
    slug: 'Looking-ahead-lol-201811234490',
    userid: 2,
    readtime: 10,
    body: 'Just a sample article with no heading.',
    description: 'Sample description',
    images: [
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
    ]
  },
  wizArt: {
    title: 'Vanity upon vanity',
    slug: 'Vanity-upon-vanity-2018112844989',
    userid: 2,
    readtime: 500,
    body: `
      On the other hand, we denounce with righteous indignation and
      dislike men who are so beguiled and demoralized by the charms
      of pleasure of the moment, so blinded by desire, that they cannot
      foresee the pain and trouble that are bound to ensue; and equal
      blame belongs to those who fail in their duty through weakness
      of will, which is the same as saying through shrinking from toil
      and pain.`,
    description: 'On the hedonism of men',
    images: [
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
    ],
  },
  wisdomArt: {
    title: 'Vanity upon vanity',
    slug: 'Vanity-upon-vanity-20181123797',
    userid: 2,
    readtime: 500,
    body: `
      On the other hand, we denounce with righteous indignation and
      dislike men who are so beguiled and demoralized by the charms
      of pleasure of the moment, so blinded by desire, that they cannot
      foresee the pain and trouble that are bound to ensue; and equal
      blame belongs to those who fail in their duty through weakness
      of will, which is the same as saying through shrinking from toil
      and pain.`,
    description: 'On the hedonism of men',
    images: [
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
    ],
  },
  goodUserUpdate: {
    firstName: 'Mike',
    lastName: 'Mos',
    facebook: 'www.facebook.com',
    google: 'www.google.com',
    twitter: 'www.google.com',
    bio: 'This is me. I am unique.',
    image: 'https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/minion.jpg',
  },

  usernameUpdate: {
    username: 'i_amsull',
    lastName: 'Mos',
    facebook: 'www.facebook.com',
    google: 'www.google.com',
    twitter: 'www.google.com',
    bio: 'This is me. I am unique.',
    image: 'https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/minion.jpg',
  },

  noImageUpdate: {
    firstName: 'Mike',
    lastName: 'Mos',
    facebook: 'www.facebook.com',
    google: 'www.google.com',
    twitter: 'www.google.com',
    bio: 'This is me. I am unique.'
  },

  badUserUpdate: {
    email: 'Hullabaloo@email.com',
    facebook: 'www.facebook.com',
    google: 'www.google.com',
    twitter: 'www.google.com',
    bio: 'This is me. I am unique.',
    image: 'https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/minion.jpg',
  },

  badImageUpdate1: {
    image: '/Users/theodoreokafor/documents/projects/haven-ah-backend/server/tests/utilities/octocat.txt',
  },

  badImageUpdate2: {
    image: 'https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/minion123.jpg',
  },

  badBioUpdate: {
    facebook: 'www.facebook.com',
    google: 'www.google.com',
    twitter: 'www.google.com',
    bio: `This is me. I am unique. sjdnms sdnsm j,samns djsads dsa,mds sanjsdfdsnkjdsfa
      shsndfhd fjdfnm,fd dfndf dfmna fdskfbnm.FKLBD FADFNAKDF ANBjkbkjfd jdajd kfjdfbd fjdf djdfd
      djbfdf djbdfafbdfnbnafbdnfbfbdbfnfa nfdbabfd fdfbanbdf dnsbafnbdf dnbnad f dfnbdsn fdnbfd fn`,
    imageUrl: 'www.cloudinary.com/sjdhsjds',
  },

  xProdigy: {
    firstName: 'Theo',
    lastName: 'Prodigy',
    username: 'xtreme',
    password: 'password',
    email: 'x@gmail.com',
  },

  badComment: {
    highlightedText: `
    On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and
    demoralized by the charms of pleasure of the moment.`,
    parentId: 1,
  },

  goodComment: {
    body: `
    On the other hand, we denounce with righteous indignation and
    dislike men who are so beguiled and demoralized by the charms
    of pleasure of the moment, so blinded by desire, that they cannot
    foresee the pain and trouble that are bound to ensue; and equal
    blame belongs to those who fail in their duty through weakness
    of will, which is the same as saying through shrinking from toil
    and pain.`,
    highlightedText: `
    On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and
    demoralized by the charms of pleasure of the moment.`,
  },

  repoComment: {
    body: `
    On the other hand, we denounce with righteous indignation and
    dislike men who are so beguiled and demoralized by the charms
    of pleasure of the moment, so blinded by desire, that they cannot
    foresee the pain and trouble that are bound to ensue; and equal
    blame belongs to those who fail in their duty through weakness
    of will, which is the same as saying through shrinking from toil
    and pain.`,
    articleId: 1,
    userId: 1,
    highlightedText: `
    On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and
    demoralized by the charms of pleasure of the moment.`,
  },
  anotherGoodComment: {
    body: `
    On the other hand, we denounce with righteous indignation and
    dislike men who are so beguiled and demoralized by the charms
    of pleasure of the moment, so blinded by desire, that they cannot
    foresee the pain and trouble that are bound to ensue; and equal
    blame belongs to those who fail in their duty through weakness
    of will, which is the same as saying through shrinking from toil
    and pain.`,
  },
  goodReply: {
    body: `
    On the other hand, we denounce with righteous indignation and
    dislike men who are so beguiled and demoralized by the charms
    of pleasure of the moment, so blinded by desire, that they cannot
    foresee the pain and trouble that are bound to ensue; and equal
    blame belongs to those who fail in their duty through weakness
    of will, which is the same as saying through shrinking from toil
    and pain.`,
  },
  complaint: {
    userId: 2,
    articleId: 1,
    complaintType: 'Rules Violation',
    complaintBody: 'I am a very unique complaint and I tend to be very very unreasonable',
  },

  invalidComplaint: {
    complaintType: 'Rules',
    complaintBody: 'I am an invalid complaint expected to throw a 500 error',
  },

  sampleComplaint: {
    complaintType: 'Rules Violation',
    complaintBody: 'I am a very unique complaint and I tend to be very very unreasonable',
  },
  commentHistData: {
    commentId: 1,
    oldComment: `
    On the other hand, we denounce with righteous indignation and
    dislike men who are so beguiled and demoralized by the charms
    of pleasure of the moment, so blinded by desire.`,
  },
  dummyNotifications: {
    newComment: {
      userId: 2,
      articleId: 7,
      type: 'NEW_COMMENT_UPDATE',
      content: 'A new comment has been posted'
    },
    newArticle: {
      userId: 2,
      articleId: 7,
      type: 'NEW_ARTICLE_UPDATE',
      content: 'A new article has been posted'
    },
    newReaction: {
      userId: 2,
      articleId: 7,
      type: 'NEW_REACTION_UPDATE',
      content: 'A user reacted on an article you currently follow'
    },
    newInvalidPost: {
      userId: 2,
      articleId: 7,
      type: 'INVALID_POST',
      content: 'A user reacted on an article you currently follow'
    },
    wrongNotifyType: {
      dataValues: {
        userId: 2,
        articleId: 7,
        type: 'INVALID_TYPE',
        content: 'A user reacted on an article you currently follow'
      }
    }
  }
};

export default data;
