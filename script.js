var pokedex = document.getElementById('pokedex'); //untuk mengambil sebuah value pada inputan yang ada di HTML

var fetchPokemon = () => {
    var promises = [];
    for (let i = 1; i <= 151; i++) {
        var url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((result) => {
        var pokemon = result.map((data) => ({
            name: data.name,
            image: data.sprites['front_default'], //pake front default karena tampilan default pokemon, karena ada yang front shiny yang berarti nampilin shiny pokemon
            type: data.types.map((type) => type.type.name).join(', '),  //fungsi map untuk melintasi array dari kiri ke kanan dan fungsi join untuk mengubah menjadi string karena type pokemon sebelumnya dalam bentuk array
            id: data.id
        }));
        displayPokemon(pokemon);
    });
};

var displayPokemon = (pokemon) => {
    console.log(pokemon);
    var pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;  //nampilin output ke elemen HTML, dengan variabel pokemon yang menyimpan kartu
};

fetchPokemon();
