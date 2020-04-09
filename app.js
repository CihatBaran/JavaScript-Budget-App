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

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum += cur.value;

        });

        data.totals[type] = sum;


    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },

        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1,
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            // [1,2,3,4,5], next ID = 6
            // create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }


            // create new item based on 'inc' or 'exp' type
            if (type === "exp") {
                newItem = new Expense(ID, des, val);
            } else if (type === "inc") {
                newItem = new Income(ID, des, val);
            }

            data.allItems[type].push(newItem);

            // return the new element
            return newItem;
        },

        deleteItem: function (type, id) {

            var index, ids;

            ids = data.allItems[type].map(function (current) {
                return current.id;
            });
            
           
            index = ids.indexOf(id);
    
            if (index !== -1) { //-1 means index of id were not found
                data.allItems[type].splice(index, 1); // 1 means we want to delete only one
                //after matching with array spesific index we have defined
            }


        },


        calculateBudget: function () {
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // calculate the budget = income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate the percentage of income that we spent

            if (data.totals.inc !== 0) {
                data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
            } else {
                data.percentage = -1;
            };

        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage,
            }
        },

        testing: function () {
            console.log(data);
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
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
    }

    return { //Inside return is visible from outside;
        getInput: function () {

            return {
                type: document.querySelector(DOMstrings.inputType).value, // inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
            }

        },

        addListItem: function (obj, type) {

            var html, newHtml, element;
            // create HTML string with placeholder text 

            if (type === 'inc') {

                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {

                element = DOMstrings.expenseContainer;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // insert the html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearfields: function () {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + "," + DOMstrings.inputValue);
            // querySelectorAll does not return array

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function (current, index, array) {

                current.value = "";
                index.value = "";
                array.value = "";

            });

            fieldsArr[0].focus();

            // var clearDscrptn,clearInptVal;
            // clearDscrptn = document.querySelector(DOMstrings.inputDescription);
            // clearInptVal = document.querySelector(DOMstrings.inputValue);

            // clearDscrptn.value = "";
            // clearInptVal.value = "";
            // clearDscrptn.focus();


        },

        displayBudget: function (obj) {

            document.querySelector(DOMstrings.budgetLabel).textContent = "+" + obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = "+" + obj.totalInc;
            document.querySelector(DOMstrings.expenseLabel).textContent = "-" + obj.totalExp;

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + "%";
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
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
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            };

        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    }

    var updateBudget = function () {
        // 5. Calculate the budget
        budgetCtrl.calculateBudget();

        // 6. Return the budget
        var budget = budgetCtrl.getBudget();

        // 7. Display the budget
        UICtrl.displayBudget(budget);
    };

    var ctrlAddItem = function () {

        var input, newItem;
        // 1. Get the field input data
        input = UICtrl.getInput(); // we fethched the object;


        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to the user interface
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the field
            UICtrl.clearfields();

            // 5. Calculate and Update Budget
            updateBudget();
        }

    };

    var ctrlDeleteItem = function (event) {
        var itemID, splitID, type, ID;
        // it returns the 4 parentNode of the icon
        // we want to reach it's id.

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            // inc-0 we want it like this, inc is type and 0 will be ID
            splitID = itemID.split('-')

            type = splitID[0];

            ID = parseInt(splitID[1]);
            
            // 1. delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);


            // 2. delete the item from the UI

            // 3. Update and show the new budget

        }

        // element = inc-1
        // element.split("-");
        // returns ["inc", "1"]

    };

    return {
        init: function () {
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1,
            });
            setupEventListener();

        }
    }

})(budgetController, UIController);


controller.init();
