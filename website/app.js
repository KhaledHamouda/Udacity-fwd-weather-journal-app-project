// Personal API key for OpenWeatherMap API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const key = ",&appid=9d352d4a14e8adf2737077d0be8ab0ed&units=imperial";

//global variables
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

const performAction = function (e){ 
    //get the input values zip and feeling
    const zipValue = document.getElementById("zip").value;
    const feelingsValue = document.getElementById("feelings").value;
    e.preventDefault();
    // get the zip info and return promise
    getTempData(baseURL,zipValue,key).then((data) => {
        postData("http://127.0.0.1:4000/add", {date:newDate,
        name:data.name,
        temp:data.main.temp,
        Description:data.weather[0].description,
        humidity:data.main.humidity,
        feelings:feelingsValue});
        
        updatingUI();
  });
};

//Function to GET Web API Data 
const getTempData = async (baseURL,zipValue,key) => {
    const res = await fetch(baseURL + zipValue + key);
    try {
        const data = await res.json();
        return data;
  } catch (error) {
    console.log("error",error)
}
};

// Function to POST data
const postData = async (url = "", data = {}) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await res.json();
        console.log(`You just saved`, newData);
        return newData;
    } catch (error) {
        console.log("error",error)
    }
};
 
const updatingUI = async () => {
    try {
    const res = await fetch("http://127.0.0.1:4000/all");
    
    //checking that all data had been got correctly
    const retrieveData = await res.json();
    console.log("Temperature:"+retrieveData.temp);
    console.log("Date:"+retrieveData.date);
    console.log("Description:"+retrieveData.Description);
    console.log("name:"+retrieveData.name);
    // Write updated data to DOM elements
    document.getElementById("date").innerHTML = retrieveData.date;
    document.getElementById("city").innerHTML = retrieveData.name;
    document.getElementById("description").innerHTML = retrieveData.Description;
    document.getElementById("humidity").innerHTML ='Humidity:' +retrieveData.humidity+'%';
    document.getElementById("temp").innerHTML = parseInt(retrieveData.temp) + '&degF';
    document.getElementById("content").innerHTML = retrieveData.feelings;
} catch (error) {
    console.log("error",error)
}
document.getElementById('entry').style.opacity = 4;
};

// do perfromAction function when press on generate button.
document.getElementById("generate").addEventListener("click", performAction);