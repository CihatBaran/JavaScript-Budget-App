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
var budgetController = (function () {

	// There will be many expenses 
	// Therefore, we have created a blueprint to create many instance out of it.add

	var Expense = function (id, description, value) {

		this.id = id;
		this.description = description;
		this.value = value;

	};

	var Income = function (id, description, value) {

		this.id = id;
		this.description = description;
		this.value = value;

	};

	var data = {
		allItems: {
			allExpenses : [],
			allIncomes : [],
		},

		totals:{
			exp:0,
			inc:0,
		}
	}

})();



// User Interface Controller,
/*
	-to get input values
	-add a new item to UI
	-update the ui
*/
var UIController = (function () {

	var DOMstrings = {

		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn'
	}


	return { //Inside return is visible from outside;
		getInput: function () {

			return {
				type: document.querySelector(DOMstrings.inputType).value, // inc or exp
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: document.querySelector(DOMstrings.inputValue).value,
			}

		},

		getDOMstrings: function () {

			return DOMstrings;
		}

	};



})();



//Controller
/*
	-event handler
*/

var controller = (function (budgetCtrl, UICtrl) {

	var setupEventListener = function () {

		var DOM = UICtrl.getDOMstrings();
		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function (event) {

			// keycode 13 means Enter
			if (event.keyCode === 13) {
				ctrlAddItem();
			};

		});
	}

	var ctrlAddItem = function () {

		// 1. Get the field input data
		var input = UICtrl.getInput();  // we fethched the object;

		console.log(input);

		// 2. Add the item to the budget controller
		// 3. Add the item to the user interface
		// 4. Calculate the budget
		// 5. Display the button

	};

	return {
		init: function () {
			console.log('Aplication has started.')
			setupEventListener();
		}
	}

})(budgetController, UIController);


controller.init();




