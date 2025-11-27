// Load Car Details on Page
window.onload = function () {
  const up = JSON.parse(localStorage.getItem("booking"));
  if (up) {
    document.getElementById("img").src = up.pic;
    document.getElementById("carname").innerText = up.name;
    document.getElementById("price").innerText = up.price;
  } else {
    Swal.fire("⚠️ No booking found!", "Please go back and select a car.", "warning");
  }

  document.getElementById("pickupdate").addEventListener("change", calculatePrice);
  document.getElementById("returndate").addEventListener("change", calculatePrice);
};

// Calculate Total Price
function calculatePrice() {
  const pickupdate = document.querySelector("#pickupdate").value;
  const returndate = document.querySelector("#returndate").value;
  if (!pickupdate || !returndate) return;

  const pickupDateObj = new Date(pickupdate);
  const returnDateObj = new Date(returndate);
  const timeDiff = returnDateObj - pickupDateObj;
  let totalDays = timeDiff / (1000 * 3600 * 24);

  if (totalDays <= 0 || isNaN(totalDays)) {
    document.getElementById("price").innerText = "Invalid dates ❌";
    return;
  }

  totalDays = Math.ceil(totalDays);

  const up = JSON.parse(localStorage.getItem("booking"));
  if (!up) return;

  const pricePerDay = parseInt(String(up.price).replace(/[^\d]/g, ""), 10) || 0;
  const totalPrice = pricePerDay * totalDays;
  document.getElementById("price").innerText = `₹${totalPrice}`;
}

// Submit Booking Data
function data(event) {
  event.preventDefault();

  const up = JSON.parse(localStorage.getItem("booking"));
  if (!up) {
    Swal.fire("❌ Error", "No car details found!", "error");
    return;
  }

  const fullname = document.querySelector("#fullname").value;
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#phone").value;
  const adhar = document.querySelector("#adhar").value;
  const pickupdate = document.querySelector("#pickupdate").value;
  const pickuptime = document.querySelector("#pickuptime").value;
  const returndate = document.querySelector("#returndate").value;
  const returntime = document.querySelector("#returntime").value;
  const pickuplocation = document.querySelector("#pickuplocation").value;
  const returnlocation = document.querySelector("#returnlocation").value;
  const payment = document.querySelector("#paymentmethod").value;

  if (!fullname || !email || !phone || !adhar || !pickupdate || !returndate) {
    Swal.fire("⚠️ Incomplete Form", "Please fill all required fields.", "warning");
    return;
  }

  const pickupDateObj = new Date(pickupdate);
  const returnDateObj = new Date(returndate);
  let totalDays = (returnDateObj - pickupDateObj) / (1000 * 3600 * 24);

  if (totalDays <= 0 || isNaN(totalDays)) {
    Swal.fire("⚠️ Invalid Dates", "Pickup date must be before return date.", "warning");
    return;
  }

  totalDays = Math.ceil(totalDays);
  const pricePerDay = parseInt(String(up.price).replace(/[^\d]/g, ""), 10) || 0;
  const totalPrice = pricePerDay * totalDays;

  const bookdata = {
    fullname,
    email,
    phone,
    adhar,
    pickupdate,
    pickuptime,
    returndate,
    returntime,
    pickuplocation,
    returnlocation,
    payment,
    carname: up.name,
    price: pricePerDay,
    days: totalDays,
    total: totalPrice,
    image: up.pic,
  };

  fetch("http://localhost:3000/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookdata),
  })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res.json();
    })
    .then(() => {
      localStorage.setItem("invoiceData", JSON.stringify(bookdata));

 Swal.fire({
  title: "Succesfully!",
  text: "You clicked the button!",
  icon:"success",
  
})
  window.location.href="invoice.html"
   })
    .catch((err) => {
      console.error("Error inserting data:", err);
      Swal.fire("❌ Error", "Booking failed! Check console.", "error");
    });
}
