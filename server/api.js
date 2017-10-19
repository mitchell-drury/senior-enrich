'use strict'
const api = require('express').Router()
const {Student, Campus} = require('../db/models');

api.get('/campusList', (req, res, next) => {
	Campus.findAll()
	.then(result => {
		res.json(result);
	});
});

api.get('/getCampus/:id', (req, res, next) => {
	console.log(req.params);
	Campus.findById(Number(req.params.id), {include : [{all:true}]})
	.then(result => {
		res.json(result);
	})
})

api.post('/addCampus', (req, res, next) => {
	Campus.create({name: req.body.name, imagePath: req.body.imagePath})
	.then(result => {
		res.json(result)
	})
})

api.delete('/deleteCampus', (req, res, next) => {
	Campus.destroy({
		where: {
			id: Number(req.body.campusId)
		}
	})
	.then(() => {
		res.end();
	})
})

api.put('/updateCampus', (req, res, next) => {
	Campus.update(
		{
			name: req.body.name,
			imagePath: req.body.imagePath
		},
		{
			where: {
				id: req.body.id
			},
			returning: true
		}
	)
	.then(campus => res.json(campus));
})

api.get('/studentList', (req, res, next) => {
	Student.findAll()
	.then(result => {
		res.json(result);
	})
})

api.get('/getStudent/:id', (req, res, next) => {
	Student.findById(Number(req.params.id), {include : [{all:true}]})
	.then(result => {
		res.json(result);
	})
})

api.post('/addStudent', (req, res, next) => {
	Student.create({name: req.body.name, email: req.body.email, campusId: req.body.campusId})
	.then(student => {
		res.json(student);
	})
})

api.delete('/deleteStudent', (req, res, next) => {
	Student.destroy({
		where: {
			id: Number(req.body.studentId)
		}
	})
	.then(() => {
		res.end();
	})
})

api.put('/updateStudent', (req, res, next) => {
	Student.update(
		{
			name: req.body.name,
			email: req.body.email,
			campusId: req.body.campusId
		},
		{
			where: {
				id: req.body.id
			},
			returning: true
		}
	)
	.then((student) => res.json(student))
})

api.put('/removeStudentFromCampus', (req, res, next) => {
	Student.update(
		{
			campusId: null
		},
		{
			where: {
				id: req.body.id
			},
			returnin: true
		}
	)
	.then((student) => res.json(student))
})

api.put('/addStudentToCampus', (req, res, next) => {
	console.log('body', req.body);
	Student.update(
		{
			campusId: req.body.campusId
		},
		{
			where: {
				id: req.body.studentId
			},
			returning: true
		}
	)
	.then((student) => res.json(student))
})


module.exports = api