const router = require('express').Router();
let Protege = require('../models/proteges.model');
let Item = require('../models/items.model');

router.route('/').get((req, res) => {
  Protege.find()
    .then(proteges => res.json(proteges))
    .catch(err => res.status(400).json('Error: ' + err));
});
//Added this
router.route('/:id').get((req, res) => {
  Protege.findById(req.params.id)
  .then(async protege => {
    const items = await findUserItems(protege._id)
    return{protege, items}
  })
    .then(protege=> res.json(protege))
    .catch(err => res.status(400).json('Error: ' + err));
});


findUserItems = async (protegeId) => {
  return await Item.find({protege_id: protegeId })
}

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