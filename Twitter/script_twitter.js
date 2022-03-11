var currentIndex = 0;

var users = [{
    "name": "Ainur",
    "surname": "Sharip",
    "pic": "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
    "username": "ainursharip"
  },
  {
    "name": "Donald",
    "surname": "Tramp",
    "pic": "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
    "username": "donaltramp"
  },
  {
    "name": "Barak",
    "surname": "Obama",
    "pic": "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
    "username": "barakobama"
  },
  {
    "name": "Bruno",
    "surname": "Mars",
    "pic": "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
    "username": "brunomars"
  },
  {
    "name": "Britney  ",
    "surname": "Spears",
    "pic": "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
    "username": "britneyspears"

  },
  {
    "name": "Ainur",
    "surname": "Akhmetova",
    "pic": "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
    "username": "ainurakhmetova"
  },
  {
    "name": "Baur",
    "surname": "Serikov",
    "pic": "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
    "username": "baurserikov"
  },
  {
    "name": "Sultan",
    "surname": "Mussakhan",
    "pic": "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
    "username": "sultanussakhan"
  },
];

function cleanForm() {
  let userName = document.getElementById('user_name');
  userName.value = "";
  let userSurname = document.getElementById('user_surname');
  userSurname.value = "";
  let userUsername = document.getElementById('user_username');
  userUsername.value = "";
}


function showAddFollowerModal() {
  var myModal = new bootstrap.Modal(document.getElementById('addFollowerModal'));
  cleanForm();
  myModal.show();
}

function addFollewer() {

  let userName = document.getElementById('user_name');
  let userSurname = document.getElementById('user_surname');
  let userUsername = document.getElementById('user_username');

  users.push({
    "name": userName.value,
    "surname": userSurname.value,
    "username": userUsername.value
  });

  var myModal = document.getElementById('addFollowerModal');
  var modal = bootstrap.Modal.getInstance(myModal);

  modal.hide();
  renderNewTable();
}

function searchFollewer() {
  let userName = document.getElementById('user_name');
  let userSurname = document.getElementById('user_surname');
  let userUsername = document.getElementById('user_username');

  profiles = getProfiles();
  followers = getFollowers();

  let hasAccount = false;
  for (let i = 0; i < profiles.length; i++) {
    if ((userName.value == profiles[i]["name"] && userSurname.value == profiles[i]["surname"]) || (userUsername.value == profiles[i]["username"])) {
      followers.push({
        "name": userName.value,
        "surname": userSurname.value,
        "username": userUsername.value,

      });
      let jsonValue = JSON.stringify(followers);
      localStorage.setItem("followers", jsonValue);
      hasAccount = true;
    }
  }
  if (hasAccount == true) {
    alert("Followers was added succesfully");
  } else {
    alert("No account with this name and surname or username")
  }

  var myModal = document.getElementById('addFollowerModal');
  var modal = bootstrap.Modal.getInstance(myModal);
  modal.hide();
  renderNewFollowerTable();

}

function renderNewFollowerTable() {

  let htmlCode = "";
  followers = getFollowers();

  for (let i = 0; i < followers.length; i++) {
    htmlCode += "<tr>";
    htmlCode += "<td>" + "<img class=\"rounded-pill px-0 mx-0\" src=\"https://abs.twimg.com/sticky/default_profile_images/default_profile_bigger.png\">" + "</td>";
    htmlCode += "<td>" + followers[i]["name"] + " " + followers[i]["surname"] + "<br>" + "@" + followers[i]["username"] + "</td>";
    htmlCode += "<td><button class = 'btn btn-light btn-sm rounded-pill fw-bold border-1 unfollowbutton' onclick = 'unfollow(" + i + ")'><span class='replies'>Following</span><span class='comment'>Unfollow!</span></button></td>";
    htmlCode += "</tr>";
  }
  document.getElementById("followers").innerHTML = htmlCode;
}

function renderNewTable() {

  let htmlCode = "";
  for (let i = 0; i < users.length; i++) {

    htmlCode += "<tr>";
    htmlCode += "<td>" + "<img class=\"rounded-pill px-0 mx-0\" src=\"https://abs.twimg.com/sticky/default_profile_images/default_profile_bigger.png\">" + "</td>";
    htmlCode += "<td>" + users[i]["name"] + " " + users[i]["surname"] + "<br>" + "@" + users[i]["username"] + "</td>";
    htmlCode += "<td><button class = 'btn btn-dark btn-sm rounded-pill' onclick = 'follow(" + i + ")'>Follow</button></td>";
    htmlCode += "</tr>";
  }

  document.getElementById("newTableID").innerHTML = htmlCode;
  let jsonValue = JSON.stringify(users);
  localStorage.setItem("profiles", jsonValue);

}

function follow(index){

  currentIndex = index;
  followers = getFollowers();


  followers.push({
    "name": users[currentIndex]["name"],
    "surname": users[currentIndex]["surname"],
    "username": users[currentIndex]["username"],
  });
  let jsonValue = JSON.stringify(followers);
  localStorage.setItem("followers", jsonValue);

  renderNewFollowerTable();
}


function unfollow(index){


  //let conf = confirm("Are you sure?");
  //if(conf){

    followers.splice(currentIndex,1);
    let jsonValue = JSON.stringify(followers);
    localStorage.setItem("followers", jsonValue);

    renderNewFollowerTable();



}



function getProfiles() {
  let usersString = localStorage.getItem("profiles");
  if (usersString == null) {
    return [];
  }
  let newArray = JSON.parse(usersString);
  return newArray;

}

function getFollowers() {
  let usersString = localStorage.getItem("followers");
  if (usersString == null) {
    return [];
  }
  let newArray = JSON.parse(usersString);
  return newArray;

}
