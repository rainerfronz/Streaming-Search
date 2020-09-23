"user strict";
const apiKey = 'c7797456d4msha381fd5005f894ap1abbb1jsn3351de941775';
const searchSite = "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup";
//function to set paramaters

function formatQuery(params) {
    //create an array of the keys in the "params" object
    const queryItems = Object.keys(params)

        .map(key => `${key}=${params[key]}`)

    return queryItems.join('&');
    console.log(queryItems);
}
//function to fetch info

function getInfo(query) {
    const params = {
        term: query,

    };
    const queryStr = formatQuery(params);
    const url = searchSite + '?' + queryStr;

    console.log(url);

    const options = {
        headers: new Headers({
            "x-rapidapi-key": apiKey
        })
    };
    fetch(url, options)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson));
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('.results-listing').empty();
    $('#error').empty();

    for (let i = 0; i < responseJson.results.length; i++) {
        $('.results-listing').append(
            `<li><h3>
            ${responseJson.results[i].name}</a></h3>
                </li>`);

    }
    $('#results').removeClass('hidden');
    //         )
    //     }

}

function watchForm() {
    $('form').submit(e => {
        e.preventDefault();
        const query = $("#search-term").val();
        const maxResults = $("results").val();
        getInfo(query, maxResults);
        console.log(searchSite);
        // getInfo(searchSite, query, apiKey)

    });
}


//function to display

// function display() {

// }


$(watchForm);