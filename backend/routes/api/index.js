/*eslint-env es6*/
// backend/routes/api/index.js
const router = require('express').Router();

// test API Router
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});



/*

// User authentication test Router
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');

router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user });
}));

const { restoreUser } = require('../../utils/auth');

router.get('/restore-user', restoreUser, (req, res) => {
  return res.json(req.user);
})

const { requireAuth } = require('../../utils/auth');

router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

*/


module.exports = router;