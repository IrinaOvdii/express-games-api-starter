const router = require('express').Router()
const passport = require('../config/auth')
const { Game } = require('../models')
const utils = require('../lib/utils')


const authenticate = passport.authorize('jwt', { session: false })

module.exports = io => {
 router
   .put('/moves/:id', authenticate, (req, res, next) => {
     const id = req.params.id
     const updatedSquare = req.body

     Game.findByIdAndUpdate(id, { $set: updatedSquare }, { new: true })
       .then((game) => {
         io.emit('action', {
           type: 'UPDATE_SQUARE',
           payload: game
         })
         res.json(game)
       })
       .catch((error) => next(error))
   })

 return router
}
