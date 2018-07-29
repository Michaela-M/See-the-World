function getDataFromAPI() {
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
    $('#js-results').html(webcamArray.join(''));
  }
});
}

// function displayList() {
//   console.log('`displayList` ran');
//   const countryList = countryArray;
//   const countryInput = `
//     <select id="country-select">
//         <option class="country-list" value="${countryList[0].ccode}" label="${countryList[0].cname}">${countryList[0].ccode}</option>
//         <option class="country-list" value="ES" label="Spain">ES</option>
//         <option class="country-list" value="IS" label="Iceland">IS</option>
//         <option class="country-list" value="IR" label="Iran">IR</option>
//     </select>
//    `;
//   $('#country-list').html(countryInput);
// }

function displayList() {
  console.log('`displayList` ran');
  console.log(Object.keys(countryArray));
  const countryArr = Object.keys(countryArray);
  const optionsArray = [];
  for (var i = 0; i <= countryArr.length; i++) {
    optionsArray.push(`<option class="country-list" value="${key}">${countryArray[key]}</option>`);
  }

  const optionsHtml = Object.keys(countryArray).map(key => {
    return `
    <option class="country-list" value="${key}">${countryArray[key]}</option>`
  });

  const dropdownHtml = `
  <select id="country-select">${optionsHtml.join('')}</select>
   `;
  $('#country-list').html(dropdownHtml);
}

if (!Object.keys) Object.keys = function(o) {
  if (o !== Object(o))
    throw new TypeError('Object.keys called on a non-object');
  var k=[],p;
  for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
  return k;
}





//   for (i = 0; i < li.length; i++) {
//     a = li{i}.$("a") [0];
//     if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
//       li[i].style.display = "";
//     } else {
//       li[i].style.display = 'none';
//     }
//     }
//   }

displayList();
getDataFromAPI();