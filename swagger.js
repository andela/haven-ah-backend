export default {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'AuthorsHaven API',
    description: 'An API for AuthorsHaven'
  },
  schemes: ['https'],
  host: 'https://haven-ah-backend.herokuapp.com',
  basePath: '/api/v1/',
  tags: [
    {
      name: 'Auth',
      description: 'Authenticate a user'
    }
  ],
  paths: {
    '/users/signin': {
      post: {
        tags: ['Auth'],
        summary: 'Login the API to get authentication token',
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'email',
            in: 'formData',
            description: 'The email for signin',
            required: true,
            type: 'string'
          },
          {
            name: 'password',
            in: 'formData',
            description: 'The password for signin in clear text',
            required: true,
            type: 'string'
          }
        ],
        description: 'Returns an authentication token on success.',
        responses: {
          200: {
            description:
               'Hello user, Welcome Back!'
          },
          400: {
            description: 'incorrect password, please try again'
          }
        }
      }
    },
    '/users/signup': {
      post: {
        tags: ['Auth'],
        summary: 'Create an account for a new user on the API',
        description: 'Returns success 201 on success.',
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'firstname',
            in: 'formData',
            description:
                'The firstname of the user account to be created',
            required: true,
            type: 'string'
          },
          {
            name: 'lastname',
            in: 'formData',
            description:
                'The lastname for the user account to be created',
            required: true,
            type: 'string'
          },
          {
            name: 'email',
            in: 'formData',
            description:
                'The email for the user account to be created',
            required: true,
            type: 'string'
          },
          {
            name: 'username',
            in: 'formData',
            description:
                'The username for the user account to be created',
            required: true,
            type: 'string'
          },
          {
            name: 'image_url',
            in: 'formData',
            description:
                'The image_url for the user account to be created',
            required: true,
            type: 'string'
          },
          {
            name: 'password',
            in: 'formData',
            description:
                'The password for the user account to be created',
            required: true,
            type: 'string'
          },
          {
            name: 'oauth_type',
            in: 'formData',
            description:
                'The oauth_type of the user account to be created',
            required: false,
            type: 'string'
          },
          {
            name: 'oauth_id',
            in: 'formData',
            description:
                'The oauth_id of the user account to be created',
            required: false,
            type: 'string'
          },
        ],
        responses: {
          201: {
            description: 'New User created successfully',
            schema: {
              $ref: '#/definitions/User'
            }
          },
          400: {
            description: 'User Already Exists'
          },
          500: {
            description: 'Error Saving User'
          }
        }
      }
    },
    '/users/resetpassword': {
      post: {
        tags: ['Auth'],
        summary: 'Change password on forgot password',
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'x-access-token',
            in: 'header',
            description: 'Authorization token',
            required: true,
            type: 'string'
          },
          {
            name: 'email',
            in: 'formData',
            description: 'The email used on signup',
            required: true,
            type: 'string'
          }
        ],
        description: 'Sends a Mail to User.',
        responses: {
          200: {
            description: 'Please Check Mail to Change Password'
          },
          400: {
            description: 'Error Sending Mail To Change Password'
          }
        }
      }
    },
    '/users/email/verify/:id': {
      get: {
        tags: ['Auth'],
        summary: 'Verify Token Sent with Email',
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'x-access-token',
            in: 'header',
            description: 'Authorization token',
            required: true,
            type: 'string'
          }
        ],
        description: 'Verify Token Sent with Email ',
        responses: {
          200: {
            description:
                            'Token Verification Successful, Please Change Password'
          },
          400: {
            description: 'Token Verification Failed'
          }
        }
      }
    },
    '/users/email/changepassword': {
      post: {
        tags: ['Auth'],
        summary: 'Actual Change of Password',
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'x-access-token',
            in: 'header',
            description: 'Authorization token',
            required: true,
            type: 'string'
          },
          {
            name: 'newpassword',
            in: 'formData',
            description: 'The newpassword to be changed',
            required: true,
            type: 'string'
          },
          {
            name: 'token',
            in: 'formData',
            description: 'The verified token',
            required: true,
            type: 'string'
          }
        ],
        description: 'Actual Change of Password',
        responses: {
          200: {
            description: 'Password Updated Successfully'
          },
          400: {
            description: 'There Was an Error Changing Password'
          }
        }
      }
    },
    '/users/google': {
      get: {
        tags: ['Auth'],
        summary: 'Login using Google OAUTH',
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'x-access-token',
            in: 'header',
            description: 'Authorization token',
            required: true,
            type: 'string'
          }
        ]
      }
    },
    '/users/facebook': {
      get: {
        tags: ['Auth'],
        summary: 'Login using Facebook OAUTH',
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'x-access-token',
            in: 'header',
            description: 'Authorization token',
            required: true,
            type: 'string'
          }
        ]
      }
    },
    '/users': {
      get: {
        tags: ['Auth'],
        summary: 'A logged in user can get all users',
        description: 'Retrieve all users',
      },
      consumes: ['application/x-www-form-urlencoded'],
      parameters: [
        {
          name: 'x-access-token',
          in: 'header',
          description: 'Authorization token',
          required: true,
          type: 'string'
        }
      ],
      responses: {
        200: {
          description: 'Success'
        },
        401: {
          description: 'Failed to verify token! please provide a valid token'
        }
      }
    },
    '/articles': {
      post: {
        tags: ['Article'],
        summary: 'Create article',
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'title',
            in: 'formData',
            description: 'The title of the article to be created',
            required: true,
            type: 'string'
          },
          {
            name: 'body',
            in: 'formData',
            description: 'The content of the article',
            required: true,
            type: 'string'
          },
          {
            name: 'description',
            in: 'formData',
            description: 'describes the article to be created',
            required: false,
            type: 'string'
          },
          {
            name: 'images',
            in: 'formData',
            description: 'image added to article',
            required: false,
            type: 'string'
          }
        ],
        description: 'Returns an authentication token on success.',
        responses: {
          201: {
            description: 'Article Created!'
          },
          500: {
            description: 'There was an internal error'
          }
        }
      }
    },
    '/profiles/:username/follow': {
      post: {
        tags: ['Profiles'],
        summary: 'Follow a user',
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'x-access-token',
            in: 'header',
            description: 'Authorization token',
            required: true,
            type: 'string'
          },
          {
            name: 'username',
            in: 'path',
            description: 'Username of user to follow',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          201: {
            description: 'Successful operation.'
          },
          400: {
            description: 'Error following this user'
          },
          404: {
            description: 'User not found'
          }
        }
      },
      delete: {
        tags: ['Profiles'],
        summary: 'Unfollow a user',
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'x-access-token',
            in: 'header',
            description: 'Authorization token',
            required: true,
            type: 'string'
          },
          {
            name: 'username',
            in: 'path',
            description: 'Username of user to follow',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'Successful operation.'
          },
          400: {
            description: 'Error unfollowing this user'
          },
          404: {
            description: 'User not found'
          }
        }
      }
    },
    '/api/v1/auth/google': {
      get: {
        description: 'Auto generated using Swagger Inspector',
        responses: {
          200: {
            description: 'Auto generated using Swagger Inspector',
            content: {
              'text/html; charset=utf-8': {
                schema: {
                  type: 'string'
                },
                examples: { }
              }
            }
          }
        }
      }
    },
    '/api/v1/auth/facebook': {
      get: {
        description: 'Auto generated using Swagger Inspector',
        responses: {
          200: {
            description: 'Auto generated using Swagger Inspector',
            content: {
              'application/json; charset=utf-8': {
                schema: {
                  type: 'string'
                },
                examples: { }
              }
            }
          }
        }
      }
    }
  }
};
