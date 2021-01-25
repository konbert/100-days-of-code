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

// Login status and user
let logged_in = false;
let activeUserIndex = -1;
let activeUser = {};

// HTML Elements
const indexPane = document.getElementById("index");
const menuPane = document.getElementById("menu");
const loginPane = document.getElementById("login");
const registerPane = document.getElementById("register");
const dashboardPane = document.getElementById("dashboard");
const dashboardList = document.getElementById("dashboard_list");
const listPane = document.getElementById("list");
const checkListTable = document.getElementById("check_list_table");
const userSettingsPane = document.getElementById("settings");
const messageLine = document.getElementById("message");

// EventListeners
indexPane.addEventListener("click", logReg);
menuPane.addEventListener("click", menu);
loginPane.addEventListener("click", login);
registerPane.addEventListener("click", registerHandler);
dashboardPane.addEventListener("click", dashboardHandler);
listPane.addEventListener("click", listHandler);
userSettingsPane.addEventListener("click", settingsHandler)

// functions	

// handler for menu
function menu(e) {
	switch (e.target.innerText) {
		case "logout":
			logged_in = false;
			activeUser = {};
			menuPane.setAttribute("hidden", true);
			switchPane(indexPane);
			break;
		case "account settings":
			let fields = userSettingsPane.querySelectorAll("#settingsForm input");
			fields[0].value = activeUser.firstname; 
			fields[1].value = activeUser.lastname; 
			fields[2].value = activeUser.email; 
			fields[3].value = activeUser.pwd;

			switchPane(userSettingsPane);
			break;
	}
}

// handler function to switch to login or register
function logReg(e) {
	switch (e.target.innerText) {
	case "Log in":
		switchPane(loginPane);
		break;
	case "Sign Up":
		switchPane(registerPane);
	} 
}

// handler function for registration form
function registerHandler(e) {
	let fields = registerPane.querySelectorAll("#registerForm input");
	switch (e.target.innerText) {
	case "register":
		if ( fields[0].value === "" | 
			 fields[1].value === "" |
			 fields[2].value === "" |
			 fields[3].value === "" ) {
			messageLine.innerText = "Error - all fields must be filled!";
		} else if (!fields[4].checked) {
			messageLine.innerText = "Error - please agree to the Terms of Use."
		} else {
			messageLine.innerText = "";
			// get data from form
			let newUser = { firstname: fields[0].value, 
						    lastname: fields[1].value, 
				            email: fields[2].value, 
				            pwd: fields[3].value        };
			users.push(newUser);
			
			//store data
			todoStorage.setObj("users", users );
			
			// update site .. goto login
			switchPane( loginPane);
		}
		break;
	case "back":
		for (let i=0; i<4; i++) {
			fields[i].value = "";
		}
		switchPane(indexPane);
	}
}

// handler function for registration form
function settingsHandler(e) {
	let fields = userSettingsPane.querySelectorAll("#settingsForm input");
	switch (e.target.innerText) {
	case "save":
		if ( fields[0].value === "" | 
			 fields[1].value === "" |
			 fields[2].value === "" |
			 fields[3].value === "" ) {
			messageLine.innerText = "Error - all fields must be filled!";
		} else {
			messageLine.innerText = "";
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
			backToDashboard();
		}
		break;
	case "back to dashboard":
		fields[0].value = "";
		fields[1].value = "";
		fields[2].value = "";
		fields[3].value = "";

		backToDashboard();
		break;
	}
}

// handler function for login form
function login(e) {
	if (e.target.innerText === "login") {

		// get data from form
		let fields = loginPane.querySelectorAll("#loginForm input");
		if (users != null) {
			let index=0;
			// browse user list for user email
			for (let u of users) {
				if (u.email === fields[0].value && u.pwd === fields[1].value) {
					// found user in user list & password matches
					logged_in = true;
					messageLine.innerText = "";
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
				messageLine.innerText = "Login failed :: unknown user or wrong password!";
			} else {
				menuPane.removeAttribute("hidden");

				// update site .. goto dashboard
				populateDashboard();			
				document.getElementById("active_user").innerText = activeUser.email;
				switchPane(dashboardPane);
			}
		} else {
			messageLine.innerText = "Error - there are no known users, please register."
			switchPane(indexPane);
		}
	}
}

// handler for click in the dashboard
function dashboardHandler(e) {
	if (e.target.innerText === "Create New to-do List") {
		// simple case: display emtpy list
		deleteList();
		let activeList = document.getElementById("list_name");
		activeList.value = "";
		newList = true;
	} else {
		if (e.target.type = "li") {
			// clicked on list item
			newList = false;
			populateList(e.target.innerText);
		}
	}
	switchPane(listPane);
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
				messageLine.innerText = "Error - item must have a text!"
			} else {
				messageLine.innerText = "";
			
				appendCheckListTable(newItem.value, false);
				newItem.value = "";
				newItem.focus();
			}
			break;
		case "save":
			// save the actual selected List
			let listName = document.getElementById("list_name");
			if (listName.value === "") {
				messageLine.innerText = "Error - List must have a name!";
			} else {
				for (let list of lists) {
					if (list.name === listName.value & newList |
						list.name === listName.value & listName.value != lists[activeListIndex].name) {
						messageLine.innerText = "Error - List exists, choose another name.";
						return;
					}
				}
	
				messageLine.innerText = "";

				// construct list object from html - table
				let saveList = { name: listName.value, items: []};

				let childList = checkListTable.querySelectorAll("tr");
				let index = 0;
				for (let item of childList) {
					if (index != 0) {
						let fields = item.querySelectorAll("td");
						let itemName = fields[1].innerText;
						let checkBox = fields[0].querySelector("input");

						let newItem = {item: itemName, checked: checkBox.checked};
						saveList.items.push(newItem);
					}	
					index++;
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
	switchPane(dashboardPane);
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
		index++;
	}
}

// Populate list view with selected todo list
function populateList(listname) {
	if (lists === []) {
		messageLine.innerText = "Error - no list found";
	} else {
		deleteList();
		let index = 0;
		messageLine.innerText = "";
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

// switch application pane
function switchPane(applicationPane) {
	indexPane.setAttribute("hidden", true);
	loginPane.setAttribute("hidden", true);
	registerPane.setAttribute("hidden", true);
	dashboardPane.setAttribute("hidden", true);
	listPane.setAttribute("hidden", true);
	userSettingsPane.setAttribute("hidden", true);
	messageLine.innerText = "";

	applicationPane.removeAttribute("hidden");
}