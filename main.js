var text = document.getElementById('TaskName');
var btn = document.getElementById('ADDBTN');
var tasks = document.getElementById('myTaskList');
// latitude and longitude
var lat;
var lng;
// getting position
// Web-API Geolocation used to get co-ordinates
navigator.geolocation.getCurrentPosition(processdone);

function processdone(location) {
    // adding coordinates
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;

    var gMap = new google.maps.Map(document.getElementById('GMaps'), {
        zoom: 10,
        center: new google.maps.LatLng(latitude, longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    marker = new google.maps.Marker({
        position: new
        google.maps.LatLng(latitude, longitude),
        map: gMap,
    });

}


btn.onclick = listofItems;

// prepend new tasks in main task list
function listofItems() {
    // check box, deleyebutton and text element creations
    var newItem = document.createElement('li');
    var itemText = document.createElement('p');
    itemText.textContent = text.value;

    var itemButton = document.createElement('button');
    itemButton.textContent = 'Delete Task';

    itemButton.onclick = removeTask;
    var itemCHeckBox = document.createElement('input');
    itemCHeckBox.setAttribute('type', 'checkbox')
    // onclick to call taskComplete funciton
    itemCHeckBox.onclick = taskCompleted;

    var map = document.createElement('a');
    // link for the map
    /*
    Third-Party API open streetmap used
    */

    map.href = `https://www.openstreetmap.org/#map=18/${lat}/${lng}`;
    map.textContent = "Location Of This Task";
    // display block
    map.style.display = 'block';
    // adding to a new list item to add to main list
    newItem.appendChild(itemCHeckBox);
    newItem.appendChild(itemText);
    // adding to list
    newItem.appendChild(map);

    newItem.appendChild(itemButton);


    // append on top of the list
    tasks.prepend(newItem);
}


/*
Added functionality of adding task again if not completed
*/
function taskCompleted(evnt) {
    // get parent item
    var t = evnt.target.parentNode;
    // select p tag and add line-through i it
    if (t.querySelector('p').style.textDecoration == 'line-through') {
        t.querySelector('p').style.textDecoration = 'none'
    } else {
        t.querySelector('p').style.textDecoration = 'line-through';
    }
    // move task to last
    t.parentNode.appendChild(t);
}

function removeTask(evnt) {
    // get task
    var t = evnt.target.parentNode;
    // remove task from list
    t.parentNode.removeChild(t);
}