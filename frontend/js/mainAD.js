
//even listener for each dropdown item
let dropdowns = document.getElementsByClassName('dropdown-item')

Array.from(dropdowns).forEach((dropdown) => { 
    dropdown.addEventListener('click', staticHandler)    
}); 


async function staticHandler(event){
    event.preventDefault()

    let terms = event.target.innerText 
    let info = await getStatAPI(terms)
    createTable(info,terms,'static-scrape-display')
    
}

//api call to the database query endpoint
async function getStatAPI(terms){
    let res = await fetch (`http://127.0.0.1:5000/api/db/${terms}`)    
    let rd = res.json()
    console.log(rd)

    return rd
}


//event listener for the linkedin scrape form
let form = document.getElementById('liform') 

form.addEventListener('submit',handler) 

async function handler(event){    

    event.preventDefault()    

    let terms = event.target.searchTerms.value  

    let info = await getAPI(terms)
    
    createTableWithPieChart(info,terms,'scrapeDisplay')
    
    event.target.searchTerms.value = '';
        
}

//api call to the linkedinscrape function
async function getAPI(terms){
    let res = await fetch (`http://127.0.0.1:5000/api/li/${terms}`)
    
    let rd = res.json()
    
    return rd
}


//create table function
function createTable(res,keywords,container){
    var tableContainer = document.getElementById(container)

    card = document.createElement('div')
    card.className = 'tableCard pt-4'

    let title = document.createElement('h3')
    title.innerHTML = `${keywords}`
    title.className = 'text-center'

    var table = document.createElement('table')
    table.className = 'w-100'
    var tbody = document.createElement('tbody')       
    
    var tableheader =      
                       `
                        <tr>
                            <th>Skill</th>
                            <th>Count</th>
                        </tr>`
    
    table.innerHTML += tableheader  

    var rowlist = []
    //pull apart the json response of each table row into an array within an array
    //sort the array in descending order based on the count
    //add the row to the table if the count (item[1]) value is > 1 

    for (const [key, value] of Object.entries(res)){
        rowlist.push([key,value])
    }
    rowlist.sort(function(a,b){return b[1]-(a[1])})

    for (const item of rowlist){
        if(item[1] > 1){
        var row = `<tr>
                    <td>${item[0]}</td>
                    <td>${item[1]}</td>       
                    </tr>`
            table.innerHTML += row
       }
    }
    card.append(title)
    table.append(tbody)
    card.append(table)
    tableContainer.prepend(card)
}

function createTableWithPieChart(res, keywords, container) {
    var tableContainer = document.getElementById(container);

    card = document.createElement('div');
    card.className = 'tableCard pt-4';

    let title = document.createElement('h3');
    title.innerHTML = `${keywords}`;
    title.className = 'text-center';

    var chartContainer = document.createElement('div');
    chartContainer.className = 'chart-container';

    var table = document.createElement('table');
    table.className = 'w-50'; // Adjust the width as needed
    var tbody = document.createElement('tbody');

    var tableheader =
        `
        <tr>
            <th>Skill</th>
            <th>Count</th>
        </tr>`

    table.innerHTML += tableheader;

    var rowlist = [];

    // pull apart the json response of each table row into an array within an array
    // sort the array in descending order based on the count
    // add the row to the table if the count (item[1]) value is > 1

    for (const [key, value] of Object.entries(res)) {
        rowlist.push([key, value]);
    }

    rowlist.sort(function (a, b) {
        return b[1] - a[1];
    });

    for (const item of rowlist) {
        if (item[1] > 1) {
            var row = `<tr>
                <td>${item[0]}</td>
                <td>${item[1]}</td>
            </tr>`;
            table.innerHTML += row;
        }
    }

    card.append(title);
    table.append(tbody);
    card.append(table);

    // Create a canvas for the pie chart
    var chartCanvas = document.createElement('canvas');
    chartCanvas.id = 'pieChart';
    chartContainer.appendChild(chartCanvas);
    card.appendChild(chartContainer);

    // Generate data for the pie chart (use the first 5 items from the table)
    var chartData = {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: []
        }]
    };

    for (let i = 1; i <= 5 && i < rowlist.length; i++) {
        chartData.labels.push(rowlist[i][0]);
        chartData.datasets[0].data.push(rowlist[i][1]);
        // You can define colors for the pie slices or use a random color generator
        chartData.datasets[0].backgroundColor.push(getRandomColor());
    }

    // Create the pie chart
    var pieChart = new Chart(chartCanvas, {
        type: 'pie',
        data: chartData
    });

    tableContainer.prepend(card);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}