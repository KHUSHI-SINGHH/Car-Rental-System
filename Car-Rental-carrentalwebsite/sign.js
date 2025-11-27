 document.getElementById("signupForm").addEventListener("submit", function(e) {
      e.preventDefault();

      let Email = document.getElementById("email").value;
      let password = document.getElementById("password").value;

      let user = {
        useremail: Email,
        password: password
      };
    //    localStorage.clear();
      localStorage.setItem("userdata", JSON.stringify(user))
      



      
 
Swal.fire({
  title: "Good job!",
  text: "You clicked the button!",
  icon: "success"
}).then(()=>{
  window.location.href="loginin.html"
})
      

  
    })
