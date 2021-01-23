// Initialize localStorage
const todoStorage = window.localStorage;
// todoStorage.clear();
// helper functions for storing arrays/objects in localSorage
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

// variables for DataStorage
let users = [];
if ( todoStorage.getObj("users") != null) {
	users = todoStorage.getObj("users");
} else {
	users = [];
}
let lists = [];
let activeListIndex = -1;
let newList = false;
//let todolist = [];

// Login status and user
let logged_in = false;
let activeUserIndex = -1;
let activeUser = {};

// HTML Elements
const indexElem = document.getElementById("index");
const menuElem = document.getElementById("menu");
const loginElem = document.getElementById("login");
const registerElem = document.getElementById("register");
const dashboardElem = document.getElementById("dashboard");
const dashboardList = document.getElementById("dashboard_list");
const listElem = document.getElementById("list")
const checkListTable = document.getElementById("check_list_table");
const settingsElem = document.getElementById("settings");
const messageElem = document.getElementById("message");

// EventListeners
indexElem.addEventListener("click", logReg);
menuElem.addEventListener("click", menu);
loginElem.addEventListener("click", login);
registerElem.addEventListener("click", registerHandler);
dashboardElem.addEventListener("click", dashboardHandler);
listElem.addEventListener("click", listHandler);
settingsElem.addEventListener("click", settingsHandler)

// Run App
userlist();
//saveDemoList();

// functions	

// handler for menu
function menu(e) {
	switch (e.target.innerText) {
		case "logout":
			logged_in = false;
			activeUser = {};
			// clear data
			let listItems = dashboardList.querySelectorAll("li");
			for (let li of listItems) {
				dashboardList.removeChild(li);
			}
			// update site
			menuElem.setAttribute("hidden", true);
			dashboardElem.setAttribute("hidden", true);
			listElem.setAttribute("hidden", true);
			settingsElem.setAttribute("hidden", true);
			indexElem.removeAttribute("hidden");
			break;
		case "account settings":
			let fields = settingsElem.querySelectorAll("#settingsForm input");
			fields[0].value = activeUser.firstname; 
			fields[1].value = activeUser.lastname; 
			fields[2].value = activeUser.email; 
			fields[3].value = activeUser.pwd;

			settingsElem.removeAttribute("hidden");
			dashboardElem.setAttribute("hidden", true);
			listElem.setAttribute("hidden", true);
			break;
		
	}
}

// handler function to switch to login or register
function logReg(e) {
	switch (e.target.innerText) {
	case "login":
		indexElem.setAttribute("hidden", true);
		loginElem.removeAttribute("hidden");
		break;
	case "register":
		indexElem.setAttribute("hidden", true);
		registerElem.removeAttribute("hidden")
	} 
}

// handler function for registration form
function registerHandler(e) {
	let fields = registerElem.querySelectorAll("#registerForm input");
	switch (e.target.innerText) {
	case "register":
		
		if ( fields[0].value === "" | 
			 fields[1].value === "" |
			 fields[2].value === "" |
			 fields[3].value === "" ) {
			messageElem.innerText = "Error - all fields must be filled!";
		} else {
			messageElem.innerText = "";
			// get data from form
			let newUser = { firstname: fields[0].value, 
						    lastname: fields[1].value, 
				            email: fields[2].value, 
				            pwd: fields[3].value        };
			users.push(newUser);
			
			//store data
			todoStorage.setObj("users", users );
			
			// update site .. goto login
			registerElem.setAttribute("hidden", true);
			loginElem.removeAttribute("hidden");
		}
		break;
	case "back":
		for (let i=0; i<4; i++) {
			fields[i].value = "";
		}
		registerElem.setAttribute("hidden", true);
		indexElem.removeAttribute("hidden");
		
	}
}

// handler function for registration form
function settingsHandler(e) {
	let fields = settingsElem.querySelectorAll("#settingsForm input");
	switch (e.target.innerText) {
	case "save":
		if ( fields[0].value === "" | 
			 fields[1].value === "" |
			 fields[2].value === "" |
			 fields[3].value === "" ) {
			messageElem.innerText = "Error - all fields must be filled!";
		} else {
			messageElem.innerText = "";
			// get data from form
			let myUser = { firstname: fields[0].value, 
						   lastname: fields[1].value, 
				           email: fields[2].value, 
				           pwd: fields[3].value        };
			users[activeUserIndex] = myUser;
			activeUser = myUser;
			
			//store data
			todoStorage.setObj("users", users );
			
			// update site .. goto dashboard
			settingsElem.setAttribute("hidden", true);
			backToDashboard();
		}
		break;
	case "back to dashboard":
		fields[0].value = "";
		fields[1].value = "";
		fields[2].value = "";
		fields[3].value = "";

		settingsElem.setAttribute("hidden", true);
		backToDashboard();
		break;
	}
}

