document.addEventListener('DOMContentLoaded', function() {
    var grayTop = document.querySelector('.graytop');
    var grayBot = document.querySelector('.graybot');
    var textBox = document.querySelector('.textBox');

    grayTop.addEventListener('click', function() {
        this.style.transform = 'rotate(60deg)';
        setTimeout(function() {
            window.location.href = '/sticker';
        }, 1000); // 3초 후에 sticker.html로 이동
    });

    grayBot.addEventListener('click', function() {
        grayTop.style.transform = 'rotate(60deg)';
        setTimeout(function() {
            window.location.href = '/sticker';
        }, 1000); // 3초 후에 sticker.html로 이동
    });
});

var arrow = document.querySelector('.arrow');

setInterval(function() {
    arrow.innerText = '▽';
}, 500); // 0.5초마다 내용을 ▽로 변경
setInterval(function() {
    arrow.innerText = '▼';
}, 1000); // 0.5초마다 내용을 ▽로 변경

//random한 포켓몬 아이디 생성
const getRandomNumber = () => {
    const min = 1;
    const max = 151;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const pokemonId = getRandomNumber();

// 가져온 데이터를 HTML에 삽입하기
const pokeId = document.getElementById('poke_no');
const pokeName = document.getElementById('poke_name');
const pokeImg = document.getElementById('poke_img');
const txtName = document.getElementById('txt_name');
let storedArray = JSON.parse(localStorage.getItem('pokedex')) || [];
let cardsContainer = document.getElementById('cards');
let detailContainer = document.getElementById('detail');

function pushPokemon(key , obj) {
    let tempArr = JSON.parse(localStorage.getItem(key)) || [];
    let objExists = tempArr.some(item => JSON.stringify(item) === JSON.stringify(obj)); //중복 검사 후 중복시 무시
    if (!objExists){
        tempArr.push(obj);
        localStorage.setItem(key , JSON.stringify(tempArr));
    }
  }


// pokeAPI에서 데이터 가져오기
const getPokemonData = async () => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`);
        const data = response.data;
        console.log(data);
        pokeId.innerHTML = `<p>no.${data.id}</p>`;
        pokeName.innerHTML = `<p>${data.names.find(name => name.language.name === 'ko').name}</p>`;
        txtName.innerHTML = `<p>축하합니다. ${data.names.find(name => name.language.name === 'ko').name}을(를) 획득했습니다!</p>`;

        // 이미지 요소 생성 및 설정
        const img = document.createElement('img');
        if (pokemonId >= 100)
            img.src = `https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/0${pokemonId}01.png`;
        else if (pokemonId >= 10)
            img.src = `https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/00${pokemonId}01.png`;
        else
            img.src = `https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000${pokemonId}01.png`;

        let tempPackage = { id    : data.id ,
                              name  : data.names.find(name => name.language.name === 'ko').name ,
                              color : data.color.name ,
                              image : img.src
                            }; // pokedex로 옮기기 위한 데이터 정형화

        pushPokemon("pokedex" , tempPackage ) //스티커 로컬 저장소에 바로 저장
        console.log(localStorage.pokedex);

        img.alt = 'Pokemon Image does not loaded';
        img.style.width = "300px";
        img.style.height = "300px";

        // 이미지를 pokeImg에 추가
        pokeImg.appendChild(img);

        if(data.color.name == "black"){
            pokeId.style.color = "white";
        }

        document.body.style.backgroundColor = data.color.name;
        pokeId.style.backgroundColor = data.color.name;

    } catch (error) {
        console.error(error);
    }
};

getPokemonData();




function displayCards(order) {
    // Clear the existing cards
    cardsContainer.innerHTML = '';

    // Sort the storedArray based on the chosen order
    let sortedArray;
    if (order === 'input') {
        sortedArray = storedArray.slice(); // Copy the array to maintain the original order
    } else if (order === 'ascending') {
        sortedArray = storedArray.slice().sort((a, b) => a.id - b.id);
    }

    // Display the sortedArray cards
    sortedArray.forEach(obj => {
        let card = document.createElement('div');
        card.className = 'card';
        if (obj.color) {
            card.style.backgroundColor = obj.color;
        }
        let container = document.createElement('div');
        container.className = 'container';
        Object.keys(obj).forEach(key => {
            if (key === 'image') {
                let img = document.createElement('img');
                img.src = obj[key];
                img.style.width = '100%';
                container.appendChild(img);
            }
        });
        card.appendChild(container);
        card.addEventListener('click', () => {
            detailContainer.innerHTML = '';

            let stickerContainer = document.createElement('div');
            stickerContainer.className = 'sticker';

            let pokeNoContainer = document.createElement('div');
            pokeNoContainer.className = 'poke_no';
            pokeNoContainer.innerHTML = `<p>no.${obj.id}</p>`;
            pokeNoContainer.style.backgroundColor = obj.color;
            stickerContainer.appendChild(pokeNoContainer);

            let pokeNameContainer = document.createElement('div');
            pokeNameContainer.className = 'poke_name';
            pokeNameContainer.innerHTML = `<p>${obj.name}</p>`;
            stickerContainer.appendChild(pokeNameContainer);

            let pokeImgContainer = document.createElement('div');
            pokeImgContainer.className = 'poke_img';
            let img = document.createElement('img');
            img.src = obj.image;
            img.style.width = '100%';
            pokeImgContainer.appendChild(img);
            stickerContainer.appendChild(pokeImgContainer);

            let pokeLabelContainer = document.createElement('div');
            pokeLabelContainer.className = 'poke_label';
            pokeLabelContainer.innerHTML = '<p>@Pokémon</p>';
            stickerContainer.appendChild(pokeLabelContainer);

            detailContainer.appendChild(stickerContainer);

            detailContainer.style.display = 'block';
            cardsContainer.classList.add('detail-visible');
        });
        cardsContainer.appendChild(card);
    });
}

// Initial display (by input order)
displayCards('input');