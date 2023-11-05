const Category = require('../models/model.category');


exports.fetchAllCategory = async (req, res, next) => {
   try {
    let data = await Category.find().populate('quizzes');
    if (!data) {
        return res.status(404).json("Resource not found")
    }
    console.log(data)
    //  res.status(200).json({count: data.length, data: data})
    res.render('index', { data });
   } catch(err) {
    return res.status(404).json("Resource not found " + err)
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
        
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
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
        
        const category = await Category.findByIdAndDelete(req.params.id);

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
