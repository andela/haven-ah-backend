import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import data from '../utilities/mockData';
import createToken from '../../utilities/jwtGenerator';
import userRepo from '../../repository/userRepository';

const { expect } = chai;
chai.use(chaiHttp);

const {
  jigArticle, jigsaw, complaint, invalidComplaint, sampleComplaint, badJigArticle,
} = data;
const adminToken = createToken(2);
let jwtoken;
let newUser;
let jigSlug;
let invalidUserToken;

describe('Get no article', () => {
  it('should return response if no article exists', async () => {
    const response = await chai.request(app)
      .get('/api/v1/articles?limit=20&page=1');
    expect(response.body.status).to.be.equal(200);
    expect(response.body.message).to.be.deep.equals('no articles found');
  });
});

describe('Post a new article:', () => {
  before(async () => {
    newUser = await userRepo.createUser(jigsaw, 'user');
    jwtoken = createToken(newUser.id);
    invalidUserToken = createToken(2000);
  });

  it('should post a new article in the database', async () => {
    const response = await chai.request(app)
      .post('/api/v1/articles')
      .set({
        'x-access-token': jwtoken,
      })
      .send(jigArticle);

    jigSlug = response.body.data.slug;

    expect(response).to.have.status(201);
    expect(response.body.message).to.be.deep
      .equals('Article Created');
  });

  it('should not post a new article if a field is missing', async () => {
    const response = await chai.request(app)
      .post('/api/v1/articles')
      .set({
        'x-access-token': jwtoken,
      })
      .send(badJigArticle);

    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep
      .equals('Incomplete fields');
  });

  it('should deny access to non existent user', async () => {
    const response = await chai.request(app)
      .post('/api/v1/articles')
      .set({
        'x-access-token': invalidUserToken,
      })
      .send(jigArticle);

    expect(response).to.have.status(403);
    expect(response.body.message).to.be.deep
      .equals('ACCESS DENIED');
  });

  it('should post a new article, new tags and create associations', async () => {
    const response = await chai.request(app)
      .post('/api/v1/articles')
      .set({
        'x-access-token': jwtoken,
      })
      .send({
        ...jigArticle,
        tags: 'philosophy metaphysics vanity'
      });
    jigSlug = response.body.data.newArticle.slug;
    expect(response).to.have.status(201);
    expect(response.body.message).to.be.deep
      .equals('Article Created and Tags associated');
  });
});

describe('Get all articles', () => {
  it('should return all articles in the database', async () => {
    const response = await chai.request(app)
      .get('/api/v1/articles?limit=20&page=1');
    expect(response.body.status).to.be.equal(200);
    expect(response.body.message).to.be.deep.equals('all articles');
  });

  it('should return all articles in the database when offset and limit is not passed', async () => {
    const response = await chai.request(app)
      .get('/api/v1/articles');
    expect(response.body.status).to.be.equal(200);
    expect(response.body.message).to.be.deep.equals('all articles');
  });
});

describe('Rating an article', () => {
  it('should rate an article in the database', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${jigSlug}/rating`)
      .set({
        'x-access-token': jwtoken,
      })
      .send({
        rating: 2
      });

    expect(response.body.status).to.be.equal(201);
    expect(response.body.message).to.be.deep.equals('Article rated');
  });

  it('should update previous rating with new value', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${jigSlug}/rating`)
      .set({
        'x-access-token': jwtoken,
      })
      .send({
        rating: 4
      });

    expect(response.body.message).to.be.deep.equals('Article rated');
  });

  it('should prevent outrageous ratings', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${jigSlug}/rating`)
      .set({
        'x-access-token': jwtoken,
      })
      .send({
        rating: 9
      });

    expect(response.body.status).to.be.equal(400);
    expect(response.body.message).to.be.deep.equals('Rating must be between 1 and 5');
  });

  it('should prevent posts without ratings', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${jigSlug}/rating`)
      .set({
        'x-access-token': jwtoken,
      })
      .send({});

    expect(response.body.status).to.be.equal(400);
    expect(response.body.message).to.be.deep.equals('Incomplete fields');
  });
});

