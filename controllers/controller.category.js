const Category = require('../models/model.category');


exports.fetchAllCategory = async (req, res, next) => {
   try {
    let data = await Category.find()
    if (!data) {
        return res.status(404).json("Resource not found")
    }
    console.log(data)
    res.status(200).json({data})
   } catch(err) {
    return res.status(404).json("Resource not found")
   }
}

exports.addCategory = async (req, res, next) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({
          success: true,
          data: category,
        });
    } catch(err) {
        console.log(err)
     return res.status(401).json("Bad request"+ err)
    }
 }
 
 exports.updateCategory = async (req, res, next) => {
    try {
        const filter = { id: req.params.id }; 
        
        const update = { 
            $set: req.body 
        };
        const category = await Category.updateOne(filter, update, {
            new: true, 
            validators: true, 
        });
          if (!category) {
            return res.status(401).json(req.params.id+" Bad request: "+ err)
        }
          res.status(200).json({
            success: true,
            data: category,
          });
    } catch(err) {
        console.log(err)
     return res.status(401).json(req.params.id+" Bad request: "+ err)
    }
 }

 exports.deleteCategory = async (req, res, next) => {
    try {
        const filter = { id: req.params.id }; 
        
        const category = await Category.deleteOne(filter);

        if (category.deletedCount === 0) {
            return res.status(401).json(req.params.id+" Bad request: ")
        }

        res.status(200).json({
            success: true,
            message: 'Category deleted successfully',
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ success: false, error: 'Server Error'+err });
    }
}
