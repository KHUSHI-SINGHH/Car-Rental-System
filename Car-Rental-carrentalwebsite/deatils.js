
function booking(name ,image, price) {
 
  

  const cardata = {
    name: name,
    price: price,
    pic: image
  };

  localStorage.setItem("booking", JSON.stringify(cardata));

  // Check if image saved correctly
  console.log("Saved:", cardata);

  window.location.href = "bookingform.html";
}