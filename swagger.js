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
    '/users/:username': {
      put: {
        description: 'Update user profile',
        parameters: [{
          name: 'x-access-token',
          in: 'header',
          required: false,
          style: 'simple',
          explode: false,
          schema: {
            type: 'string'
          },
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTQxNDM5MTY0LCJleHAiOjE1NDIwNDM5NjR9.Sf7SOMjpeR7jNEmiOd1Opmsj7k62nUUYMXmJQAuh118'
        }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/body'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'updates the users',
            content: {
              'application/json; charset=utf-8': {
                schema: {
                  type: 'string'
                },
                examples: {}
              }
            }
          },
          401: {
            description: 'Not permitted to complete action',
            content: {
              'application/json; charset=utf-8': {
                schema: {
                  type: 'string'
                },
                examples: {}
              }
            }
          },
          409: {
            description: 'When the usernames supplied are conflicting',
            content: {
              'application/json; charset=utf-8': {
                schema: {
                  type: 'string'
                },
                examples: {}
              }
            }
          },
          501: {
            description: 'Unsupported request',
            content: {
              'application/json; charset=utf-8': {
                schema: {
                  type: 'string'
                },
                examples: {}
              }
            }
          }
        }
      },
      get: {
        description: 'Gets user by their username',
        parameters: [{
          name: 'x-access-token',
          in: 'header',
          required: false,
          style: 'simple',
          explode: false,
          schema: {
            type: 'string'
          },
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTQxNDM5MTY0LCJleHAiOjE1NDIwNDM5NjR9.Sf7SOMjpeR7jNEmiOd1Opmsj7k62nUUYMXmJQAuh118'
        }],
        responses: {
          200: {
            description: 'Gets user successfully',
            content: {
              'application/json; charset=utf-8': {
                schema: {
                  type: 'string'
                },
                examples: {}
              }
            }
          },
          403: {
            description: 'Unauthorised request',
            content: {
              'application/json; charset=utf-8': {
                schema: {
                  type: 'string'
                },
                examples: {}
              }
            }
          }
        }
      }
    },
    '/api/v1/users/opt/notifications': {
      put: {
        description: 'Auto generated using Swagger Inspector',
        parameters: [{
          name: 'x-access-token',
          in: 'header',
          required: false,
          style: 'simple',
          explode: false,
          schema: {
            type: 'string'
          },
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTQxNzU2ODMxLCJleHAiOjE1NDIzNjE2MzF9.AmaQksHtt_MNimNhEe7BUFYlritbG10fCV9fb38bomM'
        }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/body'
              },
              examples: {
                0: {
                  value: '{\n    \n    "email": "akogwuuche@ymail.com",\n    "password": "presley0080"\n}'
                }
              }
            }
          }
        },
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
    },
    '/api/v1/users/opt/notifications': {
      put: {
        description: 'Auto generated using Swagger Inspector',
        parameters: [{
          name: 'x-access-token',
          in: 'header',
          required: false,
          style: 'simple',
          explode: false,
          schema: {
            type: 'string'
          },
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTQxNzU2ODMxLCJleHAiOjE1NDIzNjE2MzF9.AmaQksHtt_MNimNhEe7BUFYlritbG10fCV9fb38bomM'
        }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/body'
              },
              examples: {
                0: {
                  value: '{\n    \n    "email": "akogwuuche@ymail.com",\n    "password": "presley0080"\n}'
                }
              }
            }
          }
        },
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
    },
    '/articles': {
      post: {
        tags: ['Article'],
        summary: 'Create article and associate tags',
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
          },
          {
            name: 'tags',
            in: 'formData',
            description: 'tags for the article',
            required: false,
            type: 'string'
          }
        ],
        description: 'Returns an article.',
        responses: {
          201: {
            description:
              'Article Created and Tags associated'
          },
          500: {
            description: 'There was an internal error'
          }
        }
      }
    },
    '/articles/:slug/rating': {
      post: {
        tags: ['Article'],
        summary: 'Rate an article',
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
            name: 'rating',
            in: 'formData',
            description: 'The rating for an article',
            required: true,
            type: 'integer'
          }
        ],
        description: 'Returns an authentication token on success.',
        responses: {
          201: {
            description:
              'Article rated'
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
                examples: {}
              }
            }
          }
        }
      }
    },
    '/articles/:slug/comments': {
      post: {
        tags: ['Article'],
        summary: 'Create comment',
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'body',
            in: 'formData',
            description: 'The content of the comment',
            required: true,
            type: 'string'
          },
          {
            name: 'highlightedtext',
            in: 'formData',
            description: 'the highlighted text in the article',
            required: false,
            type: 'string'
          },
        ],
        description: 'Returns created comment on success.',
        responses: {
          201: {
            description: 'Comment created'
          },
          404: {
            description: 'We could not find this article'
          },
          500: {
            description: 'There was an internal error'
          }
        }
      }
    },
    '/articles/:slug/comments/:parentId': {
      post: {
        tags: ['Article'],
        summary: 'Create reply',
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'body',
            in: 'formData',
            description: 'The content of the reply',
            required: true,
            type: 'string'
          },
        ],
        description: 'Returns created comment on success.',
        responses: {
          201: {
            description: 'Reply created'
          },
          404: {
            description: 'We could not find the parent comment with id: '
          },
          500: {
            description: 'There was an internal error'
          }
        }
      }
    },
    '/articles/:slug/comments/:id': {
      post: {
        tags: ['Article'],
        summary: 'Update comment',
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'body',
            in: 'formData',
            description: 'The content of the comment',
            required: true,
            type: 'string'
          },
        ],
        description: 'Returns updated comment on success.',
        responses: {
          200: {
            description: 'Comment updated'
          },
          404: {
            description: 'We could not find this comment'
          },
          500: {
            description: 'There was an internal error'
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
                examples: {}
              }
            }
          }
        }
      }
    },
    '/articles/:slug/bookmarks': {
      post: {
        tags: ['Bookmark'],
        summary: 'Bookmark an article',
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'userId',
            in: 'formData',
            description: 'The user id',
            required: true,
            type: 'integer'
          },
          {
            name: 'articleId',
            in: 'formData',
            description: 'The article id',
            required: true,
            type: 'integer'
          },
        ],
        description: 'Returns success message.',
        responses: {
          201: {
            description:
              'article successfully bookmarked'
          },
          404: {
            description:
              'article not found',
          }
        }
      },
      '/articles/:slug/complaints': {
        post: {
          tags: ['Complaints'],
          summary: 'Report an article',
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
              name: 'slug',
              in: 'path',
              description: 'Slug of article to report',
              required: true,
              type: 'string'
            },
            {
              name: 'complaintType',
              in: 'body',
              description: 'Report type',
              required: true,
              type: 'string'
            },
            {
              name: 'complaintBody',
              in: 'body',
              description: 'Report body',
              required: true,
              type: 'string'
            },
          ],
          responses: {
            201: {
              description: 'Successful operation.'
            },
            400: {
              description: 'Invalid Inputs.'
            },
            404: {
              description: 'Article not found'
            }
          }
        },
      },
      '/articles/:slug': {
        get: {
          description: 'Gets an article by the slug',
          parameters: [{
            name: 'slug',
            in: 'path',
            required: true,
            schema: {
              type: 'string'
            },
            example: 'just-a-sample-slug-10093849'
          }],
          responses: {
            200: {
              description: 'Gets Article successfully',
              content: {
                'application/json; charset=utf-8': {
                  schema: {
                    type: 'string'
                  },
                  examples: {}
                }
              }
            },
            404: {
              description: 'Article not found',
              content: {
                'application/json; charset=utf-8': {
                  schema: {
                    type: 'string'
                  },
                  examples: {}
                }
              }
            }
          }
        }
      },
    },
  },
  components: {
    schemas: {
      body_1: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string'
          },
          lastName: {
            type: 'string'
          },
          twitter: {},
          facebook: {
            type: 'string'
          },
          bio: {
            type: 'string'
          },
          isConfirmed: {
            type: 'boolean'
          },
          google: {}
        }
      },
      body: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string'
          },
          lastName: {
            type: 'string'
          },
          twitter: {},
          facebook: {
            type: 'string'
          },
          bio: {
            type: 'string'
          },
          isConfirmed: {
            type: 'boolean'
          },
          google: {},
          id: {
            type: 'integer',
            format: 'int32'
          },
          email: {
            type: 'string'
          },
          username: {
            type: 'string'
          }
        }
      }
    }
  },
  '/articles/:slug/reactions': {
    post: {
      tags: ['Reactions'],
      summary: 'React to an article',
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
          name: 'slug',
          in: 'path',
          description: 'Slug of article to react to',
          required: true,
          type: 'string'
        },
        {
          name: 'reactionType',
          in: 'body',
          description: 'Reaction type',
          required: true,
          type: 'string'
        },
      ],
      responses: {
        201: {
          description: 'You liked an article.',
        },
        200: {
          description: 'You disliked an article.',
        },
        400: {
          description: 'Bad Request.'
        },
        404: {
          description: 'Article not found.'
        },
        500: {
          description: 'Invalid input.'
        }
      }
    },
  },
  schemas: {
    body: {
      type: 'object',
      properties: {
        password: {
          type: 'string'
        },
        email: {
          type: 'string'
        }
      }
    }
  }
};
