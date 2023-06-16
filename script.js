let allbreachesCount = data.length - 1
let right = 11;
let left = 10;

$('.sidebar-1').html(
    `<span class="left-beach">${data[left].title}</span>
    <i onclick="leftSlide(${data[left].id})" class="slide-arrows fa-solid fa-circle-chevron-left"></i>`
)

$('.sidebar-2').html(
    `<i onclick="rightSlide(${data[right].id})" class="slide-arrows fa-solid fa-circle-chevron-right"></i>
    <span class="right-beach">${data[right].title}</span>`
)

let firstPlaceLat = parseFloat(data[11].geolocation.lat)
let firstPlaceLng = parseFloat(data[11].geolocation.lng)

const map = L.map('map').setView([firstPlaceLat,firstPlaceLng],10)

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution = '© OpenStreetMap contributors ♥ Make a Donation. Website and API terms'

const tiles = L.tileLayer(tileUrl,{attribution})
tiles.addTo(map)

data.forEach( (place) => {
    if(place.id !== 0){
        let lat = parseFloat(place.geolocation.lat)
        let lng = parseFloat(place.geolocation.lng)
        let marker = L.circleMarker([lat,lng],{
            color:'lightskyblue',
            fillColor:'darkblue',
            fillOpacity: 1,
        })
        marker.bindPopup(`<p class="markerPopup">${place.title}</p>`).openPopup()
        marker.addTo(map)
    }
})

function leftSlide(id){
    let newData = data.filter( (beach) => beach.id === id)
    newData = newData[0]
    console.log(newData);
    map.flyTo([newData.geolocation.lat,newData.geolocation.lng],14,{
        duration : 3
    })
    
    $('.sidebar-1').html(
        `<span class="left-beach">${newData.title}</span>
        <i onclick="leftSlide(${newData.id-1})" class="slide-arrows fa-solid fa-circle-chevron-left"></i>`
    )

    $('.image').attr('src',newData.image)
    $('.title').text(newData.title)
    $('.discription').html(newData.description)
}

function rightSlide(id){
    
    let newData = data.filter( (beach) => beach.id === id)
    newData = newData[0]
    console.log(newData);
    map.flyTo([newData.geolocation.lat,newData.geolocation.lng],20,{
            duration : 1
        })

    $('.sidebar-2').html(
        `<i onclick="rightSlide(${newData.id-+1})" class="slide-arrows fa-solid fa-circle-chevron-right"></i>
        <span class="right-beach">${newData.title}</span>`
    )

    $('.image').attr('src',newData.image)
    $('.title').text(newData.title)
    $('.discription').html(newData.description)
}

