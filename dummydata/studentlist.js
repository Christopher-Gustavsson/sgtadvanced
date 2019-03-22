var list = {
	success: true,
	data: [
		{'id': 1, 'name': 'Postman', 'course': 'Mail Fraud', 'grade': 100},
		{'id': 76, 'name': 'Bob', 'course': 'Cowboying', 'grade': 25},
		{'id': 2, 'name': 'Bobby', 'course': 'Mail Fraud', 'grade': 70},
		{'id': 4, 'name': 'Robert', 'course': 'Linear Algebra', 'grade': 1}
	]
}

//SELECT `id`, CONCAT(`givenname`, " ",  `surname`) AS `name`, `course`, `grade` FROM `grades`   - this is the phpmyadmin query

// INSERT INTO `grades` SET `surname`="Chris", `givenname`="Gustavsson", `course`="math", `grade`=80, `added`=NOW() -- this can insert 1

//INSERT INTO `grades` (`surname`, `givenname`, `course`, `grade`) VALUES ("Gustavsson", "Christopher", "math", 80), ("postman", "postman", "math", 80) this can insert many
