const Sequelize = require('sequelize');
const db = require ('../');

module.exports = db.define ('campus', {
	name : {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	imagePath : {
		type: Sequelize.STRING,
		allowNull: false
	}
})
//