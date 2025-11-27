window.onload = function () {
  // Fetch the latest booking record from JSON Server
  fetch("http://localhost:3000/book")
    .then((res) => res.json())
    .then((data) => {
      // Get the last booking entry (assuming you want the latest one)
      const lastBooking = data[data.length - 1];
      if (!lastBooking) {
        alert("No booking data found!");
        return;
      }

      // Show image if available
      if (lastBooking.image) {
        document.getElementById("img").src = lastBooking.image;
      }

     // ✅ Fill the booking details using innerHTML (for non-input tags)
document.getElementById("fullname").innerHTML = lastBooking.fullname || "";
document.getElementById("email").innerHTML = lastBooking.email || "";
document.getElementById("phone").innerHTML = lastBooking.phone || "";
document.getElementById("adhar").innerHTML = lastBooking.adhar || "";
document.getElementById("pickupdate").innerHTML = lastBooking.pickupdate || "";
document.getElementById("pickuptime").innerHTML = lastBooking.pickuptime || "";
document.getElementById("returndate").innerHTML = lastBooking.returndate || "";
document.getElementById("returntime").innerHTML = lastBooking.returntime || "";
document.getElementById("pickuplocation").innerHTML = lastBooking.pickuplocation || "";
document.getElementById("returnlocation").innerHTML = lastBooking.returnlocation || "";
document.getElementById("payment").innerHTML = lastBooking.payment || "";
document.getElementById("carname").innerHTML = lastBooking.carname || "";
document.getElementById("pricePerDay").innerHTML = `₹${lastBooking.pricePerDay || 0}`;
document.getElementById("totalDays").innerHTML = lastBooking.totalDays || "";
document.getElementById("totalPrice").innerHTML = `₹${lastBooking.totalPrice || 0}`;

    })
    .catch((err) => console.error("❌ Error loading booking data:", err));
};
