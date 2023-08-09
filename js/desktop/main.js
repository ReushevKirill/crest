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

const generateTextInHoverBlock = () => {
	const hoverBlock = document.querySelector('#hover_block')
	const advantagesList = document.querySelector('#advantages_list')
	const advantagesArray = advantagesList.querySelectorAll('[data-about]')
	let hoverH2 = hoverBlock.querySelector('h2')

	advantagesArray.forEach(item => {
		item.addEventListener('mouseover', e => {
			if (e.target.id === item.id) {
				let targetH2 = e.target.querySelector('h2')
				hoverH2.textContent = targetH2.textContent
			}

			hoverBlock.style.opacity = 1
		})

		item.addEventListener('mouseout', e => {
			hoverBlock.style.opacity = 0
		})
	})
}

const toggleContent = () => {
	const productList = document.querySelector('#product_list')
	productList.addEventListener('click', e => {
		if (e.target.dataset.switch) {
			const btnParent = e.target.parentNode
			const parentProduct = e.target.closest('.product__col')
			const targetContent = e.target.getAttribute('data-target')
			const contents = parentProduct.querySelectorAll('[data-content]')
			const buttons = btnParent.querySelectorAll('.product__btn')
			const button = e.target

			buttons.forEach(btn => btn.classList.remove('product__btn--active'))
			button.classList.add('product__btn--active')

			contents.forEach(content => (content.style.display = 'none'))
			parentProduct.querySelector(
				`[data-content="${targetContent}"]`
			).style.display = 'block'
		}
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

if (window.matchMedia('(max-width: 430px)').matches) {
	new Swiper('.products__list', {
		navigation: {
			nextEl: '.products__arrow-right',
			prevEl: '.products__arrow-left',
		},
		slidesPerView: 1,
		watchOverflow: true,
		spaceBetween: 100,
		centeredSlides: true,
		effect: 'slide',
		observer: true,
		observeParents: true,
		observeSlideChildren: true,
	})
}

scrollAnchors()
generateTextInHoverBlock()
toggleContent()
burger()
