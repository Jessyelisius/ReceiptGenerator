const router = require('express').Router()
const cloudinary= require('cloudinary')
const company = require('../model/company')
const bcrypt= require('bcrypt')
const companyDet = require('../model/companyDet')
router.get('/',(req,res)=>{
    res.render('register',{msg:''})
})

router.post('/',async(req,res)=>{
    const sess = req.session,
        collect = req.body;

    try {
        if (collect.Username!=null && collect.email!=null && collect.password!=null && collect.about!=null) {
            if ((collect.Username).length>=4 && (collect.password).length>=4 && (collect.email).length>=5 && (collect.about).length>=5) {
                const checkuser = await company.findOne({Username:collect.Username});
                const checkemail = await companyDet.findOne({Email:collect.email});
                if (checkemail!=null || checkuser!=null) {
                    res.render('register',{msg:'User exist'})
                } else {
                    const image = await req.files.image
                // console.log(collect.image);
                // console.log(collect);
                if (image.mimetype=='image/jpeg' || image.mimetype=='image/png' || image.mimetype=='image/gif') {
                    const upload = await cloudinary.v2.uploader.upload(image.tempFilePath,{resource_type:'image', folder:process.env.uploadfolder})
                    const Addcompany= new company({
                        Username:collect.Username,
                        Password: bcrypt.hashSync(collect.password,10)
                    });

                    const saveCompany = await Addcompany.save()

                    const saveDet = new companyDet({
                        companyID:saveCompany._id, 
                        Email:collect.email,
                        About:collect.about,
                        phoneNo:collect.contact,
                        url:collect.website,
                        image:upload.secure_url,
                        publicId:upload.public_id,
                        address:collect.address
                    })
                    saveDet.save()
                    sess.user= collect.Username
                    res.redirect('/')
                } else {
                    res.render('register',{msg:'invalid Image'})
                }
                }
                
            } else {
                res.render('register',{msg:'Fill the required'})
            }
        } else {
            res.render('register',{msg:'Fill the form'})
        }
    } catch (error) {
        console.log(error);
        res.render('register',{msg:'error occured'})
    }
})
module.exports= router