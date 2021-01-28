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

// global variables
// Login status and user
let logged_in = false;
let activeUserIndex = -1;
let activeUser = {};
// todo list
let lists = [];
let activeListIndex = -1;
let newList = false;

///////////////////////////////////////////////
//
//	function definitions for site construction
//
///////////////////////////////////////////////

const body = document.getElementById("body");

function createBody() {
	body.innerHTML = (`
	<div id="top">
		<table style="width:100%">
			<tr>
				<td><h1>TODO-LIST</h1></td>
				<td align="right"><div id="menu" hidden>
					<b id="active_user"></b>
					<button type="button" class="button-secondary">account settings</button>
					<button type="button" class="button-negative">logout</button>
				</div>
				</td>
			</tr>
		</table>
	</div>

	<div id="status">
	</div>

	<div id="main">
	</div>

	<div id="status">
		<h3 id="message" class="message"></h3>
	</div>

	`);
	const menuPane = document.getElementById("menu");
	menuPane.addEventListener("click", menuHandler);
}

function showIndexPane() {
	const main = document.getElementById("main");
	main.innerHTML = (`
		<div id="index">
		<h3>A very simple TODO-Application.</h3>

		<div><i>Build with HTML, CSS and JavaScript as a single-page-app<br>
			 using only local storage (no files, no db)</i></div>
		<br>

		<div>Please log in or sign up yourself.</div>

		<form id="logreg">
			<button type="button" class="button-primary">Log in</button>
			<button type="button" class="button-primary">Sign Up</button>
		</form>
	</div>
	`)
	const indexPane = document.getElementById("index");
	indexPane.addEventListener("click", logReg);
}

function showSignUpPane() {
	const main = document.getElementById("main");
	main.innerHTML = (`
	<div id="sign_up">
		<h3>Sign Up new User</h3>
		<form id="registerForm">
			<table>
				<tr>
					<td>First name:</td><td><input name="firstname"></td>
				</tr>
				<tr>
					<td>Last name:</td><td><input name="lastname"></td>
				</tr>
				<tr>
					<td>Email:</td><td> <input name="email"></td>
				</tr>
				<tr>
					<td>Password:</td><td> <input type="password" name="password"></td>
				</tr>
				<tr>
					<td align="right"><input type="checkbox" id="agree"></td><td>I agree to the Terms of Use</td>
				</tr>
				<tr><td></td>
					<td>
						<button type="button" class="button-positive">register</button>
						<button type="button" class="button-primary">back</button>
					</td>
				</tr>
			</table>
		</form>
	</div>
	`);
	const signUpPane = document.getElementById("sign_up");
	signUpPane.addEventListener("click", registerHandler )
}

function showLoginPane() {
	const main = document.getElementById("main");
	main.innerHTML = (`
	<div id="login">
		<h3>Login</h3>
		<form id="loginForm">
			<table>
				<tr>
					<td>Email:</td><td> <input name="email"></td>
				</tr>
				<tr>
					<td>Password:</td><td> <input type="password" name="password"></td>
				</tr>
				<tr><td></td>
					<td>
						<button type="button" class="button-positive">login</button>
						<button type="button" class="button-primary">back</button>
					</td>
				</tr>
			</table>
		</form>
	</div>
	`)
	const loginPane = document.getElementById("login");
	loginPane.addEventListener("click", loginHandler);
}

function showDashboardPane() {
	const main = document.getElementById("main");
	main.innerHTML = (`
	<div id="dashboard" >
		<h3>Dashboard</h3>
		<h3>Your lists:</h3>
		<ul id="dashboard_list">

		</ul>
		<button type="button" class="button-primary">Create New to-do List</button><br><br>
	</div>
	`);
	const dashboardPane = document.getElementById("dashboard");
	dashboardPane.addEventListener("click", dashboardHandler);
}

function showListPane() {
	const main = document.getElementById("main");
	main.innerHTML = (`
	<div id="list">
		<h3>To-Do-List</h3>
		Listname: <input name="list_name" id="list_name" ><br><br>
		<table>
			<tbody id="check_list_table">
				<tr><th>check</th><th>item</th></tr>
			</tbody>
		</table>
		<br>
		<input name="new_item" id="new_item">
		<button type="button" class="button-secondary">new item</button>
		<br>
		<button type="button" class="button-positive">save</button>
		<button type="button" class="button-primary">back to dashboard</button>
	</div>
	`);
	const listPane = document.getElementById("list");
	listPane.addEventListener("click", listHandler);
}

function showUserSettingsPane() {
	const main = document.getElementById("main");
	main.innerHTML = (`
	<div id="user_settings">
		<h3>Account settings</h3>
		<form id="settingsForm">
			<table>
				<tr>
					<td>First name:</td><td><input name="firstname"></td>
				</tr>
				<tr>
					<td>Last name:</td><td><input name="lastname"></td>
				</tr>
				<tr>
					<td>Email:</td><td> <input name="email"></td>
				</tr>
				<tr>
					<td>Password:</td><td> <input type="password" name="password"></td>
				</tr>
				<tr><td></td>
					<td>
						<button type="button" class="button-positive">save</button>
						<button type="button" class="button-primary">back to dashboard</button>
					</td>
				</tr>
			</table>
		</form>
	</div>
	`);
	const userSettingsPane = document.getElementById("user_settings");
	userSettingsPane.addEventListener("click", userSettingsHandler);
}


