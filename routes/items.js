const router = require('express').Router();
let Item = require('../models/items.models');

router.route('/').get((req, res) => {
  Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const protegename = req.body.protegename;
  const description = req.body.description;
  const amount = Number(req.body.amount);
  const date =(req.body.date);

  const newItem = new Item({
    protegename,
    description,
    amount,
    date,
  });

  newItem.save()
  .then(() => res.json('Item added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Item.findById(req.params.id)
    .then(item => res.json(item))
    .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/:id').delete((req, res) => {
//   Item.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Item deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/update/:id').post((req, res) => {
  Item.findById(req.params.id)
    .then(item => {
      item.protegename = req.body.protegename;
      item.description = req.body.description;
      item.amount = Number(req.body.amount);
      item.date = (req.body.date);

      item.save()
        .then(() => res.json('Item updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;