const FULL_CONTROL = ['GET', 'POST', 'PUT', 'DELETE'];
export default {
  user: {
    articles: {
      allowedMethods: FULL_CONTROL
    },
    users: {
      allowedMethods: ['GET', 'PUT', 'POST']
    },
    profiles: {
      allowedMethods: ['POST', 'DELETE']
    }
  },
  admin: {
    articles: {
      allowedMethods: FULL_CONTROL
    },
    users: {
      allowedMethods: FULL_CONTROL
    },
    profiles: {
      allowedMethods: FULL_CONTROL
    },
    admin: {
      allowedMethods: ['GET', 'POST', 'PUT']
    }
  }
};
