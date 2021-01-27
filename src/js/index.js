
let API = 'https://pokeapi.co/api/v2/pokemon/';

const $input = document.querySelector('.input')
const $pokemon__number = document.querySelector('.pokemon__number')
const $generatorButton = document.querySelector('.generatorButton')
const $pokemon__image = document.querySelector('.pokemon__image')
const $pokemon__name = document.querySelector('.pokemon__name')
const $pokemon__type = document.querySelector('.pokemon__type')
// const FetchPokemonAbilities = (name) =>{
//     fetch(`${API}${name}`)
//         .then(response => response.json())
//         .then(data=>{
//             let abilities = data.abilities;
//             for (let i = 0; i < abilities.length; i++) {
//                 const element = abilities[i];
//                 console.log(element.ability.name)
//             }
//         })
// // }
// console.log('antes')
// FetchPokemonAbilities('bulbasaur');
// console.log('después');

// $generatorButton.addEventListener('click', ()=>{
//     placeImages(API);
// })

$generatorButton.addEventListener(('click'), async()=>{
    try {
        let pokemonName= $input.value;
        let pokemon = await fetchPokemon(`${API}${pokemonName}`);
        renderImage(pokemon);
        renderName(pokemon);
        renderId(pokemon);
        renderType(pokemon);
        
    } catch (error) {
        $pokemon__image.setAttribute('src','src/img/ash.jpg');
        $pokemon__name.innerHTML= 'Pokemon no encontrado';
        $pokemon__number.innerHTML = "?";
        while ($pokemon__type.firstElementChild) {//si tiene hijos eliminalos hasta que no quede ninguno
            $pokemon__type.removeChild($pokemon__type.firstElementChild);
        }
        let type= document.createElement('h5');
        type.classList.add('notFounded');
        debugger
        type.innerHTML ="Tipo no encontrado";
        $pokemon__type.appendChild(type);
        
    }
})

const renderImage = (pokemon)=>{
    let imageUrl = pokemon.sprites.front_default;
    $pokemon__image.setAttribute('src',imageUrl);
}

const renderName = (pokemon)=>{
    let name = pokemon.name;
    $pokemon__name.innerHTML= name;
}
const renderId = (pokemon)=>{
    let id = pokemon.id;
    $pokemon__number.innerHTML= `#${id}`;
}

const renderType = (pokemon)=>{
    while ($pokemon__type.firstElementChild) {//si tiene hijos eliminalos hasta que no quede ninguno
        $pokemon__type.removeChild($pokemon__type.firstElementChild);
    }
    for (let i = 0; i < pokemon.types.length; i++) {
        let type= document.createElement('h5');
        let typeName = pokemon.types[i].type.name;
        type.classList.add(typeName);
        type.innerHTML = typeName;
        $pokemon__type.append(type);
    }
}

/*const fetchPokemon = async (pokemonUrl) => {
    await fetch(pokemonUrl)
    .then(async (response)=> {
        return await response.json()
    } )
    .then(pokemon =>{
        let imageUrl = pokemon.sprites.front_default;
        let image = document.createElement("img");
        image.setAttribute('src',imageUrl);
        body.appendChild(image);
    })
};*/

const fetchPokemon = async (pokemonUrl) => {
    try{

        let pokemonPromise= await fetch(pokemonUrl);
        let pokemon = await pokemonPromise.json();
        return pokemon;
    }catch(error){
        console.error(error)
    }
};

// const placeImages = (PokeAPI)=>{
//     fetch(`${PokeAPI}`)
//         .then(response => response.json())
//         .then(async (pokemons)=>{
//             API=pokemons.next;
//             for (let i = 0; i < pokemons.results.length; i++) {
//                 let pokemon = await fetchPokemon(pokemons.results[i].url);
//                 renderImage(pokemon);
//             }
//         })
// }

// placeImages(API);



