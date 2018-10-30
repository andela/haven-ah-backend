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
  }
};

export default data;
