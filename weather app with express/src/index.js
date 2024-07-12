let express = require('express')
let axios = require('axios')
let path = require('path')
let url = require('url')
let app = express()
let port = 3000
let staticPath = path.join(__dirname, '../public')


app.use(express.static(staticPath))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../views'))


// functioning for fetching weather data
let apiId =  'https://api.openweathermap.org/data/2.5/weather'
let apiKey = '15facce67a51ac42cf416ee97a10bfc2'

let getWeather = async (city) =>{
    try {
        let response = await axios.get(`${apiId}?q=${city}&appId=${apiKey}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

app.get('/', (req, res) =>{
    res.render('index')
})

app.get('/weather', async (req, res) =>{
   let queryObj =  url.parse(req.url, true).query
   let city = queryObj.city

   if(city){
        let weatherData = await getWeather(city)
      if (weatherData) {
        let data = JSON.stringify(weatherData)
        res.send(data)
        return data
      }   else{
        console.log('error fetching data');
      }
   } else{
     console.log('parameter required');
   }
})

app.get('*', (req, res) =>{
  res.render('error')
})

app.listen(port, () =>{
    console.log(`listening to ${port}`);
})