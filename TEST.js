var Car = function(id,name){
    this.id = id;
    this.name = name;
}


var car1 = new Car(1,"BMW");
var car2 = new Car(24, "Mercedes");
var car3 = new Car(2124, "Mercedes");
var car4 = new Car(24, "Mercedes");
var car5 = new Car(232, "Mercedes");





var arrayList = []

arrayList.push(car1);
arrayList.push(car2);
arrayList.push(car3);
arrayList.push(car4);
arrayList.push(car5);





var idList = arrayList.map(function(current){
    return current.id
})

//console.log(idList);


index = idList.indexOf(232);



arrayList.splice(index);

//console.log(arrayList)


myArray = [1,3,4,56,321,3123];

numberList = myArray.map(function(cur){
    return cur
});

console.log(numberList)










