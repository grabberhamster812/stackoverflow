const users = require('./controllers/users');
const questions = require('./controllers/questions');
const votes = require('./controllers/votes');
const comments = require('./controllers/comments');
const requireAuth = require('./middlewares/requireAuth');
const questionAuth = require('./middlewares/questionAuth');
const commentAuth = require('./middlewares/commentAuth');

const router = require('express').Router();

//Authentication
router.post('/signup', users.validate, users.signup);
router.post('/authenticate', users.validate, users.authenticate);

//Questions
router.param('question', questions.load);
router.post('/questions', [requireAuth, questions.validate], questions.create);
router.get('/question/:question', questions.show);
router.get('/question', questions.list);
router.get('/questions/tags', questions.listByTags);
router.get('/user/:username', questions.listByUser);
router.delete('/question/:question', [requireAuth, questionAuth], questions.delete);

//Post votes
router.get('/post/:post/upvote', requireAuth, votes.upvote);
router.get('/post/:post/downvote', requireAuth, votes.downvote);
router.get('/post/:post/unvote', requireAuth, votes.unvote);

//Posts comments
router.param('comment', comments.load);
router.post('/post/:post', [requireAuth, comments.validate], comments.create);
router.delete('/post/:post/:comment', [requireAuth, commentAuth], comments.delete);

module.exports = (app) => {
  app.use('/api', router);

  app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
      message: error.message
    });
  });
};
