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
			exp: [],
			inc: []
		},

		totals: {
			exp: 0,
			inc: 0
		}
	};

	return {
		addItem: function (type, des, val) {
			var newItem, ID;

			// [1,2,3,4,5], next ID = 6
			// create new ID
			if (data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			}
			else {
				ID = 0;
			}


			// create new item based on 'inc' or 'exp' type
			if (type === "exp") {
				newItem = new Expense(ID, des, val);
			}

			else if (type === "inc") {
				newItem = new Income(ID, des, val);
			}

			data.allItems[type].push(newItem);

			// return the new element
			return newItem;
		}

	};

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
		inputBtn: '.add__btn',
		incomeContainer : '.income__list',
		expenseContainer: '.expenses__list'
	}

	return { //Inside return is visible from outside;
		getInput: function () {

			return {
				type: document.querySelector(DOMstrings.inputType).value, // inc or exp
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: document.querySelector(DOMstrings.inputValue).value,
			}

		},

		addListItem: function (obj, type) {

			var html,newHtml, element;
			// create HTML string with placeholder text 

			if (type === 'inc') {
				
				element = DOMstrings.incomeContainer;

				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}
			else if (type === 'exp') {

				element = DOMstrings.expenseContainer;

				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}

			// replace the placeholder text with some actual data
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description',obj.description);
			newHtml = newHtml.replace('%value%', obj.value);

			// insert the html into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);




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

		var input, newItem;
		// 1. Get the field input data
		input = UICtrl.getInput();  // we fethched the object;

		// 2. Add the item to the budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);

		// 3. Add the item to the user interface
		UIController.addListItem(newItem,input.type);

		// 4. Calculate the budget
		// 5. Display the button

	};

	return {
		init: function () {
			setupEventListener();
		}
	}

})(budgetController, UIController);


controller.init();




