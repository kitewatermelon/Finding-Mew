const pokemon = require('pokemon');

pokemon.all();
//=> ['Bulbasaur', …]

console.log(pokemon.random('ko'));
//=> 'Snorlax'

pokemon.getName(147);
//=> 'Dratini'

pokemon.getId('Dratini');
//=> 147

