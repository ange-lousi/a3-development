let currentPage = "";

function homePage() {
    if (currentPage != "Home") {
        currentPage = "Home";
        displayNone();
        document.getElementById("Home").style.backgroundColor = "#E6E6E6";
        document.getElementById("homeSection").style.display = "inline";
        getVersion();
    }
}

function staffPage() {
    if (currentPage != "Staff") {
        currentPage = "Staff";
        displayNone();
        document.getElementById("Staff").style.backgroundColor = "#E6E6E6";
        document.getElementById("staffSection").style.display = "inline";
        getStaff();
    }
}

function institutePage() {
    if (currentPage != "Institute Shop") {
        currentPage = "Institute Shop";
        displayNone();
        document.getElementById("InstituteShop").style.backgroundColor = "#E6E6E6";
        document.getElementById("InstituteSection").style.display = "inline";
        getItems();
    }
}

function userPage() {
    if (currentPage != "User Registration") {
        currentPage = "User Registration";
        displayNone();
        document.getElementById("UserRegistration").style.backgroundColor = "#E6E6E6";
        document.getElementById("userSection").style.display = "inline";
    }
}

function guestPage() {
    if (currentPage != "Guest Book") {
        currentPage = "Guest Book";
        displayNone();
        document.getElementById("GuestBook").style.backgroundColor = "#E6E6E6";
        document.getElementById("guestSection").style.display = "inline";
        postComment();
    }
}

function loginPage() {
    if (currentPage != "Login page") {
        currentPage = "Login page";
        displayNone();
        document.getElementById("Login").style.backgroundColor = "#E6E6E6";
        document.getElementById("loginSection").style.display = "inline";
    }
}

function displayNone() {
    document.getElementById("Home").style.backgroundColor = "transparent";
    document.getElementById("Staff").style.backgroundColor = "transparent";
    document.getElementById("InstituteShop").style.backgroundColor = "transparent";
    document.getElementById("UserRegistration").style.backgroundColor = "transparent";
    document.getElementById("GuestBook").style.backgroundColor = "transparent";
    document.getElementById("Login").style.backgroundColor = "transparent";


    document.getElementById("homeSection").style.display = "none";
    document.getElementById("staffSection").style.display = "none";
    document.getElementById("InstituteSection").style.display = "none";
    document.getElementById("userSection").style.display = "none";
    document.getElementById("guestSection").style.display = "none";
    document.getElementById("loginSection").style.display = "none";


}
window.onload = function() {
    homePage();

}

function backHome() {
    window.onload = homePage();
}

function getVersion() {
    const fetchPromise = fetch("http://localhost:5000/api/GetVersion");
    const streamPromise = fetchPromise.then((response) => response.text());
    streamPromise.then((version) =>
        document.getElementById("testVersion").innerHTML = `&#169 All rights reserved ${version}`);
}


function getItems() {
    let input = document.getElementById('mySearch').value;
    const fetchPromise = fetch(`http://localhost:5000/api/GetItems/` + input, {
        headers: {
            "Accept": "application/json",
        },
    });
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((itemData) => searchItem(itemData));
}

function searchItem(product) {
    let htmlString = ""
    const searchItem = (item) => {
        htmlString += `<tr><td><img class=imageProduct src="http://localhost:5000/api/GetItemPhoto/${item.id}"></td><br><br><td>${item.name}<br><br>${item.description}<br><br>$${item.price}<br><br> <button class="myButton" onclick="buyProduct()">Buy Now</button></td></tr>`;

    }
    product.forEach(searchItem);
    const searchTable = document.getElementById("showProducts");
    searchTable.innerHTML = htmlString;
}


function buyProduct() {
    window.onload = loginPage();

}

function getStaff() {
    const fetchPromise = fetch("http://localhost:5000/api/GetAllStaff", {
        headers: {
            "Accept": "text/json",
        },
    });
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((staffData) => showStaff(staffData));
}

function showStaff(staffObj) {
    let staffString = "";
    const populateStaff = (staff) => {
        const card = fetch(`http://localhost:5000/api/GetCard/${staff.id}`, {
            headers: {
                "Accept": "text/json",
            },
        }).then((card) => card.text()).then((card) => card.split("\n"))

        .then(card => {
            for (i in card) {
                card[i] = card[i].split(":");
            }
        })
        staffString += `<tr><td><img width=25% src="http://localhost:5000/api/GetStaffPhoto/${staff.id}"> </td><td></td></tr>`
    };
    staffObj.forEach(populateStaff);
    document.getElementById("showStaff").innerHTML = staffString;
}


function getLogin() {
    let u = document.getElementById("loginName").value;
    let p = document.getElementById("loginPassword").value;

    let currentUser = "";

    fetch("http://localhost:5000/api/GetVersionA", {
        method: "GET",
        headers: {
            'Authorization': 'Basic ' + btoa(`${u}:${p}`)
        },
    }).then((itemData) => {
        if (itemData.status === 200) {
            document.getElementById("validLog").innerHTML = "Login successful";
            currentUser += u;
            document.getElementById("loggedIn").innerHTML = `Name: ${u}  <button class="myButton" onclick="logOut()">Logout</button>`;
            document.getElementById("loginName").value = null;
            document.getElementById("loginPassword").value = null;
        } else {
            document.getElementById("validLog").innerHTML = "Username and/or password invalid, please try again";
            document.getElementById("loginName").value = null;
            document.getElementById("loginPassword").value = null;
        }

    });
}

function logOut() {
    document.getElementById("loggedIn").innerHTML = null;
}



function postComment() {
    const fetchPromise = fetch("http://localhost:5000/api/WriteComment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "comment": document.getElementById("userComment").value,
                "name": document.getElementById("userName").value
            }),
        }).then(res => res.text())
        .then(() => {
            document.getElementById('previousComments').src = document.getElementById('previousComments').src
            document.getElementById("userComment").value = null;
            document.getElementById("userName").value = null;
        });
}

function getUserRego() {
    const fetchPromise = fetch("http://localhost:5000/api/Register", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            userName: document.getElementById("registerName").value,
            password: document.getElementById("registerPassword").value,
            address: document.getElementById("registerAddress").value
        }),
    })
    const streamPromise = fetchPromise.then((response) => response.text());
    streamPromise.then((data) => {
        document.getElementById("userrego").innerHTML = data;
    });
}