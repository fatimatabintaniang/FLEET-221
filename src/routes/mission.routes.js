const express = require('express');
const router = express.Router();
const missionController = require('../controllers/mission.controller');
const validate = require('../middlewares/validate.middleware');
const { createMissionSchema } = require('../validation/mission.validation');

router.post('/', validate(createMissionSchema), missionController.planifierMission);
router.get('/', missionController.getAllMissions);

module.exports = router;
