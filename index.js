const pokemon = require('pokemon');

pokemon.all();
//=> ['Bulbasaur', …]

console.log(pokemon.random('ko'));
//=> 'Snorlax'

console.log(pokemon.getName(100 , 'ko'));
//=> 'Dratini'

console.log(pokemon.getId('Dratini'));
//=> 147

