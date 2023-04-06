// const company = require('../model/company');
const company = require('../model/company');
const companyDet = require('../model/companyDet');
const reciept = require('../model/reciept');
// const reciept = require('../model/reciept');

const router = require('express').Router()



router.get('/:id',async (req,res)=>{
    const id = req.params.id
    if (id.length==24) {
        try {
            const reciepte= await reciept.findOne({_id:id})
            if (reciepte) {
                const compdet = await companyDet.findOne({companyID:reciepte.companyId}),
                companysend = await company.findOne({_id:reciepte.companyId})
                res.render('reciept/viewrec',{reciepts:reciepte, compdet, companysend})
                
            } else {
                res.status(404).render('404')
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(404).render('404')
        
    }
    
    
})


router.get('/share/:id',async (req,res)=>{
    const id = req.params.id
    if (id.length==24) {
        try {
            const reciepte= await reciept.findOne({_id:id})
            if (reciepte) {
                res.render('reciept/share',{reciepts:reciepte,websitename:process.env.web+'/reciept/'+id})
                
            } else {
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