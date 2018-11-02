const express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
const expressValidator = require('express-validator')

const db = require('../db.js')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route('/')
.get((req, res, next) => {
    res.render('profile', { title: 'Profile' })
    console.log(req.user.user_id)
})
.post((req, res, next) => {
    const name = req.body.name
    const phone_number = req.body.phone
    const role = req.body.role.id
    console.log(req.body.role)
    db.query('update users set name = ?, phone_number = ?, role = ? where id = ' + req.user.user_id, [name, phone_number, role],
    (error, results, fields) => {
        if (error) {
            res.render('error', { message: error })
        }

    })
    if (req.body.role === 'owner') {
        var gear = req.body.optGear
        var start_time = req.body.start_time
        var end_time = req.body.end_time
        // var bi_own_roll = ''

        // get owner's roll number
        // db.query('select username from users where id = ' + req.user.user_id, (error, results, fields) => {
        //     if (error) {
        //         res.render('error', { message: error })
        //     } else {
        //         bi_own_roll = results[0].username
        //         console.log(results[0].username)
        //     }
        // })

        var rent = 0
        if (gear === true) {
            rent = 15
        } else {
            rent = 10
        }
        console.log(gear, rent, start_time, end_time)
        db.query('insert into bicycle (geared, rent_rate, start_time, end_time) values (?, ?, ?, ?)', [gear, rent, start_time, end_time], 
        (error, results, fields) => {
            if (error) {
                res.render('error', { message: error })
            } else {
                // flash success message
            }
        })
    }
})
.put((req, res, next) => {

})
.delete((req, res, next) => {
    
})

module.exports = router