const material_model = require('./material_model');


// CREATE

const api_post_material = (req, res, next) => {
    console.log('api_post_material');
    let data = {
        name: req.body.name,
        min_density: req.body.min_density,
        max_density: req.body.max_density,
        min_strength: req.body.min_strength,
        max_strength: req.body.max_strength,
        min_strength_density: req.body.min_strength / req.body.min_density,
        max_strength_density: req.body.max_strength / req.body.max_density
    };

    let new_material = material_model(data);

    new_material.save().then(() => {
        console.log(new_material);
        res.send(JSON.stringify(data));

    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });


    console.log(data);
    
};

// READ

const api_get_materials = (req, res, next) => {
    console.log('api_get_materials');

    material_model.find({})
    .lean()
    .then(materials => {
        res.send(JSON.stringify([materials]));
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err); 
    });

    
};


// UPDATE

//5e8771b74c898e14b86c7285

// DELETE
const api_delete_material = (req, res, next) => {
    let id = req.params.id;
    material_model.findByIdAndRemove(id).then(() => {
        res.send();
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};


// EXPORTS
module.exports.api_post_material = api_post_material;
module.exports.api_get_materials = api_get_materials;
module.exports.api_delete_material = api_delete_material;