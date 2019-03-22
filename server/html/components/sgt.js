


class SGT_template{
	/* constructor - sets up sgt object 
	params: (object) elementConfig - all pre-made dom elements used by the app
	purpose: 
		- Instantiates a model and stores pre-made dom elements it this object
		- Additionally, will generate an object to store created students 
		  who exists in our content management system (CMS)
	return: undefined
	ESTIMATED TIME: 1 hour
	*/
	constructor( elementConfig ){

		this.elementConfig = elementConfig;
		this.data = {};

		this.handleCancel = this.handleCancel.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.deleteStudent = this.deleteStudent.bind(this);
		this.getServerData = this.getServerData.bind(this);
		this.sendDataToServer = this.sendDataToServer.bind(this);
	}
	/* addEventHandlers - add event handlers to premade dom elements
	adds click handlers to add and cancel buttons using the dom elements passed into constructor
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/

	addEventHandlers(){
		$("#addButton").on("click", this.sendDataToServer);
		$("#cancelButton").on("click", this.handleCancel);
		$("#getServerData").on("click", this.getServerData);
	}
	/* clearInputs - take the three inputs stored in our constructor and clear their values
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/
	clearInputs(){
		this.elementConfig.nameInput.val("");
		this.elementConfig.courseInput.val("");
		this.elementConfig.gradeInput.val("");
	}
	/* handleCancel - function to handle the cancel button press
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/
	handleCancel(){
		this.clearInputs();
	}
	/* handleAdd - function to handle the add button click
	purpose: grabs values from inputs, utilizes the model's add method to save them, then clears the inputs and displays all students
	params: none
	return: undefined
	ESTIMATED TIME: 1 hour
	*/
	handleAdd(){
		var studentName = $("#studentName").val();
		var studentCourse = $("#studentCourse").val();
		var studentGrade = ($("#studentGrade").val()).toString();

		//create new stutent with above values.
		this.createStudent(studentName, studentCourse, studentGrade);
		// clear input
		this.clearInputs();
		// display students
		this.displayAllStudents();

	}
	/* displayAllStudents - iterate through all students in the model
	purpose: 
		grab all students from model, 
		iterate through the retrieved list, 
		then render every student's dom element
		then append every student to the dom's display area
		then display the grade average
	params: none
	return: undefined
	ESTIMATED TIME: 1.5 hours
	*/
	displayAllStudents(){
		$("#displayArea > tr").remove();
		var listOfStudents = this.readStudent();
		for(var studentIndex = 0; studentIndex < listOfStudents.length; studentIndex++)
		{
			$("#displayArea").append(listOfStudents[studentIndex].render());
		}
		this.displayAverage();
	}
	/* displayAverage - get the grade average and display it
	purpose: grab the average grade from the model, and show it on the dom
	params: none
	return: undefined 
	ESTIMATED TIME: 15 minutes

	*/