describe('POST /api/v1/articles/:slug/complaints', () => {
  let token;
  before(async () => {
    const user = await userRepo.createUser({
      email: 'new@gmail.com',
      username: 'my_username',
      firstName: 'sample',
      lastName: 'user',
      password: 'password'
    }, 'user');
    token = createToken(user.id);
  });

  it('should return an error if the article does not exist', async () => {
    const response = await chai.request(app)
      .post('/api/v1/articles/just-some-weird-90293494/complaints')
      .set({
        'x-access-token': jwtoken,
      })
      .send(complaint);

    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep
      .equals('This article was not found.');
  });

  it('should return an error if the complaint type is invalid', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${jigSlug}/complaints`)
      .set({
        'x-access-token': token,
      })
      .send(invalidComplaint);
    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep.equals('Bad Request');
  });

  it('should return an error if the complaintType and body is not supplied', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${jigSlug}/complaints`)
      .set({
        'x-access-token': token,
      })
      .send();
    expect(response).to.have.status(400);
    expect(response.body.error.problem).to.have.keys('complaintType', 'complaintBody');
    expect(response.body.error.problem.complaintType).to.be.deep
      .equals('The complaintType parameter must be supplied');
  });

  it('should return an error if the complaintBody is not valid', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${jigSlug}/complaints`)
      .set({
        'x-access-token': token,
      })
      .send({ complaintBody: 109302 });
    expect(response).to.have.status(400);
    expect(response.body.error.problem).to.have.keys('complaintType', 'complaintBody');
    expect(response.body.error.problem.complaintBody).to.be.deep
      .equals('The complaintBody parameter supplied is not a valid string');
  });

  it('should return an error if the user wrote the article', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${jigSlug}/complaints`)
      .set({
        'x-access-token': jwtoken,
      })
      .send(complaint);

    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep
      .equals('Sorry, you can not raise a complaint against your article.');
  });

  it('should return a status 201 if complaint was posted', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${jigSlug}/complaints`)
      .set({
        'x-access-token': token,
      })
      .send(sampleComplaint);

    expect(response).to.have.status(201);
    expect(response.body.message).to.be.deep
      .equals('You have logged a complaint on this article.');
  });
});

describe('PATCH api/v1/articles/:slug', () => {
  it('should update an article in the database', async () => {
    const response = await chai.request(app)
      .patch(`/api/v1/articles/${jigSlug}`)
      .set({
        'x-access-token': jwtoken,
      })
      .send(jigArticle);
    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep
      .equals('Article Updated');
  });
  it('should deny access if user is not authorised', async () => {
    const response = await chai.request(app)
      .patch(`/api/v1/articles/${jigSlug}`)
      .set({
        'x-access-token': invalidUserToken,
      })
      .send(jigArticle);
    expect(response).to.have.status(401);
    expect(response.body.message).to.be.deep
      .equals('You are not permitted to complete this action');
  });
});

describe('Fetch the article of the day', () => {
  it('should not select an article as the article of the day', async () => {
    const response = await chai.request(app)
      .get('/api/v1/articles/featured');

    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep
      .equals('There is no featured article yet');
  });
});

describe('Make an article the article of the day', () => {
  it('should select an article as the article of the day', async () => {
    const response = await chai.request(app)
      .put('/api/v1/admin/articles/featured')
      .set({
        'x-access-token': adminToken,
      })
      .send({
        slug: jigSlug,
      });

    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep
      .equals(`You have selected article ${jigSlug} as article of the day`);
  });

  it('should select an article as the article of the day', async () => {
    const response = await chai.request(app)
      .get('/api/v1/articles/featured');

    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep
      .equals('Featured article retrieved');
  });

  it('should deny user access', async () => {
    const response = await chai.request(app)
      .put('/api/v1/admin/articles/featured')
      .set({
        'x-access-token': jwtoken,
      })
      .send({
        slug: jigSlug,
      });

    expect(response).to.have.status(403);
    expect(response.body.message).to.be.deep
      .equals('ACCESS DENIED');
  });

  it('should auto-select an article as the article of the day', async () => {
    const response = await chai.request(app)
      .put('/api/v1/admin/articles/featured')
      .set({
        'x-access-token': adminToken,
      });
    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep
      .equals(`The article ${response.body.data.slug} has been auto-selected as article of the day`);
  });
});

describe('GET api/v1/articles/:slug', () => {
  it('should fetch the article of the day', async () => {
    const response = await chai.request(app)
      .get('/api/v1/articles/some-random-slug-1093848');

    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep.equals('This article was not found');
  });

  it('should return article if found', async () => {
    const response = await chai.request(app)
      .get(`/api/v1/articles/${jigSlug}`);

    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep.equals('Article retrieved');
    expect(response.body).to.have.keys('status', 'message', 'data');
    expect(response.body.data.Author).to.have
      .keys('id', 'firstName', 'lastName', 'username', 'imageUrl', 'bio');
  });

  it('should delete a single article from the database', async () => {
    const response = await chai.request(app)
      .delete(`/api/v1/articles/${jigSlug}`)
      .set({
        'x-access-token': createToken(5000),
      });

    expect(response).to.have.status(401);
    expect(response.body.message).to.be.deep
      .equals('You cannot deleted this article');
  });

  it('should delete a single article from the database', async () => {
    const response = await chai.request(app)
      .delete(`/api/v1/articles/${jigSlug}`)
      .set({
        'x-access-token': jwtoken,
      });

    expect(response).to.have.status(202);
    expect(response.body.message).to.be.deep
      .equals('Article deleted');
  });
});

describe('GET api/v1/articles/search', () => {
  it('should return articles according to keywords search parameters', async () => {
    const response = await chai.request(app)
      .get('/api/v1/articles/search?keywords=vanity upon vanity');
    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep.equals('Found Articles');
    expect(response.body).to.have.keys('status', 'message', 'data');
    expect(response.body.data[0]).to.have
      .keys('id', 'title', 'description', 'images', 'Author', 'userid', 'readtime', 'slug', 'Bookmark');
  });

  it('should return articles according to author search parameters', async () => {
    const response = await chai.request(app)
      .get('/api/v1/articles/search?author=jigsaw');
    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep.equals('Found Articles');
    expect(response.body).to.have.keys('status', 'message', 'data');
    expect(response.body.data[0].Author).to.have
      .keys('firstName', 'lastName', 'username', 'imageUrl');
  });

  it('should return articles according to tag search parameters', async () => {
    const response = await chai.request(app)
      .get('/api/v1/articles/search?tag=philosophy');

    expect(response.body.message).to.be.deep.equals('Found Articles');
    expect(response.body).to.have.keys('status', 'message', 'data');
    expect(response.body.data[0].Author).to.have
      .keys('firstName', 'lastName', 'username', 'imageUrl');
  });
  it('should return error when search term is not provided', async () => {
    const response = await chai.request(app)
      .get('/api/v1/articles/search');

    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep.equals('Search Term must be provided');
  });
  it('should return error when search term is not provided', async () => {
    const response = await chai.request(app)
      .get('/api/v1/articles/search?author=i_amMichael');

    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep.equals('No article was found for this search term');
  });
  it('should return error when author is not a string', async () => {
    const response = await chai.request(app)
      .get('/api/v1/articles/search?author=3');

    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep.equals('Invalid Input');
  });
  it('should return error when tag is not a string', async () => {
    const response = await chai.request(app)
      .get('/api/v1/articles/search?tag=3');

    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep.equals('Invalid Input');
  });
  it('should return error when keywords is not a string', async () => {
    const response = await chai.request(app)
      .get('/api/v1/articles/search?keywords=3');

    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep.equals('Invalid Input');
  });
});

describe('Should return trending articles', () => {
  it('should return an array of trending articles', async () => {
    const response = await chai.request(app)
      .get('/api/v1/articles/trending');

    expect(response).to.have.status(200);
    expect(response.body.data).to.be.an('array');
    expect(response.body.message).to.be.deep.equals('Returned successfully');
  });
});
