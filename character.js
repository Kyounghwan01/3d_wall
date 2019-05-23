function Character(info) {
  this.mainElem = document.createElement("div");
  this.mainElem.classList.add("character");
  this.mainElem.innerHTML = `
    <div class="character-face-con character-head">
      <div class="character-face character-head-face face-front"></div>
      <div class="character-face character-head-face face-back"></div>
    </div>
    <div class="character-face-con character-torso">
      <div class="character-face character-torso-face face-front"></div>
      <div class="character-face character-torso-face face-back"></div>
    </div>
    <div class="character-face-con character-arm-right">
      <div class="character-face character-arm-face face-front"></div>
      <div class="character-face character-arm-face face-back"></div>
    </div>
    <div class="character-face-con character-arm-left">
      <div class="character-face character-arm-face face-front"></div>
      <div class="character-face character-arm-face face-back"></div>
    </div>
    <div class="character-face-con character-leg-right">
      <div class="character-face character-leg-face face-front"></div>
      <div class="character-face character-leg-face face-back"></div>
    </div>
    <div class="character-face-con character-leg-left">
      <div class="character-face character-leg-face face-front"></div>
      <div class="character-face character-leg-face face-back"></div>
    </div>
    `;

  document.querySelector(".stage").appendChild(this.mainElem);
  //info : 생성자가 호출하면 매개변수로 가져오는 정보 값({xPos : x좌표})
  this.mainElem.style.left = info.xPos + "%";
  //스크롤 중인지 아닌지를 체크하는 변수
  this.scrollState = false;
  //바로 이전(마지막) 스크롤 위치
  this.lastScrollTop = 0;
  this.xPos = info.xPos;
  this.speed = info.speed;
  this.direction;
  //좌우 이동 중인지 아닌지를 판별하는 속성 : 이동중 : true
  this.runningState = false;
  this.refId;
  this.init();
}

// 생성자 안에 함수 추가
Character.prototype = {
  constructor: Character,
  init: function() {
    //진짜 중요!
    const self = this;
    // console.log(this);
    //핸들러의 this가 윈도우를 가리키기 때문에
    //핸들러 밖의 this가 가리키는 character 값을 temp 값으로 저장하고 핸들러 안에서 불러온다.
    //9.스크롤시 이동하다 스크롤 멈추면 캐릭터 멈춘다
    window.addEventListener("scroll", function() {
      clearTimeout(self.scrollState);

      if (!self.scrollState) {
        self.mainElem.classList.add("running");
      }
      self.scrollState = setTimeout(function() {
        self.scrollState = false;
        self.mainElem.classList.remove("running");
      }, 500);

      //10. 스크롤 위치따라 캐릭터 앞뒤 구분
      if (self.lastScrollTop > pageYOffset) {
        self.mainElem.setAttribute("data-direction", "backward");
      } else {
        self.mainElem.setAttribute("data-direction", "forward");
      }

      self.lastScrollTop = pageYOffset;
    });

    //11. 캐릭터 좌우 이동
    window.addEventListener("keydown", function(e) {
      if (self.runningState) return;

      if (e.keyCode === 37) {
        //왼쪽
        self.direction = "left";
        self.mainElem.setAttribute("data-direction", "left");
        //누르는 동안 걸어가기
        self.mainElem.classList.add("running");
        // self.xPos = self.xPos - self.speed;
        // self.mainElem.style.left = self.xPos + '%';
        self.run(self);
        self.runningState = true;
      } else if (e.keyCode === 39) {
        self.direction = "right";
        // self.xPos = self.xPos + self.speed;
        // self.mainElem.style.left = self.xPos + '%';
        self.mainElem.setAttribute("data-direction", "right");
        self.mainElem.classList.add("running");
        self.run(self);
        self.runningState = true;
      }
    });

    window.addEventListener("keyup", function(e) {
      //running 취소
      self.mainElem.classList.remove("running");
      //refId에 값이 찍히면 앞으로 가는거 취소
      cancelAnimationFrame(self.refId);
      //다시 가는 준비를 위해 false로
      self.runningState = false;
    });
  },
  run: function(self) {
    
    if (self.direction === "left") {
      self.xPos -= self.speed;
    } else if (self.direction === "right") {
      self.xPos += self.speed;
    }
    if(self.xPos < 2){
        self.xPos = 2;
    }else if(self.xPos > 88){
        self.xPos = 88;
    }
    //self가 character가리키다가 window를 가리킨다. : requestAnimationFrame이거 때문인데 컨텍스트 때문에 this가 가리키는 애가 바뀜
    self.mainElem.style.left = self.xPos + "%";

    self.refId = requestAnimationFrame(function() {
      self.run(self);
    });
  }
};
