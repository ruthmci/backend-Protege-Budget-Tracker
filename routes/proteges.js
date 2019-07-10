const router = require('express').Router();
let Protege = require('../models/proteges.model');

router.route('/').get((req, res) => {
  Protege.find()
    .then(proteges => res.json(proteges))
    .catch(err => res.status(400).json('Error: ' + err));
});

// ADDED THIS 
router.route('/:id').get((req, res) => {
  Protege.findById(req.params.id)
    .then(item => res.json(item))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const protegename = req.body.protegename;
  const protegeemail = req.body.protegeemail;
  const expenditure = Number(req.body.expenditure);
  const balance = Number(req.body.balance);
  const date = (req.body.date);

  const newProtege = new Protege({
                      protegename,
                      protegeemail,
                      expenditure,
                      balance,
                      date
                    });
  

  newProtege.save()
    .then(() => res.json('Protege added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;