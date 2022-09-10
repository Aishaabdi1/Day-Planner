// Created an array of time blocks
const arrayOfTimeBlocks = [
    {
      label: "9",
      key: 9,
    },
    {
      label: "10",
      key: 10,
    },
    {
      label: "11",
      key: 11,
    },
    {
      label: "12",
      key: 12,
    },
    {
      label: "13",
      key: 13,
    },
    {
      label: "14",
      key: 14,
    },
    {
      label: "15",
      key: 15,
    },
    {
      label: "16",
      key: 16,
    },
    {
      label: "17",
      key: 17,
    },
  ];
  
  // local storage
  const retrieveFromLocalStorage = function (key, defaultValue) {
    const localStorageData = JSON.parse(localStorage.getItem(key));
  
    if (!localStorageData) {
      return defaultValue;
    } else {
      return localStorageData;
    }
  };
  
  // Storing the value entered by the user in the text area against the hour in the LS
  const saveInput = function (event) {
    if ($(event.target).is(":button")) {
      const button = event.target;
      const hour = $(button).data("time");
      const appointment = $(button).prev().val();
      const savedInput = retrieveFromLocalStorage("appointments", {});
      savedInput[hour] = appointment;
      localStorage.setItem("appointments", JSON.stringify(savedInput));
    }
  };
  
  // Used moment js to color code the current, past and present hours
  const colourCodingHours = function (hour) {
    const currentTime = moment().hour();
    if (currentTime > hour) {
      return "past";
    } else if (currentTime == hour) {
      return "present";
    } else {
      return "future";
    }
  };
  
  // Initalizing local storage
  const initialLocalStorage = function () {
    const dataFromLS = retrieveFromLocalStorage("appointments", {});
  
    if (!dataFromLS) {
      localStorage.setItem("appointments", JSON.stringify({}));
    }
  };
  
  // Function sets current day and time on header
  const currentDayTime = $("#currentDay");
  
  // Create an hourly loop for each object to sit in its key pair.
  const constructCurrentHour = function () {
    const savedAppointments = retrieveFromLocalStorage("appointments", {});
    const callback = function (element) {
      const hour = element.key;
      const label = element.label;
      const renderColours = colourCodingHours(hour);
      const hourSchedule = `<div class="row" id=${hour}>
      <div class=" col time">${label}:00</div>
      <textarea class="col activity text-area ${renderColours}"
      id="${hour}" rows="">${savedAppointments[hour] || ""}</textarea>
      <button class=" col save" data-time=${hour}>Save</button>
            </div>`;
      $(".container").append(hourSchedule);
    };
    $(".container").click(saveInput);
    return arrayOfTimeBlocks.map(callback);
  };
  
  // Created a function to run
  const onReady = function () {
    const timerTick = function () {
      const dateTime = moment();
      const dateTimeFormat = dateTime.format("dddd DD MMMM, YYYY kk:mm");
      currentDayTime.text(dateTimeFormat);
    };
    setInterval(timerTick, 1000);
    initialLocalStorage();
    constructCurrentHour();
  };
  
  $(document).ready(onReady);