///////////////////////////////////////////////
//
//	Event handler functions 
//
///////////////////////////////////////////////

function logReg(e) {
	switch (e.target.innerText) {
	case "Log in":
		showLoginPane();
		break;
	case "Sign Up":
		showSignUpPane();
	} 
}

// handler function for registration form
function registerHandler(e) {
	const signUpPane = document.getElementById("sign_up");
	const messageLine = document.getElementById("message");
	let fields = signUpPane.querySelectorAll("#registerForm input");
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
			showLoginPane();
		}
		break;
	case "back":
		messageLine.innerText = "";
		for (let i=0; i<4; i++) {
			fields[i].value = "";
		}
		showIndexPane();
	}
}

// handler function for login form
function loginHandler(e) {
	const loginPane = document.getElementById("login");
	const messageLine = document.getElementById("message");
	const menuPane = document.getElementById("menu");
	
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
					//activeUser = {firstname: u.firstname, lastname: u.lastname, email: u.email, pwd: u.pwd};
					activeUser = u;
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
				messageLine.innerText = "";
				menuPane.removeAttribute("hidden");

				// update site .. goto dashboard
				showDashboardPane();
				populateDashboard();			
				document.getElementById("active_user").innerText = activeUser.email;
				
			}
		} else {
			messageLine.innerText = "Error - there are no known users, please register."
			showIndexPane();
		}
	} else if (e.target.innerText === "back") {
		messageLine.innerText = "";
		showIndexPane();
	}
}

// Populate Dashboard with todo lists of active user;
function populateDashboard() {
	const dashboardList = document.getElementById("dashboard_list");
	
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

// handler for click in the dashboard
function dashboardHandler(e) {
	if (e.target.innerText === "Create New to-do List") {
		showListPane();
		// simple case: display emtpy list
		let activeList = document.getElementById("list_name");
		activeList.value = "";
		newList = true;
	} else {
		if (e.target.type = "li") {
			// clicked on list item
			newList = false;
			showListPane();
			populateList(e.target.innerText);
		}
	}	
}

// Populate list view with selected todo list
function populateList(listname) {
	const messageLine = document.getElementById("message");
	const checkListTable = document.getElementById("check_list_table");

	if (lists === []) {
		messageLine.innerText = "Error - no list found";
	} else {
		//deleteList();
		let index = 0;
		messageLine.innerText = "";
		// find the list in the lists
		for (let list of lists) {
			if (list.name === listname) {
				let activeList = document.getElementById("list_name");
				activeList.value = listname;
				activeListIndex = index;
				for (let item of list.items) {
					//appendCheckListTable(item.item, item.checked);
					let newRow = document.createElement("tr");
					newRow.innerHTML = (`
						<td><input type="checkbox" ${item.checked ? "checked" : ""}></td>
						<td>${item.item}</td>
					`);				
					checkListTable.appendChild(newRow);
				}
			}
			index ++;
		}
	}
}

// handler for click in the list view
function listHandler(e) {
	const messageLine = document.getElementById("message");
	const checkListTable = document.getElementById("check_list_table");

	switch (e.target.innerText) {
		case "back to dashboard":
			showDashboardPane();
			populateDashboard();
			break;
		case "new item":
			let newItem = document.getElementById("new_item");
			if (newItem.value === "") {
				messageLine.innerText = "Error - item must have a text!"
			} else {
				messageLine.innerText = "";
			
				//appendCheckListTable(newItem.value, false);
				let newRow = document.createElement("tr");
				newRow.innerHTML = (`
					<td><input type="checkbox" false></td>
					<td>${newItem.value}</td>
				`);				
				checkListTable.appendChild(newRow);

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

// handler for menu
function menuHandler(e) {
	const menuPane = document.getElementById("menu");
	switch (e.target.innerText) {
		case "logout":
			logged_in = false;
			activeUser = {};
			menuPane.setAttribute("hidden", true);
			showIndexPane();
			break;
		case "account settings":
			showUserSettingsPane();
			const userSettingsPane = document.getElementById("user_settings");
			let fields = userSettingsPane.querySelectorAll("#settingsForm input");
			fields[0].value = activeUser.firstname; 
			fields[1].value = activeUser.lastname; 
			fields[2].value = activeUser.email; 
			fields[3].value = activeUser.pwd;
			break;
	}
}

// handler function for registration form
function userSettingsHandler(e) {
	const userSettingsPane = document.getElementById("user_settings");
	const messageLine = document.getElementById("message");

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
			showDashboardPane();
			populateDashboard();
		}
		break;
	case "back to dashboard":
		showDashboardPane();
		populateDashboard();
		break;
	}
}

///////////////////////////////////////////////
//
//	Run the application
//
///////////////////////////////////////////////
// MAIN: 

createBody();
showIndexPane();
