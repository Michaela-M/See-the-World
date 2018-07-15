$.ajax({
  url: 'https://webcamstravel.p.mashape.com/webcams/list/country=ES',
  data: 'querydata',
  dataType: 'json',
  type: 'GET',
  headers: {"X-Mashape-Key": 'cgDecNwco7mshVPaItCd9ogfs5nnp1OCnOVjsn8Yn430nwywin',
  "X-Mashape-Host": 'webcamstravel.p.mashape.com'},
  success: function(data) {
    console.log(data);
  }
});