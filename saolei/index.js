var startBtn = document.getElementById('btn');
var box = document.getElementById('box');
var flagBox = document.getElementById('flagBox');
var alertBox = document.getElementById('alertBox');
var alertImg = document.getElementById('alertImg');
var closeBtn = document.getElementById('close');
var score = document.getElementById('score');
var wrapper = document.getElementById('wrapper');
var minesNum;
var mineOver;
var block;
var mineMap = [];
var startGameBool = true;

bindEvent();
function bindEvent(){
	startBtn.onclick = function(){
		if(startGameBool){
			box.style.display = 'block';
			flagBox.style.display = 'block';
			init();
			startGameBool = false;
		}
	}
	//取消右键默认事件
	wrapper.oncontextmenu = function(){
		return false;
	}
	box.onmousedown = function(e){
		var event = e.target;
		if(e.which == 1){
			leftClick(event);
		}else if(e.which == 3){
			rightClick(event);
		}
	}
	closeBtn.onclick = function(){
		alertBox.style.display = 'none';
		flagBox.style.display = 'none';
		box.style.display = 'none';
		box.innerHTML = '';
		startGameBool = true;
	}
}
function leftClick(dom){
	if(dom.classList.contains('flag')){
		return;
	}
	var isLei = document.getElementsByClassName('isLei');
	if(dom && dom.classList.contains('isLei')){
		console.log('gameover');
		for(var i =0; i<isLei.length ; i++){
			isLei[i].classList.add('show');
		}
		setTimeout(function(){
			alertBox.style.display = 'block';
			alertImg.style.backgroundImage = 'url("images/faild2.png")';

		},800)
		
	}else{
		var n = 0;
		var posArr = dom && dom.getAttribute('id').split('-');
		var posX = posArr && +posArr[0];
		var posY = posArr && +posArr[1];
		dom && dom.classList.add('num');
		//找周围雷的个数
		for(var i=posX-1;i<=posX+1;i++){
			for(var j=posY-1; j<=posY+1;j++){
				var aroundBox = document.getElementById(i+'-'+j);
				if(aroundBox && aroundBox.classList.contains('isLei')){
					n++;
				}
			}
		}
		dom && (dom.innerHTML = n)
		if(n == 0){
			for(var i=posX-1;i<=posX+1;i++){
			for(var j=posY-1; j<=posY+1;j++){
				var nearBox = document.getElementById(i+'-'+j)
					if(nearBox && nearBox.length!=0){
						if(!nearBox.classList.contains('check')){
							nearBox.classList.add('check');
							leftClick(nearBox);
						}
						
					}
				}
			}
		
		}
	}
}
function rightClick(dom){
	if(dom.classList.contains('num')){
		return;
	}
	dom.classList.toggle('flag');
	if(dom.classList.contains('isLei') && dom.classList.contains('flag')){
		mineOver --;
	}
	if(dom.classList.contains('isLei') && !dom.classList.contains('flag')){
		mineOver ++;
	}
	score.innerHTML = mineOver;
	if(mineOver == 0){
		alertBox.style.display = 'block';
		alertImg.style.backgroundImage = 'url("images/do.png")';
	}


}
//100个小格
function init(){
	minesNum = 10;
	mineOver = 10;
	score.innerHTML = mineOver;
	for(var i =0;i<10 ;i++){
		for( var j=0 ;j<10; j++){
			var con = document.createElement('div');
			con.classList.add('block');
			con.setAttribute('id',i+'-'+j);
			box.appendChild(con);
			mineMap.push({mine:0});
		}
	}
	block = document.getElementsByClassName('block');
	while(minesNum){
		var mineIndex = Math.floor(Math.random()*100);
		if (mineMap[mineIndex].mine === 0) {
			mineMap[mineIndex].mine = 1;
			block[mineIndex].classList.add('isLei');
			minesNum --;
		}
		

	}
	
}