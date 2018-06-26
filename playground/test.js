var timeTemp = new Date("2018-06-22T21:48:11.658Z") ;

console.log(timeTemp);

var nowDate = new Date();
var oldDate = timeTemp.getFullYear() + '-' + (timeTemp.getMonth() + 1) + '-' + timeTemp.getDate();
var date = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
console.log(date);

// var date = new Date("YYYY-MM-DD");
// date = date;
// console.log(date);
// date = date.split("T");
if (oldDate < date) {
  console.log("timeTemp is older");
} else {
  console.log("timeTemp is newer");
}


