function addPerson() {
  var first_name  = prompt("Please enter the first name of a new person.  OK to accept or cancel to exit dialog.");
  var last_name   = prompt("Please enter the last name of a new person.");
  var status_name = prompt("Please enter the status of a new person.");

  var table       = document.getElementById("the_table");
  var row         = table.insertRow(-1);
  var name_cell   = row.insertCell(0);
  var status_cell = row.insertCell(1);
  var personObj = {
    first:  first_name,
    last:   last_name,
    status: status_name
  };
  var new_name    = document.createTextNode(last_name + ", " + first_name);
  var new_status  = document.createTextNode(status_name);
  name_cell.appendChild(new_name);
  status_cell.appendChild(new_status);
  sortData();
  saveToDatabase(personObj);
}

function sortData() {
  var table = document.getElementById('the_table');
  var tdata = table.getElementsByTagName('tbody').item(0);
  var rdata = tdata.getElementsByTagName('tr');
  var data_object = new Object();

  // Gather row data into keys array by last name, then sort
  for (var i = 0; i < rdata.length; i++) {
    for (var j = 0; j < rdata.length; j++) {
      var key = rdata.item(j).getElementsByTagName('td').item(0).innerHTML.split(',')[0];
      data_object[key.toLowerCase()] = rdata.item(j);
    }
  }

  var keys = Object.keys(data_object);
  keys.sort();

  // Dump the table, could have done this before the extra append above, the code developed this way as I was working through the problem.  Can always re-factor.
  while (tdata.hasChildNodes()) {
    tdata.removeChild(tdata.firstChild);
  }

  // Rebuild the table with sorted row data
  for (var i = 0; i < keys.length; i++) {
    var n           = data_object[keys[i]].getElementsByTagName('td').item(0).innerHTML;
    var s           = data_object[keys[i]].getElementsByTagName('td').item(1).innerHTML;
    var row         = tdata.insertRow(-1);
    var name_cell   = row.insertCell(0);
    var status_cell = row.insertCell(1);
    name_cell.appendChild(document.createTextNode(n));
    status_cell.appendChild(document.createTextNode(s));
  }
}

// Pure JS AJAX request
function saveToDatabase(obj) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = processResponse;
  request.open('POST', 'http://localhost/member/save', true); // Be explicit with the URL; could use /member/save only to assume server is localhost
  request.send(obj);
}

// "Success" callback of the AJAX request essentially...
function processResponse() {
  console.log("cool");
}