// handler function for login form
function login(e) {
	if (e.target.innerText === "login") {

		// get data from form
		let fields = loginElem.querySelectorAll("#loginForm input");
		if (users != null) {
			let index=0;
			// browse user list for user email
			for (let u of users) {
				if (u.email === fields[0].value && u.pwd === fields[1].value) {
					// found user in user list & password matches
					logged_in = true;
					messageElem.innerText = "";
					activeUserIndex = index;
					activeUser = {firstname: u.firstname, lastname: u.lastname, email: u.email, pwd: u.pwd};
					// delete login form
					fields[0].value = "";
					fields[1].value = "";
					break;
				}
				index++;
			}
			if (!logged_in) {
				messageElem.innerText = "Login failed :: unknown user or wrong password!";
			} else {
				// update site .. goto dashboard
				populateDashboard();			

				menuElem.removeAttribute("hidden");
				document.getElementById("active_user").innerText = activeUser.email;
				loginElem.setAttribute("hidden", true);
				dashboardElem.removeAttribute("hidden");
			}
		}
	}
}

// handler for click in the dashboard
function dashboardHandler(e) {
	if (e.target.innerText === "create new list") {
		// simple case: display emtpy list
		deleteList();
		let activeList = document.getElementById("list_name");
		activeList.value = "";
		newList = true;

		dashboardElem.setAttribute("hidden", true);
		listElem.removeAttribute("hidden");
	} else {
		if (e.target.type = "li") {
			newList = false;
			populateList(e.target.innerText);

			dashboardElem.setAttribute("hidden", true);
			listElem.removeAttribute("hidden");
		}
	}
}

// handler for click in the list view
function listHandler(e) {
	switch (e.target.innerText) {
		case "back to dashboard":
			backToDashboard();
			break;
		case "new item":
			let newItem = document.getElementById("new_item");
			if (newItem.value === "") {
				messageElem.innerText = "Error - item must have a text!"
			} else {
				messageElem.innerText = "";
			
				appendCheckListTable(newItem.value, false);
				newItem.value = "";
				newItem.focus();
			}
			break;
		case "save":
			// save the actual selected List
			let listName = document.getElementById("list_name");
			if (listName.value === "") {
				messageElem.innerText = "Error - List must have a name!";
			} else {
				messageElem.innerText = "";

				// construct list object from html - table
				let saveList = { name: listName.value, items: []};

				let childList = checkListTable.querySelectorAll("tr");
				let index = 0;
				for (let item of childList) {
					if (index === 0) {
						index++;
					} else {
						let fields = item.querySelectorAll("td");
						let itemName = fields[1].innerText;
						let checkBox = fields[0].querySelector("input");

						let newItem = {item: itemName, checked: checkBox.checked};
						saveList.items.push(newItem);

						index++;
					}
				}
				if (newList === true) {
					lists.push(saveList);
					newList = false;
					activeListIndex = lists.length -1;
				} else {
					lists[activeListIndex] = saveList;
				}

				todoStorage.setObj(activeUser.email, lists);
			}
			break;
	}
}

function backToDashboard() {
	deleteList();
	populateDashboard();
	dashboardElem.removeAttribute("hidden");
	listElem.setAttribute("hidden", true);
}

// Populate Dashboard with todo lists of active user;
function populateDashboard() {
	if (logged_in && activeUser.email != "") {
		// delete current content
		let childList = dashboardList.querySelectorAll("li");
		for (let item of childList) {
			dashboardList.removeChild(item);
		}

		// get data for current user from localStorage
		if (todoStorage.getObj(activeUser.email)) {
			lists = todoStorage.getObj(activeUser.email);

			for (let item of lists) {
				let newLI = document.createElement("li");
				newLI.innerText = item.name;
				dashboardList.appendChild(newLI);
			}
		}	
	}
}

// delete list view
function deleteList() {
	let childList = checkListTable.querySelectorAll("tr");
	let index = 0;
	for (let item of childList) {
		if (index != 0) {
			checkListTable.removeChild(item);
		}
		index++

	}

}

// Populate list view with selected todo list
function populateList(listname) {
	if (lists === []) {
		messageElem.innerText = "Error - no list found";
	} else {
		deleteList();
		let index = 0;
		messageElem.innerText = "";
		// find the list in the lists
		for (let list of lists) {
			if (list.name === listname) {
				let activeList = document.getElementById("list_name");
				activeList.value = listname;
				activeListIndex = index;
				for (let item of list.items) {
					appendCheckListTable(item.item, item.checked);
				}
			}
			index ++;
		}
	}
}

// Append check-list-table with new entry
function appendCheckListTable(item, checked) {
	let newRow = document.createElement("tr");
	
	let colChecked = document.createElement("td");
	let newCheckBox = document.createElement("input")
	newCheckBox.type = "checkbox";
	if (checked === true) {
		newCheckBox.setAttribute("checked", true);
	}
	colChecked.appendChild(newCheckBox);
	newRow.appendChild(colChecked);
	
	let colItem = document.createElement("td");
	colItem.innerText = item;
	newRow.appendChild(colItem);

	checkListTable.appendChild(newRow);
}

// Testfunctions for development

function userlist() {
	let userlist = todoStorage.getObj("users");
	if (userlist !== null ) {
		for (let u of userlist) {
		}
	}
}

function saveDemoList() {
	let newList =  [
		{name: "test1", items: [ {item:"testitem1", checked: true}, 
		                         {item:"testitem2", checked: false} ]},
		{name: "test2", items: [ {item:"testitem3", checked: false},
		                         {item:"testitem4", checked: false} ]}
	];
	todoStorage.setObj("michael.stoeckel@web.de", newList);
}
