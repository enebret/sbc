var express = require('express')
var app = express()
var ObjectId = require('mongodb').ObjectId

// SHOW LIST OF products
app.get('/', function(req, res, next) {	
	// fetch and sort products collection by id in descending order
	req.db.collection('products').find().sort({"_id": -1}).toArray(function(err, result) {
		//if (err) return console.log(err)
		if (err) {
			req.flash('error', err)
			res.render('product/list', {
				title: 'product List', 
				data: ''
			})
		} else {
			// render to views/product/list.ejs template file
			res.render('product/list', {
				title: 'product List', 
				data: result
			})
		}
	})
})

app.get('/create', function(req, res, next){	
	// render to views/product/add.ejs
	res.render('product/add', {
		title: 'product type',
		name: '',
		Category: '',
		image: ''		
	})
})

// CREATE NEW product POST ACTION
app.post('/create', function(req, res, next){	
	req.assert('name', 'Name is required').notEmpty()           //Validate name
	req.assert('', 'product category is required').notEmpty()             
    req.assert('image', 'product image is required').isImage()  

    var errors = req.validationErrors()
    
    if( !errors ) {   
		var product = {
			name: req.sanitize('name').escape().trim(),
			category: req.sanitize('category').escape().trim(),
		}
				 
		req.db.collection('products').insert(product, function(err, result) {
			if (err) {
				req.flash('error', err)
				
				
				res.render('product/create', {
					title: 'Create new Product',
					name: product.name,
					category: product.category,
					image: product.image					
				})
			} else {				
				req.flash('success', 'Data added successfully!')
								
				res.redirect('/products')
				
			}
		})		
	}
	else {   //Display errors to product
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})				
		req.flash('error', error_msg)		
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
         res.render('product/create', {
            title: 'Create new Product',
            name: product.name,
            category: product.category,
            image: product.image					
        })
    }
})

// SHOW EDIT product FORM
app.get('/edit/(:id)', function(req, res, next){
	var o_id = new ObjectId(req.params.id)
	req.db.collection('products').find({"_id": o_id}).toArray(function(err, result) {
		if(err) return console.log(err)
		
		// if product not found
		if (!result) {
			req.flash('error', 'product not found with id = ' + req.params.id)
			res.redirect('/products')
		}
		else { // if product found
			// render to views/product/edit.ejs template file
			res.render('product/edit', {
				title: 'Edit product', 
				//data: rows[0],
				id: result[0]._id,
				name: result[0].name,
				category: product.category,
                image: product.image				
			})
		}
	})	
})

// EDIT product POST ACTION
app.put('/edit/(:id)', function(req, res, next) {
	req.assert('name', 'Name is required').notEmpty()           //Validate name
	req.assert('', 'product category is required').notEmpty()             
    req.assert('image', 'product image is required').isImage() 

    var errors = req.validationErrors()
    
    if( !errors ) {   
		var product = {
			name: req.sanitize('name').escape().trim(),
			age: req.sanitize('age').escape().trim(),
			email: req.sanitize('email').escape().trim()
		}
		
		var o_id = new ObjectId(req.params.id)
		req.db.collection('products').update({"_id": o_id}, product, function(err, result) {
			if (err) {
				req.flash('error', err)
				
				// render to views/product/edit.ejs
				res.render('product/edit', {
					title: 'Edit product',
					id: req.params.id,
					name: req.body.name,
					category: req.body.category,
                    image: req.body.image
				})
			} else {
				req.flash('success', 'Data updated successfully!')
				
				res.redirect('/products')
				
			}
		})		
	}
	else {   //Display errors to product
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)
		
	
        res.render('product/edit', { 
            title: 'Edit product',            
			id: req.params.id, 
			name: req.body.name,
			category: req.body.category,
            image: req.body.image
        })
    }
})

// DELETE product
app.delete('/delete/(:id)', function(req, res, next) {	
	var o_id = new ObjectId(req.params.id)
	req.db.collection('products').remove({"_id": o_id}, function(err, result) {
		if (err) {
			req.flash('error', err)
			// redirect to products list page
			res.redirect('/products')
		} else {
			req.flash('success', 'product deleted successfully! id = ' + req.params.id)
			// redirect to products list page
			res.redirect('/products')
		}
	})	
})

module.exports = app