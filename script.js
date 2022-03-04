function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pegaPosicaoAutomatica);
  } else { 
   pegaPosicaoManual()
  }
}

function pegaPosicaoManual(){
  let latitude = document.querySelector(".pega-latitude")
  let longitude = document.querySelector(".pega-longitude")

  let requisicao = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ea18f1bc5e69817a023e1727ebe2cb52`)
  requisicao.then(colocaDadosNaTela)
  
  requisicao.catch(erro => {
    console.error(erro.data)
  })
}

function pegaPosicaoAutomatica(position) {
  let latitude = position.coords.latitude 
  let longitude = position.coords.longitude;

  let requisicao = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ea18f1bc5e69817a023e1727ebe2cb52`)
  requisicao.then(colocaDadosNaTela)
  
  requisicao.catch(erro => {
    console.error(erro.data)
  })
}

function colocaDadosNaTela(resposta){
  let informacoes = resposta.data;

  let temperatura = Math.round(informacoes.main.temp - 273.15)
  let localidade = informacoes.name

  let tempo = document.querySelector(".tempo")
  let inputs = document.querySelector(".inputs")

  if(temperatura < 30){
    tempo.innerHTML = `
      <h1>Sua temperatura na localidade ${localidade} é ${temperatura}ºC.<br>
      Colocando como referencial um carioca, você está passando frio.</h1>

      <img src="imagens/frio.jpg" alt="imagem ilustrativa">
    `
    tempo.classList.remove("escondido")
    inputs.classList.add(".escondido")
  }else if(temperatura >= 30 && temperatura <= 35){
    tempo.innerHTML = `
    <h1>Sua temperatura na localidade ${localidade} é ${temperatura}ºC.<br>
    Colocando como referencial um carioca, você está num 'climinha ameno'
    </h1>
    <img src="imagens/ameno.jpg" alt="imagem ilustrativa">
  `
  tempo.classList.remove("escondido")
  inputs.classList.add(".escondido")


  }else if(temperatura > 35){
    tempo.innerHTML = `
    <h1>Sua temperatura na localidade ${localidade} é ${temperatura}ºC.<br>
    Colocando como referencial um carioca, você está abraçando o demônio.
    </h1>
    <img src="imagens/quente.jpg" alt="imagem ilustrativa">
  `
  tempo.classList.remove("escondido")
  inputs.classList.add("escondido")
  }

}




