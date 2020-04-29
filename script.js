// Selectors
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(occupied)'); // adds to node list
const total = document.getElementById('total');
const count = document.getElementById('count');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value; // + turns string into number when declaring

populateUI()
// functions
function updatedSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected')
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice
  
  const seatsIndex = [...selectedSeats].map( seat => {
     return [...seats].indexOf(seat)
  })
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
  
}

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex)
  localStorage.setItem('selectedMoviePrice', moviePrice)
}

function populateUI () {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))


  if(selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1){
        seat.classList.add('selected')
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
  if(selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}



// event listeners

movieSelect.addEventListener('change', event => {
  ticketPrice = +event.target.value
  setMovieData(e.target.selectedIndex, e.target.value)
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

// initial count set
updatedSelectedCount()