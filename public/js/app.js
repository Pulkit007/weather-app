const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const p1 = document.querySelector("#msg-1");
const p2 = document.querySelector("#msg-2");

weatherForm.addEventListener("submit", (e) => {
  p1.innerHTML = "Loading...";
  p2.innerHTML = "";
  e.preventDefault();
  const location = search.value;
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          return (p1.innerHTML = data.error);
        }
        p1.innerHTML = "Location : " + data.location;
        p2.innerHTML = "Temperature : " + data.data;
      });
    }
  );
});
