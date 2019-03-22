/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready( startApp );

var SGT;
function startApp(){
	/*
	startTests will test your code.  Once it works, 
	delete startTests and uncomment the code below to run YOUR code and test it
	*/
	// intiateTestDisplay();
	// startTests();
	SGT = new SGT_template({
		addButton: $("#addButton"),
		cancelButton: $("#cancelButton"),
		nameInput: $("#studentName"),
		courseInput: $("#studentCourse"),
		gradeInput: $("#studentGrade"),
		displayArea: $("#displayArea"),
		averageArea: $(".avgGrade")
	});
	SGT.addEventHandlers();

	SGT.getServerData();
}

// @channel when working on the SGT, COMMENT OUT the SGT code in script,.js from 18 to 27.  The tester will be making its own sgt objects.  The code you are commenting out is what you should be using after the tester works.



