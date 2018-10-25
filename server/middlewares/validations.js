import utilities from '../utilities/user';

const { checkMissingFields } = utilities;

export default (req, res, next) => {
  const { isValid, problem } = checkMissingFields(req.body, [
    'username',
    'email',
    'password'
  ]);
  if (isValid === false) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid input',
      error: problem,
    });
  }
  next();
};
