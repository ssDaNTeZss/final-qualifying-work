let express = require('express');
let router = express.Router();
let ctrlAuth = require('../controllers/auth');
let ctrlMasData = require('../controllers/masData');
let ctrlUpload = require('../controllers/upload');

router.post('/signup', ctrlAuth.signup);
router.post('/login', ctrlAuth.login);
router.get('/logout/:login', ctrlAuth.logout);
router.delete('/selfremove/:login', ctrlAuth.selfremove);

router.get('/masData', ctrlMasData.getAll);
router.put('/masData', ctrlMasData.update);
router.delete('/masData/:index', ctrlMasData.delete);
router.post('/masData', ctrlUpload.single('image'), ctrlMasData.create);

module.exports = router;