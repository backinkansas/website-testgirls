const EVENT_PHOTOS = {
  243660952: 'https://secure.meetupstatic.com/photos/event/a/9/b/3/600_465463443.jpeg',
  244697891: 'https://secure.meetupstatic.com/photos/event/4/1/d/5/600_466756853.jpeg',
  245365857: 'https://secure.meetupstatic.com/photos/event/c/c/5/4/600_466072308.jpeg',
  246663263: 'https://secure.meetupstatic.com/photos/event/9/4/2/2/600_468097922.jpeg',
  247880254: 'https://secure.meetupstatic.com/photos/event/3/4/5/6/600_468853398.jpeg',
  248826353: 'https://secure.meetupstatic.com/photos/event/3/7/c/6/600_469634278.jpeg',
  249856036: 'https://secure.meetupstatic.com/photos/event/a/d/0/9/600_470864297.jpeg',
  250937792: 'https://secure.meetupstatic.com/photos/event/7/0/9/5/600_471448821.jpeg',
  251989136: 'https://secure.meetupstatic.com/photos/event/c/5/e/2/600_473390658.jpeg',
  252839827: 'https://secure.meetupstatic.com/photos/event/7/1/d/600_474181821.jpeg',
  253982387: 'https://secure.meetupstatic.com/photos/event/3/a/d/6/600_474915062.jpeg',
  254827338: 'https://secure.meetupstatic.com/photos/event/d/8/8/f/600_475255439.jpeg',
  255078100: 'https://secure.meetupstatic.com/photos/event/2/4/1/9/600_475989241.jpeg',
  255766587: 'https://secure.meetupstatic.com/photos/event/7/e/e/600_474182030.jpeg',
} 

function createMarkUp(container, allPastEvents) {

	if (allPastEvents.length == 0) {
		container.innerHTML = `<p class="past-events__card__description">Ainda não aconteceu nenhum evento</p>`
		return;
  }
  
  let allEvents = "";
  

  for(var i=allPastEvents.length - 1; i>0; i--) {
    const date = allPastEvents[i].local_date;
    const formattedDate = moment(date).format("DD/MM/YYYY");
    //const hiddenEventId = '256927054';
    let eventImage;

    if(EVENT_PHOTOS[allPastEvents[i].id] === undefined) {
      eventImage = "/assets/images/tg_logo_3.png";
    } else {
      eventImage = EVENT_PHOTOS[allPastEvents[i].id];
    }

    let card = `<div class="past-events__card">
    <div class="past-events__card__content">
    <img src="${eventImage}">
      <h5 class="past-events__card__title">
        <a href="${allPastEvents[i].link}" target=_blank class="past-events__card__link">${allPastEvents[i].name}</a>
      </h5>
    </div>
    <h4 class="past-events__card__date">${formattedDate}</h4>
  </div>`

    //if(allPastEvents[i].id !== hiddenEventId) { // quando esse id existir não cria um card na tela
      allEvents += card;
      //}
    }

  container.innerHTML = allEvents;
}

function initCarousel() {
  $('.past-events__container').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<span class="past-events__previous"><</span>',
    nextArrow: '<span class="past-events__next">></span>',
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  });
}

$(document).ready(function() {
  const container = document.getElementById('past-events');
  const url = "https://api.meetup.com/test-girls/events?photo-host=public&page=20&sig_id=263238648&status=past&sig=19fb03b393ec40efe2a8bc48e8b594a0c5aa62e2";

  fetch(url) //request do tipo get nessa url
    .then(function(response) { //fetch retorna uma promise, quando receber a resposta
      if(response.ok) { //se o status da resposta for ok 
        return response.json();
      }
      throw new Error('Network response was not ok');
    })
    .then(function(allPastEvents){//se a promise der certo cai aqui, se der erro cai no catch
      createMarkUp(container, allPastEvents); //dando certo, chama a função createMarkUp() passando como parâmetro a resposta do fetch (allPastEvents)
      initCarousel();
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ', error.message);
    });
});