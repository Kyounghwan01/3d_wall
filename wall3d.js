(function() {
  //1. house를 이동
  const houseElem = document.querySelector(".house");
  const stageElem = document.querySelector(".stage");
  const barElem = document.querySelector(".progress-bar");
  const selectCharacterElem = document.querySelector(".select-character");
  const mousePos = { x: 0, y: 0 };
  //2.1 스크롤 할 수 있는 범위 (body높이(500vw) - 스크롤바(창높이))
  let maxScrollValue;

  function resizeHandler() {
    //3. 전체 스크롤 가능 범위
    maxScrollValue = document.body.offsetHeight - window.innerHeight;
  }

  //2. scroll 이벤트 사용
  window.addEventListener("scroll", function() {
    //2.2 내가 스크롤 한 비율 = pageYOffset/maxScrollValue;
    const scrollPer = pageYOffset / maxScrollValue;
    const zMove = scrollPer * 980 - 490; //490빼는 이유 : 원래 house속성에 z로 -490이 있었음
    //4. 스크롤에따라 transform : translateZ 값 바꿈
    houseElem.style.transform = "translateZ(" + zMove + "vw)";
    //6. progress-bar-width :%코딩
    barElem.style.width = scrollPer * 100 + "%";
  });

  //7. 마우스 위치 따라 시점 이동
  window.addEventListener("mousemove", function(e) {
    mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
    mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
    stageElem.style.transform =
      "rotateX(" + mousePos.y * 5 + "deg) rotateY(" + mousePos.x * 5 + "deg)";
  });

  //5. 창 사이즈에 따라 maxscrollvalue 리뉴얼
  window.addEventListener("resize", resizeHandler);
  

  stageElem.addEventListener("click", function(e) {
    //8.1 클릭시 마우스의 x위치에 만들기 -> e.clientX / window.innerWidth * 100
    //8.2 만든것 생성자의 객체 매개변수로 넣어주기 
    
    //8. stageElem에 클릭하면 만든 캐릭터 어펜드차일드
    new Character({
        xPos: e.clientX / window.innerWidth * 100,
        speed: Math.random() *0.8
    });
  });

  selectCharacterElem.addEventListener('click',function(e){
    
    const value = e.target.getAttribute('data-char');
    console.log(value);
    document.body.setAttribute('data-char',value);
    // if(value == 'ragirl'){
    //   document.body.style.backgroundColor = '#333';
    // }else{
    //   document.body.style.backgroundColor = '#fff000';
    // }
  });

  resizeHandler();
})();
