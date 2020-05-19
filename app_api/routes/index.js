let express = require('express');
let router = express.Router();
let ctrlPacks = require('../controllers/packs');
let ctrlStudents = require('../controllers/students');
let ctrlAbsenteeisms = require('../controllers/absenteeisms');
let ctrlAuth = require('../controllers/auth');
let ctrlMasData = require('../controllers/masData');
let ctrlUpload = require('../controllers/upload');

router.get('/packs', ctrlPacks.getAll);
router.get('/packs/:id', ctrlPacks.getOne);
router.post('/packs', ctrlPacks.create);
router.put('/packs/:id', ctrlPacks.update);
router.delete('/packs/:id', ctrlPacks.delete);

router.get('/students', ctrlStudents.getAll);
router.get('/students/:id', ctrlStudents.getOne);
router.post('/students', ctrlStudents.create);
router.put('/students/:id', ctrlStudents.update);
router.delete('/students/:id', ctrlStudents.delete);

router.get('/absenteeisms', ctrlAbsenteeisms.getAll);
router.get('/absenteeisms/:id', ctrlAbsenteeisms.getOne);
router.post('/absenteeisms', ctrlAbsenteeisms.create);
router.put('/absenteeisms/:id', ctrlAbsenteeisms.update);
router.delete('/absenteeisms/:id', ctrlAbsenteeisms.delete);

router.post('/signup', ctrlAuth.signup);
router.post('/login', ctrlAuth.login);
router.get('/logout/:login', ctrlAuth.logout);
router.delete('/selfremove/:login', ctrlAuth.selfremove);

router.put('/masData', ctrlMasData.update);
router.delete('/masData/:index', ctrlMasData.delete);
router.post('/masData', ctrlUpload.single('image'), ctrlMasData.create);

module.exports = router;