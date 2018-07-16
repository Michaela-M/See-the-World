function getDataFromAPI() {
$.ajax({
  url: 'https://webcamstravel.p.mashape.com/webcams/list/country=ES',
  // url: "https://webcamstravel.p.mashape.com/webcams/list/country=Spain?lang=en&show=webcams%3Aimage%2Clocation",
  data: {show:'webcams:image,location,player'},
  orderby: 'popularity',
  dataType: 'json',
  type: 'GET',
  headers: {"X-Mashape-Key": 'cgDecNwco7mshVPaItCd9ogfs5nnp1OCnOVjsn8Yn430nwywin',
  "X-Mashape-Host": 'webcamstravel.p.mashape.com'},
  success: function(data) {
    console.log(data);
    console.log(data.result.webcams["0"].title);
    let webcamArray = data.result.webcams.map(function(webcam) {
      return `<iframe class="cam-results" aria-label="Webcam Result" src="${webcam.player.day.embed}" height="200" width="400" style="border:none"></iframe>`;
    });
    $('#js-results').html(webcamArray.join(''));
  }
});
}

getDataFromAPI();