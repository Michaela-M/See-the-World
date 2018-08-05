const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const APIkey = 'AIzaSyAh6hD7Q7RpUpIMVwPvmRH-pH4nByXYHis';

function displayList() {
  const optionsHtml = Object.keys(countryArray).map((key, index) => {
    return `
    <option class="country-list center" value="${key}">${countryArray[key]}</option>`;
  });

  const dropdownHtml = `
  <select id="country-select" class="center drop">${optionsHtml.join('')}</select>
   `;
  $('#country-list').html(dropdownHtml);
}

function getWebcamAPIData() {
  $('#country-list').on('change', 'select', event => {
    let countryKeySelected = $('#country-select').val();
    let countryNameSelected = $("#country-select").text();
  $.ajax({
  url: `https://webcamstravel.p.mashape.com/webcams/list/limit=9/orderby=popularity,desc/category=mountain/country=${countryKeySelected}`,
  data: {show:'webcams:image,location,player'},
  dataType: 'json',
  type: 'GET',
  headers: {"X-Mashape-Key": 'cgDecNwco7mshVPaItCd9ogfs5nnp1OCnOVjsn8Yn430nwywin',
  "X-Mashape-Host": 'webcamstravel.p.mashape.com'},
    success: function(data) {      
      let webcamArray = data.result.webcams.map(function(webcam) {
        if (data.result.total > 0) { 
        return `
        <h4 class=cam-titles>${webcam.location.city}, ${webcam.location.region}</h4>

        <iframe class="webcams" src="${webcam.player.day.embed}"></iframe>
        `;
        }
      });
      if(webcamArray.length == 0) {
        $('#js-cam-results-text').html('');
        $('#js-cam-results').html("<h4>This country has no webcams yet :( </h4>");
      } else {
        $('#js-cam-results-text').html(`<h3 id="scrollTo" class="cam-results-for">Webcam Results for ${data.result.webcams[0].location.country}</h3>`);
        $('#js-cam-results').html(webcamArray.join(''));
      }
    }
  });
  });
}

function getDataFromAPI(callback) {
   $('#country-list').on('change', 'select', event => {
      let countryNameSelected = $('#country-select option:selected').text();
      const settings = {
        part: 'snippet',
        key: APIkey,
        q: `Best of travel in ${countryNameSelected}`,
        maxResults: 6,
        relevanceLanguage: 'en',
        type: 'video',
        order: 'Relevance'
      };
      $.getJSON(YOUTUBE_SEARCH_URL, settings, callback);
    });
}


function generateResult(result) {
  if(result.id.kind === "youtube#video") {
    return `
    <iframe class="vid-results" src="https://www.youtube.com/embed/${result.id.videoId}" title='${result.snippet.title}' aria-label='YouTube Video'></iframe>`;
  } else if(result.id.kind === "youtube#channel") {
    return `
    <a href="https://www.youtube.com/user/${result.snippet.channelTitle}" target="_blank" rel="noopener" aria-label='YouTube Channel'><img class='results' src='${result.snippet.thumbnails.medium.url}' alt='${result.snippet.title}'></a>`;
  }
}

function displayYouTubeSearchData(data) {
  let countryNameSelected = $('#country-select option:selected').text();
  const results = data.items.map((item, index) => generateResult(item));
  $('#js-results-text').html(`<h3 class="video-col-title">Video Results for ${countryNameSelected}</h3>`);
  $('#js-results').html( results );
}

function scrollTo() {
$("#country-select").on('change', function() {
  console.log(`'scrollTo' ran`);
  $('html, body').animate({
      scrollTop: $('.results').offset().top
  }, 1000);
});
}



$(document).ready(function() {
  displayList();
  scrollTo();
  getWebcamAPIData();
  getDataFromAPI(displayYouTubeSearchData);
});

