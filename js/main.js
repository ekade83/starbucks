'use strict'

/**
 * 페이지 스크롤에 따른 요소 제어
 */
// 페이지 스크롤에 영향을 받는 요소들을 검색!
const badgeEl = document.querySelector('header .badges')
const toTopEl = document.querySelector('#to-top')
// 페이지에 스크롤 이벤트를 추가!
// 스크롤이 지나치게 자주 발생하는 것을 조절(throttle, 일부러 부하를 줌)
window.addEventListener('scroll', _.throttle(function () {
  // 페이지 스크롤 위치가 500px이 넘으면.
  if (window.scrollY > 500) {
    // Badge 요소 숨기기!
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    })
    // 상단으로 스크롤 버튼 보이기!
    gsap.to(toTopEl, .2, {
      x: 0
    })

  // 페이지 스크롤 위치가 500px이 넘지 않으면.
  } else {
    // Badge 요소 보이기!
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    })
    // 상단으로 스크롤 버튼 숨기기!
    gsap.to(toTopEl, .2, {
      x: 100
    })
  }
}, 300))
// 상단으로 스크롤 버튼을 클릭하면,
toTopEl.addEventListener('click', function () {
  // 페이지 위치를 최상단으로 부드럽게(0.7초 동안) 이동.
  gsap.to(window, .7, {
    scrollTo: 0
  })
})



const fadeEls = document.querySelectorAll('.visual .fade-in')
fadeEls.forEach( function(fadeEl, index) {
		// 요소, 지속시간, 옵션
		gsap.to(fadeEl, 1,{
				delay: (index + 1)  * .7,
				opacity: 1
		})
});


/**
 * 슬라이드 요소 관리
**/
new Swiper('.notice-line .swiper-container', {
		direction: 'vertical', // 수직 슬라이드
		autoplay: true, // 자동 재생 여부
		loop: true // 반복 재생 여부
})

new Swiper('.promotion .swiper-container', {
	// direction: 'horizontal', // 수평 슬라이드, 기본값으로 히든
  autoplay: { // 자동 재생 여부
    delay: 5000 // 5초마다 슬라이드 바뀜
  },
	loop: true, // 반복 재생 여부
	slidesPerView: 3,
	spaceBetween: 10, // 슬라이드 사이 여백
	centeredSlides: true, // 1번 슬라이드가 가운데 보이기	
  pagination: { // 페이지 번호 사용 여부
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: { // 슬라이드 이전/다음 버튼 사용 여부
    prevEl: '.promotion .swiper-prev', // 이전 버튼 선택자
    nextEl: '.promotion .swiper-next' // 다음 버튼 선택자
  }

})

new Swiper ('.awards .swiper-container', {
  autoplay: true, //
  loop: true,
  spaceBetween: 30,
  slidesPerView:5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next' 
  }
});

// const promotionEl = document.querySelector('.promotion');
// const promotionToggleBtn = document.querySelect ('.toggle-promotion')
// let isHidePromotion = false;

// promotionToggleBtn.addEventListener('click', function() {
// 		isHidePromotion = !isHidePromotion // 반대되는 값을 반환
// 		if (isHidePromotion) {
// 			// 숨김처리
// 			promotionEl.classList.add('hide');
// 		} else {
// 			// 보임처리
// 			promotionEl.classList.remove('hide');
// 		}
// });

/**
 * Promotion 슬라이드 토글 기능
 */
// 슬라이드 영역 요소 검색!
const promotionEl = document.querySelector('.promotion')
// 슬라이드 영역를 토글하는 버튼 검색!
const promotionToggleBtn = document.querySelector('.toggle-promotion')
// 슬라이드 영역 숨김 여부 기본값!
let isHidePromotion = false
// 토글 버튼을 클릭하면,
promotionToggleBtn.addEventListener('click', function () {
  // 슬라이드 영역 숨김 여부를 반댓값으로 할당!
  isHidePromotion = !isHidePromotion
  // 요소를 숨겨야 하면,
  if (isHidePromotion) {
    promotionEl.classList.add('hide')
  // 요소가 보여야 하면,
  } else {
    promotionEl.classList.remove('hide')
  }
})

/**
 * 부유하는 요소 관리
 */
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 '문자 데이터'를,
  // `parseFloat()`을 통해 소수점을 가지는 '숫자 데이터'로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  gsap.to(selector, random(1.5, 2.5), {
    y:size,
    repeat:-1, //무한방법 gsap에서 제공한느 값
    yoyo: true, // 뒤로재생
    ease: Power1.easeInOuteaseInOut,
    delay: random(0, delay)
  })
}

floatingObject('.floating1', 1, 15)
floatingObject('.floating2', .5, 15)
floatingObject('.floating3', 1.5, 20)


/**
 * 페이지 스크롤에 따른 요소 제어
 */

 const spyEls = document.querySelectorAll('section.scroll-spy')

 spyEls.forEach(function(spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 // 화면의 80% 지점에서 보여짐 여부 감시
    })
    .setClassToggle(spyEl, 'show') // 요소가 화면에 보이면 show 클래스 추가
    .addTo(new ScrollMagic.Controller()) // 컨트롤러에 장면을 할당(필수!)
 })

 const thisYear = document.querySelector('.this-year')
 thisYear.textContent = new Date().getFullYear()