const company = require('../model/company');
const companyDet = require('../model/companyDet');
const reciept = require('../model/reciept');

const router = require('express').Router()


router.get('/',async (req,res)=>{
    const sess = req.session
    if (sess.user) {
        try {
            const user= await company.findOne({Username:sess.user})
            if (user) {
                const compDetails= await companyDet.findOne({companyID:user._id})
                if (compDetails) {
                    const allreciept = await reciept.find({companyId:user._id})
                res.render('home', {user, compDetails, allreciept})
                } else {
                    res.send('error ohh')
                }
                
            } else {
                sess.destroy()
                res.redirect('/register')
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        res.redirect('/register')
    }
    
})

module.exports= router