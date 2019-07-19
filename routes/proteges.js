// Routes for proteges

const router = require('express').Router();
let Protege = require('../models/proteges.model');
let Item = require('../models/items.model');

// Get all proteges route - returns proteges with their related items
router.route('/').get((req, res) => {
  Protege.find()
  . then (proteges => {
    const protegesWithItems = Promise.all(proteges.map(async protege => {
      const items = await findUserItems(protege._id)
    return{protege, items}
    }))
    return protegesWithItems
  })
    .then(protegesWithItems => res.json(protegesWithItems))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete one protege route
router.route('/:id').delete((req, res) => {
  Protege.findByIdAndDelete(req.params.id)
    .then(() => res.json('Protege deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


// Get one protege route - returns protege with its related items
router.route('/:id').get((req, res) => {
  Protege.findById(req.params.id)
  .then(async (protege) => {
    const items = await findUserItems(protege._id)
    return{protege, items}
  })
    .then(protege=> res.json(protege))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Function used by the get all proteges and get one proteges routes to find the items related to a protege and return them 
findUserItems = async (protegeId) => {
  return await Item.find({protege_id: protegeId })
}

// Route for adding a protege
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

    .then((newProtege) => res.send(newProtege))
    
    .catch( err => {
      console.log(err)
      let errMessages = [];
      if (err.name == 'ValidationError') {
        for (field in err.errors) {
          errMessages.push(err.errors[field].message)
        }
      } else if(err.code === 11000) {
        errMessages.push("Protege email already in use")
      }
      console.log(errMessages)
      res.status(400).json({messages: errMessages})
    })
});



// Route for updating a protege
router.route('/update/:id').patch((req, res) => {
  Protege.findById(req.params.id)
    .then(protege => {
      protege.protegename = req.body.protegename;
      protege.protegeemail = (req.body.protegeemail);

      protege.save()
        .then(async () => {
          const proteges = await Protege.find()
          const protegesWithItems = await Promise.all(proteges.map(async protege => {
            const items = await findUserItems(protege._id)
            return{protege, items}
          }))
          res.send({
            message: 'proteges updated',
            proteges: protegesWithItems
          })
        })
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