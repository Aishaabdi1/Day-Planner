// Make a time block with different colours for the past, present, and future. Make a function that has an if statement.

console.log("#currentDay");

function timeColour() {
  var hour = moment().hours();

  $(".time-block").each(function () {
    var currentHour = parseInt($(this).attr("id"));

    // console.log(this); //each time-block

    if (currentHour > hour) {
      $(this).addClass("future");
    } else if (currentHour === hour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("past");
    }
  });
}





