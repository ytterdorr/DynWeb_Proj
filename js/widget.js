let widget = document.querySelector(".side-widget");

console.log(widget);

// Display dummy data.

function createEl(el) {
  return document.createElement(el);
}

function buildWidget(todayTimes, tomorrowTimes) {
  const todayHeading = createEl("h3");
  todayHeading.innerHTML = "Idag";
  const tomorrowHeading = createEl("h3");
  tomorrowHeading.innerHTML = "Imorgon";

  let tomorrowTable = createEl("table");
  let tomorrowHeads = createEl("tr");
  const kl = Object.assign(createEl("th"), { innerHTML: "KL" });
  const temp = Object.assign(createEl("th"), { innerHTML: "Temp" });
  const vind = Object.assign(createEl("th"), { innerHTML: "Vind" });
  const himmel = Object.assign(createEl("th"), { innerHTML: "Himmel" });

  tomorrowHeads.appendChild(kl);
  tomorrowHeads.appendChild(temp);
  tomorrowHeads.appendChild(vind);
  tomorrowHeads.appendChild(himmel);

  widget.appendChild(todayHeading);

  widget.appendChild(tomorrowHeading);
  widget.appendChild(tomorrowHeads);
  // if (todayTimes.length() > 0) {
  //   let todayTable = document.createElement("table");
  //   today;
  // }
}

function bulidRow(timeSeriesRow) {}

function handleData(data) {
  let thisDay = new Date(data.timeSeries[0].validTime);
  let nextDay = new Date(thisDay);
  nextDay.setDate(thisDay.getDate() + 1);
  let today = thisDay.getDate();
  let tomorrow = nextDay.getDate();

  let validTimes = [6, 12, 18];
  let validDates = [today, tomorrow];

  let filteredTimes = data.timeSeries.filter((d) => {
    let dateTime = new Date(d.validTime);
    // return True if hours is 6, 12, or 18 and date is today or tomorrow.
    return (
      validTimes.includes(dateTime.getHours()) &&
      validDates.includes(dateTime.getDate())
    );
  });
  let todayTimes = filteredTimes.filter(
    (d) => new Date(d.validTime).getDate() == today
  );
  let tomorrowTimes = filteredTimes.filter(
    (d) => new Date(d.validTime).getDate() == tomorrow
  );

  console.log(todayTimes, tomorrowTimes);

  buildWidget(todayTimes, tomorrowTimes);
}

fetch(
  "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/16.158/lat/58.5812/data.json"
)
  .then((result) => result.json())
  .then((data) => handleData(data));
