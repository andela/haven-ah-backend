export default {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'AuthorsHaven API',
    description: 'An API for AuthorsHaven'
  },
  schemes: ['https'],
  host: 'haven-ah-backend.herokuapp.com',
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
    '/users': {
      get: {
        tags: ['Auth'],
        summary: 'A logged in user can get all users',
        description: 'Retrieve all users',
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'x-access-token',
            in: 'header',
            description: 'Authorization token',
            required: true,
            type: 'string'
          },
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
          summary: 'Update user profile',
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
          summary: 'Gets user by their username',
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
      '/users/opt/notifications': {
        put: {
          description: 'User can opt in/out of notifications',
          summary: 'User can opt in/out of notifications',
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
              description: 'You successfully opted in to email notifications',
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
      '/articles/search': {
        get: {
          description: 'Search for articles and filter by parameters',
          summary: 'Search for articles and filter by parameters',
          parameters: [{
            name: 'keywords',
            in: 'query',
            required: false,
            style: 'form',
            explode: true,
            schema: {
              type: 'string'
            },
            example: 'benevolence'
          }, {
            name: 'author',
            in: 'query',
            required: false,
            style: 'form',
            explode: true,
            schema: {
              type: 'string'
            },
            example: 'ucheg6'
          }, {
            name: 'x-access-token',
            in: 'header',
            required: false,
            style: 'simple',
            explode: false,
            schema: {
              type: 'string'
            },
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTQyMjAzOTI4LCJleHAiOjE1NDI4MDg3Mjh9.dVXAzTD_caGNaa004JNlMrT2lHMA2RzRFYRMIu6PkG0'
          }],
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
            },
            400: {
              description: 'Search Term must be provided'
            },
            404: {
              description: 'No article was found for this search term'
            },
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
      '/articles/:slug': {
        delete: {
          tags: ['Article'],
          summary: 'Delete an article',
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
          description: 'Returns a succes message or an error.',
          responses: {
            201: {
              description:
              'Article deleted'
            },
            401: {
              description: 'You cannot deleted this article'
            },
            500: {
              description: 'There was an internal error'
            }
          }
        },
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
        },
        put: {
          tags: ['Article'],
          summary: 'Update an article',
          consumes: ['application/x-www-form-urlencoded'],
          parameters: [
            {
              name: 'title',
              in: 'formData',
              description: 'The title that will be updated',
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
              description: 'describes the article to be updated',
              required: true,
              type: 'string'
            },
            {
              name: 'images',
              in: 'formData',
              description: 'images to be added to article',
              required: false,
              type: 'string'
            },
          ],
          description: 'Returns an article.',
          responses: {
            200: {
              description:
                'Article Updated'
            },
            500: {
              description: 'There was an internal error'
            }
          }
        },
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
      '/profiles/user/followers': {
        get: {
          description: 'Get all followers for a user',
          summary: 'Get all followers for a user',
          parameters: [{
            name: 'x-access-token',
            in: 'header',
            required: false,
            style: 'simple',
            explode: false,
            schema: {
              type: 'string'
            },
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTQyMjk3ODgwLCJleHAiOjE1NDI5MDI2ODB9.oed6dejq7G_sv53zqs56h7jVP2wzBg8jHA5cZw2sfCU'
          }],
          responses: {
            200: {
              description: 'Followers retrieved',
              content: {
                'application/json; charset=utf-8': {
                  schema: {
                    type: 'string'
                  },
                  examples: { }
                }
              }
            },
            404: {
              description: 'Followers not found'
            },
          }
        }
      },
      '/auth/google': {
        get: {
          description: 'login with google',
          summary: 'login with google',
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
        },
        get: {
          tags: ['Article'],
          summary: 'Get all comments for an article',
          consumes: ['application/x-www-form-urlencoded'],
          description: 'Returns all the comments and their replies for an article',
          responses: {
            200: {
              description: 'Comments found'
            },
            404: {
              description: 'We could not find this article'
            },
            500: {
              description: 'There was an internal error'
            }
          }
        },
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
        put: {
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
            {
              name: 'id',
              in: 'path',
              description: 'ID of comment to update',
              required: true,
              type: 'integer',
              format: 'int64'
            }
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
        },
        get: {
          tags: ['Article'],
          summary: 'Get comment using id',
          consumes: ['application/x-www-form-urlencoded'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of comment to return',
              required: true,
              type: 'integer',
              format: 'int64'
            }
          ],
          description: 'Returns updated comment on success.',
          responses: {
            200: {
              description: 'Comment and edit history found'
            },
            404: {
              description: 'We could not find this comment'
            },
            500: {
              description: 'There was an internal error'
            }
          }
        },
        delete: {
          tags: ['Article'],
          summary: 'Delete comment',
          consumes: ['application/x-www-form-urlencoded'],
          parameters: [
            {
              name: 'slug',
              in: 'path',
              description: 'The slug of the article',
              required: true,
              type: 'string'
            },
            {
              name: 'id',
              in: 'path',
              description: 'Id of comment to delete',
              required: true,
              type: 'integer',
              format: 'int64'
            }
          ],
          description: 'Returns deleted comment on success.',
          responses: {
            200: {
              description: 'Comment deleted'
            },
            404: {
              description: 'We could not find this comment'
            },
            403: {
              description: 'Sorry, you can not perform this operation.'
            },
            400: {
              description: 'Sorry, this comment is being accessed wrongly.'
            }
          }
        },
      },
      '/auth/facebook': {
        get: {
          description: 'login with facebook',
          summary: 'login with facebook',
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
        },
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
      '/admin/users/roles': {
        put: {
          tags: ['Roles'],
          summary: 'Update role',
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
              name: 'role',
              in: 'formData',
              description: 'The new role',
              required: true,
              type: 'string'
            },
            {
              name: 'username',
              in: 'formData',
              description: 'Username of user to be updated',
              required: true,
              type: 'string',
            }
          ],
          responses: {
            200: {
              description: 'Role successfully updated.'
            },
            404: {
              description: 'User not found.'
            },
            409: {
              description: 'User already has the role.'
            }
          }
        },
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
      '/users/articles/read': {
        get: {
          tags: ['Reading Stats'],
          summary: 'user reading statistics',
          consumes: ['application/x-www-form-urlencoded'],
          parameters: [
            {
              name: 'x-access-token',
              in: 'header',
              description: 'Authorization token',
              required: true,
              type: 'string'
            },
          ],
          responses: {
            200: {
              description: 'Read articles retrieved',
            },
            404: {
              description: 'user not found'
            },
          }
        },
      },
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
    '/articles/:slug/comments/:id/reactions': {
      post: {
        tags: ['Reactions'],
        summary: 'React to a comment',
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
            name: 'id',
            in: 'path',
            description: 'Id of the comment to react to',
            required: true,
            type: 'integer'
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
            description: 'You liked a comment.',
          },
          200: {
            description: 'You loved a comment',
          },
          400: {
            description: 'Bad Request.'
          },
          404: {
            description: 'comment not found.'
          },
          500: {
            description: 'Invalid input.'
          }
        }
      },
    },
    '/admin/users/complaints': {
      get: {
        tags: ['Complaints Admin'],
        summary: 'Get complaints',
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
            description: 'Complaints retrieved'
          }
        }
      },
    },
    '/admin/users/complaints/:complaintId/reply': {
      put: {
        tags: ['Complaints Admin'],
        summary: 'Reply complaints',
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
            name: 'reply',
            in: 'formData',
            description: 'Response to complaints',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'Complaint addressed'
          },
          404: {
            description: 'Complaint not found'
          }
        }
      },
    },
    '/admin/articles/featured': {
      put: {
        tags: ['Articles Admin'],
        summary: 'Admins article of the day route',
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
            in: 'formData',
            description: 'The slug of the article to be selected (If not supplied, an article will be auto-selected)',
            required: false,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'The article :slug has been auto-selected as article of the day'
          },
        }
      },
      get: {
        tags: ['Articles'],
        summary: 'Fetch article of the day route',
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'x-access-token',
            in: 'header',
            description: 'Authorization token',
            required: false,
            type: 'string'
          },
        ],
        responses: {
          200: {
            description: 'Featured article retrieved',
          },
          404: {
            description: 'There is no featured article yet',
          },
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
};
