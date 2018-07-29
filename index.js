function getWebcamAPIData() {
  $('#country-list').on('change', 'select', event => {
    let countryKeySelected = $('#country-select').val();
  $.ajax({
  url: 'https://webcamstravel.p.mashape.com/webcams/list/country=${countryKeySelected}',
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
      return `
      <img class="cam-results col-4" aria-label="Webcam Result" src="${webcam.player.day.embed}" 
      height="200" width="400" style="border:none">`;
    });
    $('#js-cam-results').html(webcamArray.join(''));
  }
});
});
}

function displayList() {
  console.log('`displayList` ran');
  console.log(Object.keys(countryArray));
  const optionsHtml = Object.keys(countryArray).map((key, index) => {
    return `
    <option class="country-list" value="${key}">${countryArray[key]}</option>`
  });

  const dropdownHtml = `
  <select id="country-select">${optionsHtml.join('')}</select>
   `;
  $('#country-list').html(dropdownHtml);
}



const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const APIkey = 'AIzaSyAh6hD7Q7RpUpIMVwPvmRH-pH4nByXYHis';

function getDataFromAPI(callback) {
  const settings = {
    part: 'snippet',
    key: APIkey,
    q: 'Travel tips for Spain'
  }
  $.getJSON(YOUTUBE_SEARCH_URL, settings, callback);
}

function generateResult(result) {
  if(result.id.kind === "youtube#video") {
    return `
    <img class="results" src="https://www.youtube.com/embed/${result.id.videoId}" height='200' width='400' title='${result.snippet.title}' aria-label='YouTube Video'> `;
  } else if(result.id.kind === "youtube#channel") {
    return `
    <a href="https://www.youtube.com/user/${result.snippet.channelTitle}" target="_blank" rel="noopener" aria-label='YouTube Channel'><img class='results' src='${result.snippet.thumbnails.medium.url}' alt='${result.snippet.title}' height='200' width='400'></a>`;
  }
}

function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => generateResult(item));
  $('#js-results').html( results );
}

$(document).ready(function() {
  displayList();
  getWebcamAPIData();
  getDataFromAPI(displayYouTubeSearchData);
});