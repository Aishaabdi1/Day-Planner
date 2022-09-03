// Get and render current day
$("#currentDay").text(moment().format("dddd MMMM Do YYYY"));
console.log("#currentDay");

// Make a time block with different colours for the past, present, and future. Make a function that has an if statement.

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

// The events are all cleared after the page is refreshed.
function refreshTimeBlocks() {
  $(".hour").each(function () {
    var currentHour = $(this).text();
    var currentBlock = localStorage.getItem(currentBlock);

    if (currentBlock !== null) {
      $(this).siblings(".content").val(currentBlock);
    }
  });
}

// When clicking the save button, the data is stored to local storage.
$(".saveBtn").on("click", function () {
  var time = $(this).siblings(".hour").text();
  var plan = $(this).siblings(".description").val();
  localStorage.setItem(time, plan);
});

timeColour();
saveButton();



