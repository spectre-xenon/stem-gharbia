//@license Copyright 2020, OmarZaghlool. All rights reserved.

const nav_links = document.querySelectorAll('.nav-links')
const menu = document.querySelector('#menu')
const menu_morph = document.querySelector('#menu_m')
const content = document.querySelector('#content')
const blur = document.querySelector('#blur')
const nav = document.querySelector('.nav')
const navbar = document.querySelector('.navbar')
const theme_switch = document.querySelector('#theme-switch')
const screen = window.matchMedia('(max-width: 768px)')


const menu_path = 'M0 2C0 0.895431 0.895431 0 2 0H38C39.1046 0 40 0.895431 40 2C40 3.10457 39.1046 4 38 4H2C0.895431 4 0 3.10457 0 2ZM10 16C10 14.8954 10.8954 14 12 14H38C39.1046 14 40 14.8954 40 16C40 17.1046 39.1046 18 38 18H12C10.8954 18 10 17.1046 10 16ZM22 28C20.8954 28 20 28.8954 20 30C20 31.1046 20.8954 32 22 32H38C39.1046 32 40 31.1046 40 30C40 28.8954 39.1046 28 38 28H22Z'
const x_path = 'M0 2C0 0.895431 0.895431 0 2 0H38C39.1046 0 40 0.895431 40 2C40 3.10457 39.1046 4 38 4H2C0.895431 4 0 3.10457 0 2ZM0 16C0 14.8954 0.895431 14 2 14H38C39.1046 14 40 14.8954 40 16C40 17.1046 39.1046 18 38 18H2C0.895431 18 0 17.1046 0 16ZM2 28C0.895431 28 0 28.8954 0 30C0 31.1046 0.895431 32 2 32H38C39.1046 32 40 31.1046 40 30C40 28.8954 39.1046 28 38 28H2Z'
const sun = 'M61.5 32C61.5 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32C0 14.3269 14.3269 0 32 0C49.6731 0 61.5 14.3269 61.5 32Z'
const moon = 'M20.4414 32.9414C20.4414 50.6145 32.9414 64.9414 32.9414 64.9414C15.2683 64.9414 0.941406 50.6145 0.941406 32.9414C0.941406 15.2683 15.2683 0.941406 32.9414 0.941406C32.9414 0.941406 20.4414 15.2683 20.4414 32.9414Z'



//intro-text-animation
document.addEventListener('DOMContentLoaded', e => {
  function animateSgv(id, delay, delayIncrement) {
    const logo = document.getElementById(id);
    const logoPaths = document.querySelectorAll(`#${id} path`);
    delay = delay;
    for (let i = 0; i < logoPaths.length; i++) {
      logoPaths[i].style.strokeDasharray = logoPaths[i].getTotalLength();
      logoPaths[i].style.strokeDashoffset = logoPaths[i].getTotalLength();
      logoPaths[i].style.animation = `line-anim 2s ease forwards ${delay}s`;
      delay += delayIncrement;
    }
    logo.style.animation = `fill 0.5s ease forwards ${delay + 1.4}s`;
  }
  // Set the id of SVG, delay time in seconds to start animation and delay between each animation
  animateSgv('intro-text', 0, 0.1)
}, false);

//theme-switcher
const tl2 = anime.timeline({
  duration: 650,
  easing: 'easeOutExpo'
})

if (localStorage.getItem('theme') == 'dark') {
  tl2.add({
    targets: '#sun',
    d: [{ value: moon }]
  })
    .add({
      targets: theme_switch,
      rotate: 320
    }, '-=350')
  document.body.classList.toggle('dark-mode')
}

theme_switch.addEventListener('click', e => {

  const tl = anime.timeline({
    duration: 650,
    easing: 'easeOutExpo'
  })

  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'lite')
    tl.add({
      targets: '#sun',
      d: [{ value: sun }]
    })
    document.body.classList.toggle('dark-mode')
  }
  else {
    localStorage.setItem('theme', 'dark')
    tl.add({
      targets: '#sun',
      d: [{ value: moon }]
    })
      .add({
        targets: theme_switch,
        rotate: 320
      }, '-=350')
    document.body.classList.toggle('dark-mode')
  }

})


//side-menu-animation
menu.addEventListener('click', e => {
  if (content.style.left == '60%' || content.style.left == '75%') {
    gsap.to(content, { left: '100%', duration: 0.3 })
    gsap.to(content, { paddingRight: '5%' })
    gsap.to(content, { paddingLeft: '5%' })
    gsap.to(content, { paddingTop: '0%' })
    gsap.to(content, { paddingBottom: '0%' })
    gsap.to(nav, { display: 'none' })
    gsap.to(blur, { backdropFilter: 'blur(0px)', duration: 0.4 })


    anime({
      targets: menu_morph,
      d: [{ value: menu_path }]
    })
  }
  else {
    if (screen.matches) {
      gsap.to('.nav-links-cont', { y: '-22px', x: '-22px', duration: 0 })
      gsap.to(content, { padding: '12%' })
      gsap.to(content, { left: '60%', duration: 0.3 })
      gsap.to(nav, { display: 'block' })
      gsap.to(blur, { backdropFilter: 'blur(8px)', duration: 1 })

      anime({
        targets: menu_morph,
        d: [{ value: x_path }]
      })
    }
    else {
      gsap.to(content, { left: '60%', duration: 0.3 })
      gsap.to(nav, { display: 'block' })
      gsap.to(blur, { backdropFilter: 'blur(8px)', duration: 1 })

      anime({
        targets: menu_morph,
        d: [{ value: x_path }]
      })
    }
  }
})



