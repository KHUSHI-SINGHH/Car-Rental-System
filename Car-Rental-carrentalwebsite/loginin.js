document.getElementById("formdata").addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let signuser = JSON.parse(localStorage.getItem("userdata"));

  
  if (!signuser) {
    alert("No user found! Please sign up first.");
    return;
  }


  if (email != signuser.useremail) {
    alert("Invalid Email!");
    return;
  }

  
  if (password != signuser.password) {
    alert("Invalid Password!");
    return;
  }

  Swal.fire({
  title: "Succesfully!",
  text: "You clicked the button!",
  icon: "success"
}).then(()=>{
  window.location.href="booking.html"
})
  
});
   