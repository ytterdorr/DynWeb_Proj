let widget = document.querySelector("#widget");
console.log("widget:", widget);
if (widget == null) {
  widget = document.querySelector(".side-widget");
}

let skyValues = {
  1: "Clear sky",
  2: "Nearly clear sky",
  3: "Variable cloudiness",
  4: "Halfclear sky",
  5: "Cloudy sky",
  6: "Overcast",
  7: "Fog",
  8: "Light rain showers",
  9: "Moderate rain showers",
  10: "Heavy rain showers",
  11: "Thunderstorm",
  12: "Light sleet showers",
  13: "Moderate sleet showers",
  14: "Heavy sleet showers",
  15: "Light snow showers",
  16: "Moderate snow showers",
  17: "Heavy snow showers",
  18: "Light rain",
  19: "Moderate rain",
  20: "Heavy rain",
  21: "Thunder",
  22: "Light sleet",
  23: "Moderate sleet",
  24: "Heavy sleet",
  25: "Light snowfall",
  26: "Moderate snowfall",
  27: "Heavy snowfall",
};

// Display dummy data.

function createEl(el) {
  return document.createElement(el);
}

function bulidRow(timeRow) {
  let row = createEl("tr");
  // console.log(timeRow.parameters);
  let kl = new Date(timeRow.validTime).getHours();
  let temp;
  let vindriktning;
  let vindstyrka;
  let himmel;
  for (let param of timeRow.parameters) {
    if (param.name == "t") {
      temp = param.values[0];
    } else if (param.name == "wd") {
      vindriktning = param.values[0];
    } else if (param.name == "ws") {
      vindstyrka = param.values[0];
    } else if (param.name == "Wsymb2") {
      himmel = param.values[0];
    }
  }
  console.log(
    `kl: ${kl}: ${temp}, vind: ${vindriktning} (${vindstyrka}), himmel: ${himmel}`
  );

  vindTD = createEl("td");

  // Create wind direction arrow
  vindSVG = svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  vindSVG.setAttribute("width", "1.1rem");
  vindSVG.setAttribute("height", "1.1rem");

  var svgimg = document.createElementNS("http://www.w3.org/2000/svg", "image");
  svgimg.setAttributeNS(null, "height", "1.1rem");
  svgimg.setAttributeNS(null, "width", "1.1rem");
  svgimg.setAttributeNS(
    "http://www.w3.org/1999/xlink",
    "href",
    "/bilder/arrow_upward-24px.svg"
  );
  svgimg.setAttributeNS(null, "x", "0");
  svgimg.setAttributeNS(null, "y", "0");
  svgimg.setAttributeNS(null, "visibility", "visible");
  vindSVG.setAttribute("transform", `rotate(${vindriktning})`);
  vindSVG.appendChild(svgimg);
  vindTD.appendChild(vindSVG);
  vindTD.appendChild(
    Object.assign(createEl("p"), { innerHTML: `(${vindstyrka})` })
  );

  console.log(vindTD);

  // insert all row elements.
  row.appendChild(Object.assign(createEl("td"), { innerHTML: kl }));
  row.appendChild(Object.assign(createEl("td"), { innerHTML: temp }));
  row.appendChild(vindTD);
  row.appendChild(
    Object.assign(createEl("td"), { innerHTML: skyValues[himmel] })
  );
  return row;
}

function createWeatherTable(times) {
  // Check if there is any timedata for today.
  if (times.length < 1) {
    return Object.assign(createEl("p"), {
      innerHTML: "Väderprognos visas bara till kl 18",
    });
  }

  let table = createEl("table");
  let heads = createEl("tr");

  heads.appendChild(Object.assign(createEl("th"), { innerHTML: "KL" }));
  heads.appendChild(Object.assign(createEl("th"), { innerHTML: "Temp" }));
  heads.appendChild(Object.assign(createEl("th"), { innerHTML: "Vind" }));
  heads.appendChild(Object.assign(createEl("th"), { innerHTML: "Himmel" }));
  table.appendChild(heads);

  for (let row of times) {
    table.appendChild(bulidRow(row));
  }

  return table;
}

function buildWidget(todayTimes, tomorrowTimes) {
  // Create Headings
  const todayHeading = createEl("h3");
  todayHeading.innerHTML = "Idag";
  const tomorrowHeading = createEl("h3");
  tomorrowHeading.innerHTML = "Imorgon";

  // Create tables
  let todayTable = createWeatherTable(todayTimes);
  let tomorrowTable = createWeatherTable(tomorrowTimes);

  // Insert everything
  widget.appendChild(todayHeading);
  widget.appendChild(todayTable);
  widget.appendChild(tomorrowHeading);
  widget.appendChild(tomorrowTable);
}

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
