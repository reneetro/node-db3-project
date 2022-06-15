const db = require('../../data/db-config');
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const scheme = await db('schemes').where('scheme_id', req.params.id).first();
  if(scheme) {
    next();
  } else {
    res.status(404).json({ message: `scheme with scheme_id ${req.params.id} not found`})
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  if(!req.body.scheme_name || req.body.scheme_name.trim() === '' || typeof req.body.scheme_name !== 'string'){
    res.status(400).json({ message: 'invalid scheme name'});
    return;
  }
  req.body.scheme_name = req.body.scheme_name.trim();
  next();
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  if(!req.body.instructions || req.body.instructions.trim() === '' || typeof req.body.instructions !== 'string'){
    res.status(400).json({ message: 'invalid step'});
    return;
  }
  if(!req.body.step_number || req.body.step_number < 1|| typeof req.body.step_number !== 'number'){
    res.status(400).json({ message: 'invalid step'});
    return;
  }
  req.body.instructions = req.body.instructions.trim();
  next();
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
