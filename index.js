function getDataFromAPI(menuItem, callback) {
$.ajax({
  url: 'https://webcamstravel.p.mashape.com/webcams/list/country=ES',
  // url: "https://webcamstravel.p.mashape.com/webcams/list/country=Spain?lang=en&show=webcams%3Aimage%2Clocation",
  data: {show:'webcams:image,location,player'},
  dataType: 'json',
  type: 'GET',
  headers: {"X-Mashape-Key": 'cgDecNwco7mshVPaItCd9ogfs5nnp1OCnOVjsn8Yn430nwywin',
  "X-Mashape-Host": 'webcamstravel.p.mashape.com'},
  success: function(data) {
  	console.log(data);
  	console.log(data.result.webcams["0"].title);
  	let webcamArray = data.result.webcams.map(function(webcam) {
  		return `<img class="cam-results" aria-label="Webcam Result" src="${webcam.image.current.thumbnail}">`;
  	});
  	$('#js-results').html(webcamArray.join(''));

  }
});
}

getDataFromAPI();

// function renderResults() {
// 	return `
// 	<section role="region">
// 	<img class="cam-results" src="https://webcamstravel.p.mashape.com/webcams/list/country=ES/${result.webcams.title}" 
// 	aria-label="Webcam Result">
// 	</section>`;
// }