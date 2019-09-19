var button = document.getElementById('button');
var q1 = document.getElementById('q1');
var q1_ans = document.createElement('h4');

var q2 = document.getElementById('q2');
var q2_ans = document.createElement('h4');

var q3 = document.getElementById('q3');
var q3_ans = document.createElement('h4');

var q4 = document.getElementById('q4');
var q4_ans = document.createElement('h4');

var starWarsFilm = 'https://swapi.co/api/films/';
var starWarsPeople = 'https://swapi.co/api/people/';
var starWarsSpecies = 'https://swapi.co/api/species/';
var starWarsPlanets = 'https://swapi.co/api/planets/';

var starWarsFilmName = [];
var starWarsFilmCrawl = [];

var longest= -1;
var longestCrawl = null;

var highest_appearance = -1;
var highest_appearance_person = null;



// get data from api
function requestData(){
    //request films 
    axios.get(starWarsFilm).then(response =>{
      getLongestCrawl(response.data.results);
    }).catch(e =>{
        console.log("not available")
    })
    // request people
    axios.get(starWarsPeople).then(response =>{
        getMostAppeared(response.data.results);
        getValidPeople(response.data.results);
      }).catch(e =>{
        console.log("not available")
    })
      //request species
    axios.get(starWarsSpecies).then(response =>{
        getSpeciesAppearance(response.data.results);
      }).catch(e =>{
        console.log("not available")
    })
      //request planet
    axios.get(starWarsPlanets).then(response =>{
        getPlanet_With_Largest_Vehicle_Pilot(response.data.results);
      }).catch(e =>{
        console.log("not available")
    })
}

//get movie with longest opening crawl
function getLongestCrawl(data){
    console.log("film array size : " + data.length)
    for(let i = 0; i <data.length; i++){
        //print length of crawls
        console.log(data[i].opening_crawl.length);
        //find longest crawl
        if(data[i].opening_crawl.length > longestCrawl){
            longest = data[i].opening_crawl.length;
            longestCrawl = data[i].title;
        }
    }

    //appen result to html
    //Which of all StarWars movies has the longest opening crawl (counted by number of characters)?
    console.log("film with longest opening crawl: " +longestCrawl);
    q1_ans.innerHTML = longestCrawl;
    q1_ans.setAttribute("class","starwars_ans_center")
    q1.appendChild(q1_ans);
}

// function finds the most appeared person in the starwars film
function getMostAppeared(data){
    console.log("total number of persons : " + data.length)
    //for all persons, get the size of the film array
    for(let i = 0; i <data.length; i++){
      //check who has appeared most in the star wars film
      if(highest_appearance < data[i].films.length){
          highest_appearance = data[i].films.length;
          highest_appearance_person = data[i].name;
      }
    }

    //append result to html
    //What character (person) appeared in the most of StarWars films?
    console.log(highest_appearance_person + "  appeared : " + highest_appearance)
    q2_ans.innerHTML = highest_appearance_person;
    q2_ans.setAttribute("class","starwars_ans_center")
    q2.appendChild(q2_ans);
}
 

/**
 * What species (i.e. characters that belong to certain species) 
 * appeared in the most number of StarWars films? 
 * Return result as an array of objects in descending order. 
 * Each object in resulting array should have at least two fields: 
 * species and number of appearances. 
 * Note: if a character appears in a movie it counts as one appearance. 
 * Example: Solo, Luc and Lia are people and they appear in “New Hope”.
 *  That means that the human species has at least 3 appearances in “New Hope”.
 */
var specieArray = [];
var countFilmsInSpecie = -1;
var specieName = null;
function getSpeciesAppearance(data){
    //get the species
    //count the appearance 
    //ignore 0
    //display each specie with count value

    //how many species?
    console.log("number of species in starwars : " + data.length);
    for(let i=0; i<data.length; i++){
        // count the number of films in the array
        if(countFilmsInSpecie < data[i].films.length){
            countFilmsInSpecie = data[i].films.length;
            specieName = data[i].name;
        }
    }
    console.log(`${specieName} has  appeared the most with ${countFilmsInSpecie} counts`);


    //append result to html
    q3_ans.innerHTML = `${specieName} (${countFilmsInSpecie})`;
    q3_ans.setAttribute("class","starwars_ans_center")
    q3.appendChild(q3_ans);
}


/**
 * What planet in StarWars universe provided largest number of vehicle pilots? Provide 
 * report as list of JSON objects, in descending order. Each JSON objects should have 
 * the following attributes:PlanetNumber of pilotsArray of pilots. Each item in the array 
 * should be object with pilot’s name, the name of the pilot’s species.
 */

 var ArrayOfResidentsInPlanets = [];
 function getPlanet_With_Largest_Vehicle_Pilot(data){
    // how many planets in s universe
    console.log("Number of planets in starwars universe : " + data.length);
   //get list of planet to array
   for(let i=0;i<data.length;i++){
       //generaate new object for each planet
       var planet = new Object();
       planet.name = data[i].name;
       planet.numberOfResident = 0;
       planet.planetAddress = data[i].url;
       planet.residents = [];
       ArrayOfResidentsInPlanets.push(planet)
   }//console.log(ArrayOfResidentsInPlanets)

 }

var peopleWithVehicleNotEqualToZero =[];
//get the list people with vehicle array > 0
function getValidPeople(data){
    for(let i=0;i<data.length;i++){
         //check vehicle array size
        if(data[i].vehicles.length > 0){
            //get the name of the planet the object is from
            getPlanetAddress(data[i].homeworld,data[i].name);
        }
    }
}


//function returns the name of the planet from the adddress parsed
function getPlanetAddress(planetaddress,residentName){
   
    //get the name of the planet from the parsed address
    //check the content of the new array created
    for(let i=0;i<ArrayOfResidentsInPlanets.length;i++){
        //compare the parsed address with address of the planet already stored
        if(ArrayOfResidentsInPlanets[i].planetAddress === planetaddress){
            //update the no of residents in for that planet
            ArrayOfResidentsInPlanets[i].numberOfResident =  ArrayOfResidentsInPlanets[i].numberOfResident + 1; 
            //update resident name
            ArrayOfResidentsInPlanets[i].residents.push(residentName);
           
        }
        console.log("planet reserser "  +residentName)
    }

  //new result
    for(let i=0;i<ArrayOfResidentsInPlanets.length;i++){
           if(ArrayOfResidentsInPlanets[i].numberOfResident > 0){
            console.log(`${ArrayOfResidentsInPlanets[i].name} ${ArrayOfResidentsInPlanets[i].residents}`)
            //append result to html
            q4_ans.innerHTML = (`Planet:${ArrayOfResidentsInPlanets[i].name} 
            Pilots:(${ArrayOfResidentsInPlanets[i].numberOfResident})
                ${ArrayOfResidentsInPlanets[i].residents}`);
            q4_ans.setAttribute("class","starwars_ans_center")
            q4.appendChild(q4_ans);
           }
    }


       
 
}


//trigger to answers
button.addEventListener('click', requestData);
