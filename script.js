// Show Login/Register Forms
const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");

document.getElementById("showLogin").addEventListener("click", () => {
  loginBox.classList.remove("hidden");
  registerBox.classList.add("hidden");
});

document.getElementById("showRegister").addEventListener("click", () => {
  registerBox.classList.remove("hidden");
  loginBox.classList.add("hidden");
});

// Register User
function register() {

  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  if(name === "" || email === "" || password === ""){
    alert("Please fill all fields");
    return;
  }

  const user = {
    name,
    email,
    password
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert("Registration Successful!");

  registerBox.classList.add("hidden");
  loginBox.classList.remove("hidden");
}

// Login User
function login(){

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if(!savedUser){
    alert("No user found. Please register first.");
    return;
  }

  if(email === savedUser.email && password === savedUser.password){

    alert("Login Successful!");

    localStorage.setItem("loggedIn", "true");

    showEvents();

  }else{
    alert("Invalid Credentials");
  }
}

// Show Event Section
function showEvents(){

  document.querySelector(".auth-container").classList.add("hidden");

  document.getElementById("eventSection").classList.remove("hidden");

  document.getElementById("bookingSection").classList.remove("hidden");

  document.getElementById("logoutBtn").style.display = "inline-block";

  displayBookings();
}

// Book Event
function bookEvent(eventName){

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  bookings.push(eventName);

  localStorage.setItem("bookings", JSON.stringify(bookings));

  displayBookings();

  alert(eventName + " booked successfully!");
}

// Display Bookings
function displayBookings(){

  const bookingList = document.getElementById("bookingList");

  bookingList.innerHTML = "";

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  bookings.forEach((event, index) => {

    let li = document.createElement("li");

    li.textContent = `${index + 1}. ${event}`;

    bookingList.appendChild(li);
  });
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {

  localStorage.removeItem("loggedIn");

  location.reload();
});

// Auto Login Check
window.onload = () => {

  if(localStorage.getItem("loggedIn") === "true"){

    showEvents();
  }
};