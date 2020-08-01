import React,{useState, useEffect} from 'react';
import './Weather.scss';
function Weather(){
    const key='a945650cf962b492b5fef53d4749b755';
    const [Location,setLocation]= useState('');
    const [midLocation,setMidLocation]= useState('');
    const [feels_like,setFeelsLike]= useState('');
    const [mainTemp,setMainTemp] = useState('');
    const [description,setDescription] = useState('');
    const [main,setMain] = useState('');
    const [iconID,setIconID] = useState('');
    const [humidity,setHumidity] = useState('');
    const [pressure,setPressure] = useState('');
    const [speed,setSpeed] = useState('');


useEffect(()=>{
    if(!Location){
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log( position.coords.latitude);
            console.log( position.coords.longitude);
    
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&APPID=a945650cf962b492b5fef53d4749b755&units=metric')
    .then(obj=>obj.json())
    .then(
        data=>{
            console.log(data);
            setFeelsLike(data.main.feels_like);
            setMainTemp(data.main.temp);
            setDescription(data.weather[0].description);
            setMain(data.weather[0].main);
            setIconID(data.weather[0].icon);
            setLocation(data.name);
            setHumidity(data.main.humidity);
            setSpeed(data.wind.speed);
        }
    )
    });

}
});

function myabc(city){
    if(!city){
        alert("Location not entered")
    }
    else{
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=a945650cf962b492b5fef53d4749b755&units=metric')
    .then(obj=>obj.json())
    .then(
        data=>{
            console.log(data);
            if(data.cod==404) alert("Location not found")
            else {setFeelsLike(data.main.feels_like);
            setMainTemp(data.main.temp);
            setDescription(data.weather[0].description);
            setMain(data.weather[0].main);
            setIconID(data.weather[0].icon);
            setLocation(data.name);
            setHumidity(data.main.humidity);
            setPressure(data.main.pressure);
            setSpeed(data.wind.speed);}
        }
    )
}
}


return (
    <div className='option-container clearfix' key={main}>
    <input type='search' placeholder='Search Location'
    className='option-input'
    onChange={e=>setMidLocation(e.target.value)}
    />
    <button onClick={()=>myabc(midLocation)}
    className='input-button'>Search</button>
    <div className="info-container">
    <div className='option'>{pressure===''?<span >Current Location :</span>:<span >Location :</span>} {Location}</div >
    <div className='option'>Max Temperature : {mainTemp} Degrees Celsius</div>
    <div className='option'>Min Temperature : {mainTemp-8} Degrees Celsius</div>
    <div className='option'>Feels like : {feels_like} Degrees Celsius</div>
    <div className='option'>Weather Parameter : {main} </div>
    <div className='option'>Humidity : {humidity} %</div >
    <div className='option'>Wind Speed : {speed} Kmph</div >
    <div className='option'>Description : {description}</div>
    <img className='option-image'
    src={"http://openweathermap.org/img/wn/" + iconID + "@2x.png"}/>
    </div>
    </div>
)
}
export default Weather;