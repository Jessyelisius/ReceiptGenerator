const company = require('../model/company');
const companyDet = require('../model/companyDet');
const reciept = require('../model/reciept');
const date = require('date-and-time')
const router = require('express').Router()


router.get('/',async (req,res)=>{
    const sess = req.session

    if (sess.user) {
        try {
            const user= await company.findOne({Username:sess.user})
            if (user) {
                res.render('addreciept',{msg:''})
            } else {
                sess.destroy()
                res.status(404).render('404')
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(404).render('404')
    }
    
})




router.post('/',async(req,res)=>{
    const sess = req.session,
        collect = req.body;

        if (sess.user) {
            try {
                const user= await company.findOne({Username:sess.user})
                if (user) {
                    if (collect.Name!=null && collect.phone!=null && collect.totalText!=null && collect.totalNum!=null && collect.item!=null) {
                        if ((collect.Name).length>=4 && (collect.phone).length>=4 && (collect.totalText).length>=3 && (collect.totalNum).length>=3 && (collect.item).length>=1 ) {
                            const now = new Date();

                            const addrecip= new reciept({
                                companyId:user._id,
                                date: date.format(now,'hh:mm A, DD MMM YYYY'),
                                customerName:collect.Name,
                                customerPhone:collect.phone,
                                items:collect.item,
                                TotalpriceText:collect.totalText,
                                Totalpricenumber:collect.totalNum
                            })
                            const saverepe = await addrecip.save()
                            res.redirect('/reciept/share/'+addrecip._id)
                            
                        } else {
                            res.render('addreciept',{msg:'Fill the required'})
                        }
                    } else {
                        res.render('addreciept',{msg:'Fill the form'})
                    }
                } else {
                    sess.destroy()
                    res.status(404).render('404')
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            res.status(404).render('404')
        }
   
})

module.exports= router