//This is beginning of Script


// Data Encapsulation
//immediately invoked function expression
// IIFE
// inside IIFE function is not visible from outside

//Budget Controller
/*
	-add a new item to data structure
	-calculate budget
*/
var budgetController = (function(){
	
	// do something
	
	
})();


// User Interface Controller,
/*
	-to get input values
	-add a new item to UI
	-update the ui
*/
var UIController =(function(){
	
	// do something
	
	
})();



//Controller
/*
	-event handler
*/	

var controller = (function(budgetCtrl, UICtrl){
	
	
	var ctrlAddItem = function(){
		
				// 1. Get the field input data
				// 2. Add the item to the budget controller
				// 3. Add the item to the user interface
				// 4. Calculate the budget
				// 5. Display the button
				console.log("DRY === Dont Repeat Yourself")
	};
	
	
	document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
	
	document.addEventListener('keypress', function(event){
		
		// keycode 13 means Enter
		if (event.keyCode === 13) {
			ctrlAddItem();		
		};
		
	});
	
	
})(budgetController, UIController);







