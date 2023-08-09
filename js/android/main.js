const vars = {
	windowEl: window,
	documentEl: document,
	htmlEl: document.documentElement,
	bodyEl: document.body,
}

const enableScroll = () => {
	const fixBlocks = document?.querySelectorAll('.fixed-block')
	const body = document.body
	const pagePosition = parseInt(vars.bodyEl.dataset.position, 10)
	fixBlocks.forEach(el => {
		el.style.paddingRight = '0px'
	})
	vars.bodyEl.style.paddingRight = '0px'

	vars.bodyEl.style.top = 'auto'
	vars.bodyEl.classList.remove('dis-scroll')
	window.scroll({
		top: pagePosition,
		left: 0,
	})
	vars.bodyEl.removeAttribute('data-position')
	vars.htmlEl.style.scrollBehavior = 'smooth'
}

const disableScroll = () => {
	const fixBlocks = document?.querySelectorAll('.fixed-block')
	const pagePosition = window.scrollY
	const paddingOffset = `${window.innerWidth - vars.bodyEl.offsetWidth}px`

	vars.htmlEl.style.scrollBehavior = 'none'
	fixBlocks.forEach(el => {
		el.style.paddingRight = paddingOffset
	})
	vars.bodyEl.style.paddingRight = paddingOffset
	vars.bodyEl.classList.add('dis-scroll')
	vars.bodyEl.dataset.position = pagePosition
	vars.bodyEl.style.top = `-${pagePosition}px`
}

const burger = () => {
	const burger = document?.querySelector('[data-burger]')
	const menu = document?.querySelector('[data-menu]')
	const menuItems = document?.querySelectorAll('[data-menu-item]')
	const overlay = document?.querySelector('[data-menu-overlay]')

	burger?.addEventListener('click', e => {
		burger?.classList.toggle('burger--active')
		menu?.classList.toggle('menu--active')

		if (menu?.classList.contains('menu--active')) {
			burger?.setAttribute('aria-expanded', 'true')
			burger?.setAttribute('aria-label', 'Закрыть меню')
			disableScroll()
		} else {
			burger?.setAttribute('aria-expanded', 'false')
			burger?.setAttribute('aria-label', 'Открыть меню')
			enableScroll()
		}
	})

	overlay?.addEventListener('click', () => {
		burger?.setAttribute('aria-expanded', 'false')
		burger?.setAttribute('aria-label', 'Открыть меню')
		burger.classList.remove('burger--active')
		menu.classList.remove('menu--active')
		enableScroll()
	})

	menuItems?.forEach(el => {
		el.addEventListener('click', () => {
			burger?.setAttribute('aria-expanded', 'false')
			burger?.setAttribute('aria-label', 'Открыть меню')
			burger.classList.remove('burger--active')
			menu.classList.remove('menu--active')
			enableScroll()
		})
	})
}

const scrollAnchors = () => {
	const anchors = document.querySelectorAll('a[href*="#"]')
	const menu = document.querySelector('[data-menu]')
	const burger = document.querySelector('[data-burger]')

	anchors.forEach(anchor => {
		anchor.addEventListener('click', e => {
			e.preventDefault()
			const blockId = anchor?.getAttribute('href')
			if (menu.classList.contains('menu--active')) {
				menu.classList.remove('menu--active')
				burger.classList.remove('burger--active')
				enableScroll()
			}
			document.querySelector('' + blockId).scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		})
	})
}

new Swiper('.products__list', {
	slidesPerView: 1,
	watchOverflow: true,
	spaceBetween: 100,
	centeredSlides: true,
	effect: 'slide',
	observer: true,
	observeParents: true,
	observeSlideChildren: true,
	slidesPerView: 'auto',
	navigation: {
		nextEl: '.products__arrow-right',
		prevEl: '.products__arrow-left',
	},
})

burger()
scrollAnchors()
