var pokedex = document.getElementById('pokedex'); //untuk mengambil sebuah value pada inputan yang ada di HTML

var fetchPokemon = async () => {
    var url = `https://pokeapi.co/api/v2/pokemon?limit=151`;
    var res = await fetch(url);
    var data = await res.json();
    var pokemon = data.results.map((result, index) =>
        ({
            name: result.name,
            id: index + 1,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
        }));
    displayPokemon(pokemon);
};

var displayPokemon = (pokemon) => {
    var pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card" onClick="selectPokemon(${pokeman.id})">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;  //nampilin output ke elemen HTML, dengan variabel pokemon yang menyimpan kartu
};

var selectPokemon = async (id) => {
    var url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    var res = await fetch(url);
    var pokeman = await res.json();
    displayPopup(pokeman);
};

var displayPopup = (pokeman) => {
    var type = pokeman.types.map((type) =>
        type.type.name).join(', ');
    var image = pokeman.sprites['front_default'];
    const htmlString = `
    <div class="popup">
    <button id = "closeBtn" onclick = "closePopup()">Close</button>
        <div class="card">
        <img class="card-image" src="${image}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        <p><small>Height: </small>${pokeman.height} | <small>Weight: </small>${pokeman.weight} |
        <small>Type: </small>${type}  
        </div>
    </div>
    `;
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
    console.log(htmlString);
};

var closePopup = () => {
    var popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
};

fetchPokemon();
