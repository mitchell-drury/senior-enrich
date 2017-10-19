const Sequelize = require('sequelize');
const db = require ('../');

module.exports = db.define ('student', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	email: {
		type: Sequelize.STRING,
		validate: {
			isEmail: true
		}
	}
})
