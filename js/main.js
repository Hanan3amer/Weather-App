var row = document.getElementById("row")

async function getweather(city) {
  var url = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e7f7ca52aed445a899c183002241406&q=${city}&days=3`)
  var res = await url.json()
  console.log(res)
  display(res)
}

function display(res) {
  var day1 = new Date(res.forecast.forecastday[0].date);
  var day1date = day1.getDate()
  var day1name = day1.toLocaleString('en-us', { weekday: 'long' })
  var day1month = day1.toLocaleString('en-us', { month: 'long' })
  console.log(`${day1month} ${day1date}`)

  var day2 = new Date(res.forecast.forecastday[1].date);
  var day2date = day2.getDate()
  var day2name = day2.toLocaleString('en-us', { weekday: 'long' })
  var day2month = day2.toLocaleString('en-us', { month: 'long' })
  console.log(`${day2month} ${day2date}`)

  var day3 = new Date(res.forecast.forecastday[2].date);
  var day3date = day3.getDate()
  var day3name = day3.toLocaleString('en-us', { weekday: 'long' })
  var day3month = day3.toLocaleString('en-us', { month: 'long' })

  console.log(`${day3month} ${day3date}`)

  var box = '';
  box += `
    <div class="col-md-4 my-3">
            <div class="card text-body rounded-4 color-bg">
              <div class="card-header">
                <div class="d-flex ">
                  <h6 class="flex-grow-1">${day1name}</h6>
                  <h6 >${day1month} ${day1date}</h6>
                </div>
              </div>
              <div class="card-body p-4 ">
                <h6 class="flex-grow-1">${res.location.name}</h6>
                <div class="d-flex flex-column text-center mt-5 mb-4">
                  <h6 class="display-4 mb-0 font-weight-bold py-2"> ${res.current.temp_c + "C"} </h6>
                  
                  <span class="small color">${res.current.condition.text}</span>
                </div>
  
                <div class="d-flex align-items-center">
                  <div class="flex-grow-1" >
                    <div><i class="fas fa-wind fa-fw color"></i> <span class="ms-1"> ${res.current.wind_kph} km/h</span>
                    </div>
                    <div><i class="fas fa-tint fa-fw color"></i> <span class="ms-1"> ${res.current.humidity}%
                      </span></div>
                    <div><i class="fas fa-compass fa-fw color"></i> <span class="ms-1"> ${res.current.wind_dir}
                      </span></div>
                  </div>
                  <div>
                    <img src="${res.current.condition.icon}">
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div class="col-md-4 my-3">
            <div class="card text-body rounded-4 color-bg">
              <div class="card-header">
                <div class="d-flex">
                <h6 class="flex-grow-1">${day2name}</h6>
                  <h6 >${day2month} ${day2date}</h6>
                </div>
              </div>
              <div class="card-body p-4">
                <h6 class="flex-grow-1">${res.location.name}</h6>
                <div class="d-flex flex-column text-center mt-5 mb-4">
                  <h6 class="display-4 mb-0 font-weight-bold"> ${res.forecast.forecastday[1].day.maxtemp_c + "C"} </h6>
                  <h6 class="small color"> ${res.forecast.forecastday[1].day.mintemp_c + "C"} </h6>
                  <span class="small color">${res.forecast.forecastday[1].day.condition.text}</span>
                </div>
                  <div>
                    <img src="${res.forecast.forecastday[1].day.condition.icon}">
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div class="col-md-4 my-3">
            <div class="card text-body rounded-4 color-bg">
              <div class="card-header">
                <div class="d-flex">
                <h6 class="flex-grow-1">${day3name}</h6>
                  <h6 >${day3month} ${day3date}</h6>
                </div>
              </div>
              <div class="card-body p-4">
                <h6 class="flex-grow-1">${res.location.name}</h6>
                <div class="d-flex flex-column text-center mt-5 mb-4">
                  <h6 class="display-4 mb-0 font-weight-bold"> ${res.forecast.forecastday[2].day.maxtemp_c + "C"} </h6>
                  <h6 class="small color"> ${res.forecast.forecastday[2].day.mintemp_c + "C"} </h6>
                  <span class="small color">${res.forecast.forecastday[2].day.condition.text}</span>
                </div>
                  <div>
                    <img src="${res.forecast.forecastday[2].day.condition.icon}">
                  </div>
                </div>
              </div>
            </div>
          </div>
`
  row.innerHTML = box
}

var search = document.getElementById("search")
search.addEventListener('keyup', function () {
  var city = search.value.trim()
  getweather(city)

})

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getweather(`${latitude},${longitude}`)
  },

    function (error) {
      console.log(error, "there is no location found")
      getweather("Cairo")
    }
  )
} else {
  getweather("Cairo")
}
var findBtn = document.getElementById("findBtn")
findBtn.addEventListener('click', function () {
  var city = search.value.trim()
  getweather(city)
})