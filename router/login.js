const router = require('express').Router()
const company = require('../model/company')
const bcrypt= require('bcrypt')
const companyDet = require('../model/companyDet')

router.get('/',(req,res)=>{
    res.render('login',{msg:''})
})



router.post('/',async(req,res)=>{
    const sess = req.session,
        collect = req.body;

    try {
        if (collect.Username!=null && collect.password!=null) {
            if ((collect.Username).length>=4 && (collect.password).length>=4) {
                const checkuser = await company.findOne({Username:collect.Username});
                // const checkemail = await companyDet.findOne({Email:collect.email});
                if (checkuser!=null) {
                    const passchk = bcrypt.compareSync(collect.password,checkuser.Password)
                    if (passchk==true) {
                        sess.user= collect.Username
                    res.redirect('/')
                    } else {
                    res.render('login',{msg:'password incorrect'})
                        
                    }
                    
                } else {
                    res.render('login',{msg:'User not found'})
                }
                
            } else {
                res.render('login',{msg:'Fill the required'})
            }
        } else {
            res.render('login',{msg:'Fill the form'})
        }
    } catch (error) {
        console.log(error);
        res.render('login',{msg:'error occured'})
    }
})
module.exports= router