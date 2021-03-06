// Routes for items purchased

const router = require('express').Router();
let Item = require('../models/items.model');

// Get all items route
router.route('/').get((req, res) => {
  Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/hello').get((req, res) => {
  res.send('api working')
})

// Add an item route 
router.route('/add').post((req, res) => {
 
  const protege_id = req.body.protegeId;
  const description = req.body.description;
  const expenditure = Number(req.body.expenditure) ? Number(req.body.expenditure) : null;
  const date =(req.body.date);

  const newItem = new Item({
    protege_id,
    description,
    expenditure,
    date,
  });

  newItem.save()
  .then(() => res.json('Item added!'))
  .catch( err => {
    console.log(err)
    let errMessages = [];
    if (err.name == 'ValidationError') {
      for (field in err.errors) {
        errMessages.push(err.errors[field].message)
      }
    }
    console.log(errMessages)
    res.status(400).json({messages: errMessages})
  })
});

// Get one item route
router.route('/:id').get((req, res) => {
  Item.findById(req.params.id)
    .then(item => res.json(item))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete one item route
router.route('/:id').delete((req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json('Item deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


// Update one item route
router.route('/update/:id').patch((req, res) => {
  Item.findById(req.params.id)
    .then(item => {
      item.protege_id = req.body.protegeId;
      item.description = req.body.description;
      item.expenditure = Number(req.body.expenditure);
      item.date = (req.body.date);

      item.save()
        .then(() => res.json('Item updated!'))
        .catch( err => {
          console.log(err)
          let errMessages = [];
          if (err.name == 'ValidationError') {
            for (field in err.errors) {
              errMessages.push(err.errors[field].message)
            }
          }
          console.log(errMessages)
          res.status(400).json({messages: errMessages})
        })
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;