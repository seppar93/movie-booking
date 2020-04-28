// Selectors
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(occupied)'); // adds to node list
const total = document.getElementById('total');
const count = document.getElementById('count');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value; // + turns string into number when declaring


// functions
function updatedSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected')
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice
  
}

// event listeners

movieSelect.addEventListener('change', event => {
  ticketPrice = +event.target.value
  updatedSelectedCount()
})



// seat click event
container.addEventListener('click', (event) => {
  if (
    event.target.classList.contains('seat') &&
    !event.target.classList.contains('occupied')
  ) {
    event.target.classList.toggle('selected');

    updatedSelectedCount()
  }
});

