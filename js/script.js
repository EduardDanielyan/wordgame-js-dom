function random(a){
	return Math.round(Math.random()*a)
}
function randomColor(){
	return `rgb(${random(255)},${random(255)},${random(255)})`
}

let barer = ['hello','ok','baby','world','good','pizza','coffee','waterpolo','swim','javascript']

const start_block = document.querySelector('.start_block')
const start = document.querySelector('.start')
const game = document.querySelector('.game')
const words = document.querySelector('.words')
const txt = document.querySelector('.txt')

start.onclick=function(){
	start_block.style.display = 'none' ;
	startgame()
	
}

function startgame(){
    let a = new Audio()
    a.src = 'audio/1.mp3'
    a.play()
    setTimeout(()=>{
    	a.pause()
    },300000)
    createword()
    moveword()
    txt.addEventListener('input',chek)
}

let s1
function createword(){
	s1=setInterval(function(){
		let div = document.createElement('div')
		div.innerHTML = barer[random(barer.length-1)]
		div.style = `
		position : absolute;
		top : 0;
		left:${random(words.offsetWidth - 100)}px;
		background: ${randomColor()}
		`
		div.classList.add('item')
		words.append(div)
	},1000)

}


let s2
function moveword(){
	s2=setInterval(function(){
		const divs = document.querySelectorAll('.item')
		divs.forEach(el=>{
			el.style.top = el.offsetTop +1+ 'px'
			if(el.offsetTop >= words.offsetHeight - el.offsetHeight){ 
				clearInterval(s1)
				clearInterval(s2)
				txt.removeEventListener('input',chek)
				words.innerHTML=''

		    	let t = setInterval (function(){

					const over = document.createElement('h2')
					over.innerHTML = 'GAME OVER'
					over.classList.add('d1')
					document.body.append(over)

					const d1 = document.querySelectorAll('.d1')
					for( let el of d1){
						el.style.top = random(400)+'px'
						el.style.left = random(800)+'px'
						el.style.backgroundColor = randomColor()
						el.style.position = 'absolute' 
					}
				},1000)
				setTimeout(function(){
				     start_block.style.display = 'flex'
				     clearInterval(t)
				     document.querySelectorAll('.d1').forEach(el =>el.remove())
				},5000)
			}
		})
	},10)
}


const h1 = document.createElement('h1')
h1.classList.add('color')
let hashiv = 0 
h1.innerHTML = hashiv
words.append(h1)

function chek(){
	const divs = document.querySelectorAll('.item')
	let val = this.value
	for(let el of divs) {
		if(val == el.innerHTML){
			hashiv++
			h1.innerHTML = hashiv
			words.append(h1)
			el.remove()
			this.value = ''
			let m = new Audio()
			m.src = 'audio/2.mp3'
			m.play()
			setTimeout(()=>{
				m.pause()
			},1000)
			return false
		}
	}
	
}




