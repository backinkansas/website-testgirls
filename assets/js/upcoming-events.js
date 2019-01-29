const PT_MONTHS = {
	0: 'JAN',
	1: 'FEV',
	2: 'MAR',
	3: 'ABR',
	4: 'MAI',
	5: 'JUN',
	6: 'JUL',
	7: 'AGO',
	8: 'SET',
	9: 'OUT',
	10: 'NOV',
	11: 'DEZ'
}
  
function handleDate(date) {
	const day = date.getDate()
	const month = PT_MONTHS[date.getMonth()]
	return `${day} ${month}`
}

function handleDescription(text) {
	return text.slice(3, 130)
}

function createMarkUp(container, collection) {

	if (collection.length == 0) {
		container.innerHTML = `<p class="upcoming-events__card__description">Ainda não há eventos marcados...</p>`
		return
	}

	const event = collection[0]
	const originalDate = new Date(event.time)
	const date = handleDate(originalDate)
	const eventText = handleDescription(event.description)

	container.innerHTML = `
	<div class="upcoming-events__card">
		<h4 class="upcoming-events__card__date">${date}</h4>
		<div class="upcoming-events__card__content">
			<h5 class="upcoming-events__card__title">
				<a href="${event.link}" target=_blank class="upcoming-events__card__link">${event.name}</a>
			</h5>
			<p class="upcoming-events__card__description">${eventText}...</p>
		</div>
	</div>`
}
  
function distribute(result) {
	const eventContainer = document.getElementsByClassName('upcoming-events__container')[0]

	createMarkUp(eventContainer, result.data)
}

function fetchEvents(url) {
	$.ajax({
		dataType:'jsonp',
		method:'get',
		url:url,
		success:function(result) {
			distribute(result)
		}
	});	
}

$(document).ready(function() {
	fetchEvents("https://api.meetup.com/test-girls/events?photo-host=public&page=20&sig_id=252409091&sig=cee0a3f17064bf6e1c2993fe5a930e12ca159993&callback=?");	
});