	displayAverage(){
		
		var listOfGrades = this.readStudent();
		var gradeTotalSum = 0;
		var average = 0;
		for(var studentGradeIndex = 0; studentGradeIndex < listOfGrades.length; studentGradeIndex++)
		{
			gradeTotalSum += listOfGrades[studentGradeIndex]["data"]["grade"];
		}
		average = gradeTotalSum / listOfGrades.length;
		$(".avgGrade").text(average.toFixed(2));
	}
	/* createStudent - take in data for a student, make a new Student object, and add it to this.data object

		name : the student's name
		course : the student's course
		grade: the student's grade
		id: the id of the student
	purpose: 
			If no id is present, it must pick the next available id that can be used
			when it creates the Student object, it must pass the id, name, course, grade, 
			and a reference to SGT's deleteStudent method
	params: 
		name : the student's name
		course : the student's course
		grade: the student's grade
		id: the id of the student
	return: false if unsuccessful in adding student, true if successful
	ESTIMATED TIME: 1.5 hours
	*/
	createStudent(name, course, grade, id){ //account for when no id is given
		// debugger;

		if(id !== undefined && this.data[id.toString()] === undefined)
		{
			var aNewStudent = new Student(id, name, course, grade, this.deleteStudentFromServer);
			this.data[id.toString()] = aNewStudent;
			return true;
		}
		else if(id === undefined)
		{
			var listOfKeys = Object.keys(this.data);
			var lastKey = parseInt(listOfKeys[listOfKeys.length - 1]);
			var newId = lastKey + 1;

			var aNewStudent = new Student(newId, name, course, grade, this.deleteStudentFromServer);
			this.data[newId.toString()] = aNewStudent;
			return true;
		}
		
		return false;
	}
	/* doesStudentExist - 
		determines if a student exists by ID.  returns true if yes, false if no
	purpose: 
			check if passed in ID is a value, if it exists in this.data, and return the presence of the student
	params: 
		id: (number) the id of the student to search for
	return: false if id is undefined or that student doesn't exist, true if the student does exist
	ESTIMATED TIME: 15 minutes
	*/
	doesStudentExist(id){

		if (this.data[id.toString()] !== undefined)
			{
				return true;
			}
			return false;
	}
	/* readStudent - 
		get the data for one or all students
	purpose: 
			determines if ID is given or not
			if ID is given, return the student by that ID, if present
			if ID is not given, return all students in an array
	params: 
		id: (number)(optional) the id of the student to search for, if any
	return: 
		a singular Student object if an ID was given, an array of Student objects if no ID was given
		ESTIMATED TIME: 45 minutes
	*/
	readStudent(id){
		if (id === undefined)
		{
			var studentArray = [];
			for (var key in this.data)
			{
				studentArray.push(this.data[key]);
			}
			return studentArray;
		}
		else
		{
			if(this.doesStudentExist(id))
			{
				return this.data[id];
			}
		}
		return false;
	}
	/* updateStudent - 
		not used for now.  Will be used later
		pass in an ID, a field to change, and a value to change the field to
	purpose: 
		finds the necessary student by the given id
		finds the given field in the student (name, course, grade)
		changes the value of the student to the given value
		for example updateStudent(2, 'name','joe') would change the name of student 2 to "joe"
	params: 
		id: (number) the id of the student to change in this.data
		value: (multi) the value to change the field to
	return: 
		true if it updated, false if it did not
		ESTIMATED TIME: no needed for first versions: 30 minutes
	*/
	updateStudent(id, field, value){

		if (doesStudentExist(id))
		{
			this.data[id.toString()].field = value;
			return true; 
		}
		return false;
	}
	/* deleteStudent - 
		delete the given student at the given id
	purpose: 
			determine if the ID exists in this.data
			remove it from the object
			return true if successful, false if not
			this is often called by the student's delete button through the Student handleDelete
	params: 
		id: (number) the id of the student to delete
	return: 
		true if it was successful, false if not
		ESTIMATED TIME: 30 minutes
	*/
	deleteStudent(id){
		
		if(this.doesStudentExist(id))
		{
			delete this.data[id.toString()];
			return true;
		}
		return false;
	}

	getServerData()
	{
		console.log("Get Server Data Clicked");
		$.ajax({
			url: "api/grades",
			method: "get",
			data: {
				api_key: "AlK0e9FN3A"
			},
			dataType: "json",
			success:  (databaseObject) => {
				if(databaseObject.success)
				{
					for (var key in databaseObject.data)
					{
						this.createStudent(databaseObject.data[key].name,
											databaseObject.data[key].course,
											databaseObject.data[key].grade,
											databaseObject.data[key].id);
						
					}
					this.displayAllStudents();
				}
				
			},
			error: (e) =>{
				console.log(`getServerData Error: ${e}`);
			}
		});
	}

	sendDataToServer()
	{
		console.log("sendDataToServer called");
		$.ajax({
			url: "http://s-apis.learningfuze.com/sgt/create",
			method: "POST",
			data: {
				api_key: "AlK0e9FN3A",
				name: $("#studentName").val(),
				course: $("#studentCourse").val(),
				grade: $("#studentGrade").val().toString()
			},
			dataType: "json",
			succes: (response) => {
				console.log(`sendDataToServer: ${response}`);
			},
			error: (e) =>{
				console.log(`sendDataToServer Error: ${e}`);
			}
		});

		this.getServerData();
	}

	deleteStudentFromServer(id)
	{
		console.log("deleteStudentFromServer called");
		$.ajax({
			url: "http://s-apis.learningfuze.com/sgt/delete",
			method: "POST",
			data: {
				api_key: "AlK0e9FN3A",
				student_id: id
			},
			dataType: "json",
			succes: (response) => {
				console.log(`deleteStudentFromServer: ${response}`);
			},
			error: (e) => {
				console.log(`deleteStudentFromServer Error: ${e}`);
			}
		});
	}


}


