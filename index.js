function getWebcamAPIData() {
$.ajax({
  url: 'https://webcamstravel.p.mashape.com/webcams/list/country=ES',
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
      <iframe class="cam-results col-4" aria-label="Webcam Result" src="${webcam.player.day.embed}" 
      height="200" width="400" style="border:none"></iframe>`;
    });
    $('#js-cam-results').html(webcamArray.join(''));
  }
});
}

function displayList() {
  console.log('`displayList` ran');
  console.log(Object.keys(countryArray));
  const countryKeys = Object.keys(countryArray);
  const optionsArray = [];
  for (var i = 0; i <= countryKeys.length; i++) {
    optionsArray.push(`<option class="country-list" value="${key}">${countryArray[key]}</option>`);
  }

  const optionsHtml = Object.keys(countryKeys).map((key, index) => {
    return `
    <option class="country-list" value="${key}">${countryArray[key]}</option>`
  });

  const dropdownHtml = `
  <select id="country-select">${optionsHtml.join('')}</select>
   `;
  $('#country-list').html(dropdownHtml);
}


// if (!Object.keys) Object.keys = function(o) {
//   if (o !== Object(o))
//     throw new TypeError('Object.keys called on a non-object');
//   var k=[],p;
//   for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
//   return k;
// }


const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const APIkey = 'AIzaSyAh6hD7Q7RpUpIMVwPvmRH-pH4nByXYHis';


function getDataFromAPI(searchTerm, callback) {
  const settings = {
    part: 'snippet',
    key: APIkey,
    q: 'Travel tips for Spain'
  }
  $.getJSON(YOUTUBE_SEARCH_URL, settings, callback);
}


function renderResult(result) {

  if(result.id.kind === "youtube#video") {
    return `
    <iframe class="results" src="https://www.youtube.com/embed/${result.id.videoId}" height='200' width='400' title='${result.snippet.title}' aria-label='YouTube Video'> `;
  } else if(result.id.kind === "youtube#channel") {
    return `
    <a href="https://www.youtube.com/user/${result.snippet.channelTitle}" target="_blank" rel="noopener" aria-label='YouTube Channel'><img class='results' src='${result.snippet.thumbnails.medium.url}' alt='${result.snippet.title}' height='200' width='400'></a>`;
  }
}

function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('#js-results').html( results );
}

function watchSubmit() {
  $('#country-select').on('change', 'select', event => {
     alert(`Dropdown was modified to value: ${$('.country-list select').val()}`);
   });
}

//     const query = 'Travel tips for Spain';
//     getDataFromAPI(query, displayYouTubeSearchData);

// $(watchSubmit);



displayList();
getWebcamAPIData();
getDataFromAPI();