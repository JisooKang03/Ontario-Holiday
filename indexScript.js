var provinceList= new Array();
class Prov {
	constructor (code,name, capital, holidays) {
		this.code = code;
    this.name = name;
		this.capital = capital;
		this.holidays = holidays;
	}
}

// Province List - index script
 // fetch the list of provinces from the holidays.json in the dataFiles folder

function buildList() {
  fetch('dataFiles/holidayList.json')
  .then (response => response.json())
  .then(data => {
      // call the loadPage function when the fetch returns the data
    loadPage(data);
  })

 
}

// function loadPage(dataJSON) {
//   // loop through the list of provinces in the dataJSON 
//   const provinceList = [];
//   dataJSON.forEach(province => {
//     // add the options to the select (provinces) with the code as value and name as the text of the option
//     const option = document.createElement('option');
//     option.value = province.code;
//     option.textContent = province.name;
//     document.getElementById('provinces').appendChild(option);
//  // add all the provinces  to the provinceList array using the class Prov defined at the top of this file
//     const newProvinces = new Prov(province.code, province.name, province.capital, province.holidays);
//     provinceList.push(newProvinces);
    
//   });
// }
function loadPage(dataJSON) {
  var provincesSelect = document.getElementById("provinces");
  var defaultOption = document.createElement("option");
  defaultOption.text = "Select a province";
  defaultOption.value = "";
  provincesSelect.add(defaultOption);

  dataJSON.provinceList.forEach(function (province) {
    var option = document.createElement("option");
    option.text = province.name;
    option.value = province.code;
    provincesSelect.add(option);

    provinceList.push(new Prov(province.code, province.name, province.capital, province.holidays));
  });
}
function showDetail() {
  var provCode = document.getElementById("provinces").value;
  var provSelect = provinceList.find((prov) => prov.code === provCode);
  if (!provSelect) return;
  var provinceInfo = document.getElementById("province-info");
  provinceInfo.innerHTML = `<h2>${provSelect.code} - ${provSelect.name} - ${provSelect.capital}</h2>`;

  var holidaysTable = document.getElementById("holidays");
  holidaysTable.innerHTML = "";
  var holidaysHeader = document.createElement("tr");
  holidaysHeader.innerHTML = "<th>Holidays</th>";
  holidaysTable.appendChild(holidaysHeader);

  provSelect.holidays.forEach(function (holiday) {
    var holidayRow = document.createElement("tr");
    holidayRow.innerHTML = `<td>${holiday}</td>`;
    holidaysTable.appendChild(holidayRow);
  });
}

