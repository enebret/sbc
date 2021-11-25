var express = require('express')
var app = express()
var ObjectId = require('mongodb').ObjectId

// SHOW LIST OF categories
app.get('/', function(req, res, next) {	
	// fetch and sort categories collection by id in descending order
	req.db.collection('categories').find().sort({"_id": -1}).toArray(function(err, result) {
		//if (err) return console.log(err)
		if (err) {
			req.flash('error', err)
			res.render('category/list', {
				title: 'category List', 
				data: ''
			})
		} else {
			// render to views/category/list.ejs template file
			res.render('category/list', {
				title: 'category List', 
				data: result
			})
		}
	})
})

// SHOW ADD category FORM
app.get('/create', function(req, res, next){	
	// render to views/category/add.ejs
	res.render('category/add', {
		title: 'category type',
		name: '',		
	})
})

// CREATE NEW category POST ACTION
app.post('/create', function(req, res, next){	
	req.assert('name', 'Name is required').notEmpty()           //Validate name

    var errors = req.validationErrors()
    
    if( !errors ) {  
		var category = {
			name: req.sanitize('name').escape().trim(),
			category: req.sanitize('category').escape().trim(),
		}
				 
		req.db.collection('categories').insert(category, function(err, result) {
			if (err) {
				req.flash('error', err)
				
				
				res.render('category/create', {
					title: 'Create new category',
					name: category.name,				
				})
			} else {				
				req.flash('success', 'Data added successfully!')
								
				res.redirect('/categories')
				
			}
		})		
	}
	else {   //Display errors to category
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})				
		req.flash('error', error_msg)		
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
         res.render('category/create', {
            title: 'Create new category',
            name: category.name,				
        })
    }
})

// SHOW EDIT category FORM
app.get('/edit/(:id)', function(req, res, next){
	var o_id = new ObjectId(req.params.id)
	req.db.collection('categories').find({"_id": o_id}).toArray(function(err, result) {
		if(err) return console.log(err)
		
		// if category not found
		if (!result) {
			req.flash('error', 'category not found with id = ' + req.params.id)
			res.redirect('/categories')
		}
		else { // if category found
			// render to views/category/edit.ejs template file
			res.render('category/edit', {
				title: 'Edit category', 
				//data: rows[0],
				id: result[0]._id,
				name: result[0].name,			
			})
		}
	})	
})

// EDIT category POST ACTION
app.put('/edit/(:id)', function(req, res, next) {
	req.assert('name', 'Name is required').notEmpty()           //Validate name

    var errors = req.validationErrors()
    
    if( !errors ) {   
		var category = {
			name: req.sanitize('name').escape().trim(),
		}
		
		var o_id = new ObjectId(req.params.id)
		req.db.collection('categories').update({"_id": o_id}, category, function(err, result) {
			if (err) {
				req.flash('error', err)
				
				// render to views/category/edit.ejs
				res.render('category/edit', {
					title: 'Edit category',
					id: req.params.id,
					name: req.body.name,
				})
			} else {
				req.flash('success', 'Data updated successfully!')
				
				res.redirect('/categories')
				
			}
		})		
	}
	else {   //Display errors to category
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)
		
        res.render('category/edit', { 
            title: 'Edit category',            
			id: req.params.id, 
			name: req.body.name,
        })
    }
})

// DELETE category
app.delete('/delete/(:id)', function(req, res, next) {	
	var o_id = new ObjectId(req.params.id)
	req.db.collection('categories').remove({"_id": o_id}, function(err, result) {
		if (err) {
			req.flash('error', err)
			// redirect to categories list page
			res.redirect('/categories')
		} else {
			req.flash('success', 'category deleted successfully! id = ' + req.params.id)
			// redirect to categories list page
			res.redirect('/categories')
		}
	})	
})

module.exports = app