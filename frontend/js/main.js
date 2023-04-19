
// need to build another event listener for the dropdown menu

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

async function getStatAPI(terms){
    let res = await fetch (`http://127.0.0.1:5000/api/db/${terms}`)    
    let rd = res.json()
    console.log(rd)

    return rd
}


let form = document.getElementById('liform') //ID in the form tag

form.addEventListener('submit',handler) //upon form submission, run handler function

async function handler(event){    

    event.preventDefault()    

    let terms = event.target.searchTerms.value //the user input    

    let info = await getAPI(terms)
    
    createTable(info,terms,'scrapeDisplay')
    event.preventDefault() 

    event.target.searchTerms.value = '';
    event.preventDefault() 
    
}

async function getAPI(terms){
    let res = await fetch (`http://127.0.0.1:5000/api/li/${terms}`)
    
    let rd = res.json()
    
    return rd
}



function createTable(res,keywords,container){
    var tableContainer = document.getElementById(container)



    card = document.createElement('div')
    card.className = 'tableCard pt-4'

    let title = document.createElement('h3')
    title.innerHTML = `Search Term: ${keywords}`
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

