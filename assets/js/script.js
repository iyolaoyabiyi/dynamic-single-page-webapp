// Preload resource
let resourceCount = 0;
const imgUrls = [
  './assets/images/bgs/desktop/background-home-desktop.jpg',
  './assets/images/bgs/tab/background-home-tablet.jpg',
  './assets/images/bgs/mobile/background-home-mobile.jpg',
  './assets/images/bgs/desktop/background-destination-desktop.jpg',
  './assets/images/bgs/tab/background-destination-tablet.jpg',
  './assets/images/bgs/mobile/background-destination-mobile.jpg',
  './assets/images/bgs/desktop/background-technology-desktop.jpg', 
  './assets/images/bgs/tab/background-technology-tablet.jpg', 
  './assets/images/bgs/mobile/background-technology-mobile.jpg',
  './assets/images/bgs/desktop/background-crew-desktop.jpg', 
  './assets/images/bgs/tab/background-crew-tablet.jpg', 
  './assets/images/bgs/mobile/background-crew-mobile.jpg',
  "./assets/images/destination/image-moon.png",
  "./assets/images/destination/image-mars.png",
  "./assets/images/destination/image-europa.png",
  "./assets/images/destination/image-titan.png",
  "./assets/images/crew/image-douglas-hurley.png",
  "./assets/images/crew/image-mark-shuttleworth.png",
  "./assets/images/crew/image-victor-glover.png",
  "./assets/images/crew/image-anousheh-ansari.png",
  "./assets/images/technology/image-launch-vehicle-portrait.jpg",
  "./assets/images/technology/image-spaceport-portrait.jpg",
  "./assets/images/technology/image-space-capsule-portrait.jpg",
];
function preloadImage(url) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      res(img);
      resourceCount += 1
    };
    img.onerror = () => {
      resourceCount += 1
      rej('Error preloading resource');
    }
  }); 
}
async function preloadAll(urls) {
  const imgCache = {};
  urls.forEach(async url => {
    try {
      const img = await preloadImage(url);
      imgCache[url] = img;
      if (resourceCount === urls.length) {
        setLoader(loader, 'hide');
      } else {
        setLoader(loader);
      }
    } catch (err) {
      console.log(`Unable to load ${url}`, err)
    }
  });
  return imgCache;
}
function setLoader(loader, mode) {
  switch(mode) {
    case 'hide':
      loader.classList.add('hidden');
      break;
    default:
      loader.classList.remove('hidden');
      break;
  }
}
// Load Resources
window.addEventListener('DOMContentLoaded', async () => {
  // Loader
  const loader = document.getElementById('loader');
  const imgCache = await preloadAll(imgUrls);
  const docBody = document.body;
  const headerLogo = document.querySelector('.header-logo');
  // Navs
  const mainNav = document.getElementById('mainNav');
  const mobileNav = document.getElementById('mobileNav');
  const destNav = document.getElementById('destNav');
  const crewNav = document.getElementById('crewNav');
  const techNav = document.getElementById('techNav');
  // Pages/Sections
  const homeSect = document.getElementById('home');
  const destSect = document.getElementById('destination');
  const crewSect = document.getElementById('crew');
  const techSect = document.getElementById('tech');
  // Buttons
  const mobileNavBtn = document.getElementById('mobileNavBtn');
  const exploreBtn = document.getElementById('exploreBtn');
  // Destinations
  const destNameEl = document.getElementById('destName');
  const destDescEl = document.getElementById('destDesc');
  const destImgEl = document.getElementById('destImg');
  const destDistanceEl = document.getElementById('destDistance');
  const destTravelEl = document.getElementById('destTravel');
  // Crew
  const crewNameEl = document.getElementById('crewName');
  const crewDescEl = document.getElementById('crewDesc');
  const crewImgEl = document.getElementById('crewImg');
  const crewRoleEl = document.getElementById('crewRole');
  // Tech
  const techNameEl = document.getElementById('techName');
  const techDescEl = document.getElementById('techDesc');
  const techImgEl = document.getElementById('techImg');
  
  const pageSects = [homeSect, destSect, crewSect, techSect];
  const pageNavBtns = mainNav.querySelectorAll('button');
  const destNavBtns = destNav.querySelectorAll('button');
  [ homeBtn, destBtn, crewBtn, techBtn ] = pageNavBtns;
  const imgDir = '';
  // Helper Functions
  function checkBreakpoint() {
    const width = docBody.clientWidth;
    if (width <= 768) {
      return 'mobile';
    } else if (width <= 992) {
      return 'tab';
    } else {
      return 'desktop';
    }
  }
  async function fetchData(url, type) {
    let data = await fetch(url);
    if (type === 'json') {
      data = await data.json();
    }
    return data;
  }
  function clearDisplay() {
    pageSects.forEach(sect => {
      sect.style.display = 'none';
    });
    pageNavBtns.forEach(btn => {
      btn.classList.remove('active');
    });
  }
  function activateNav(nav) {
    nav.classList.add('active')
  }
  function changeBg(urls, cache) {
    let imgUrl = '';
    function checkCache(url) {
      if (cache[url]) {
        imgUrl = url;
      } else {
        imgUrl = './assets/images/bgs/desktop/background-home-desktop.jpg';
        console.log('Error');
      }
    }
    switch (checkBreakpoint()) {
      case 'desktop':
        checkCache(urls[0]);
        break;
      case 'tab':
        imgUrl = urls[1];
        break;
      case 'mobile':
        imgUrl = urls[2];
        break;
    }
    docBody.style.background = `url('${imgUrl}'`;
    docBody.style.backgroundSize = 'cover';
  }
  function setImg(el, url, cache) {
    if(cache[url]) {
      el.src = cache[url].src;
    } else {
      el.src = './assets/images/technology/image-spaceport-portrait.jpg';
    }
  }
  // Site Options
  const sectionsData = await fetchData('./assets/data.json', 'json');
  const destData = sectionsData.destinations;
  const crewData = sectionsData.crew;
  const techData = sectionsData.technology;
  const [moonData, marsData, europaData, titanData] = destData;
  const [commanderData, specialistData, pilotData, engineerData] = crewData;
  const [launchVehicleData, spacePortData, spaceCapsuleData] = techData;
  const pages = {
    home: {
      name: 'home',
      elClass: '.home-nav',
      bgs: [
        './assets/images/bgs/desktop/background-home-desktop.jpg', 
        './assets/images/bgs/tab/background-home-tablet.jpg', 
        './assets/images/bgs/mobile/background-home-mobile.jpg'
      ],
      btn: homeBtn,
      sect: homeSect
    },
    dest: {
      name: 'destination',
      elClass: '.dest-nav',
      bgs: [
        './assets/images/bgs/desktop/background-destination-desktop.jpg', 
        './assets/images/bgs/tab/background-destination-tablet.jpg', 
        './assets/images/bgs/mobile/background-destination-mobile.jpg'
      ],
      btn: destBtn,
      sect: destSect
    },
    crew: {
      name: 'crew',
      elClass: '.crew-nav',
      bgs: [
        './assets/images/bgs/desktop/background-crew-desktop.jpg', 
        './assets/images/bgs/tab/background-crew-tablet.jpg', 
        './assets/images/bgs/mobile/background-crew-mobile.jpg'
      ],
      btn: crewBtn,
      sect: crewSect
    },
    tech: {
      name: 'technology',
      elClass: '.tech-nav',
      bgs: [
        './assets/images/bgs/desktop/background-technology-desktop.jpg', 
        './assets/images/bgs/tab/background-technology-tablet.jpg', 
        './assets/images/bgs/mobile/background-technology-mobile.jpg'
      ],
      btn: techBtn,
      sect: techSect
    },
  }
  // Toggle Mobile Navigation
  function toggleMobileNav() {
    mobileNav.classList.toggle('hidden');
  }
  // Pages Constructor
  class Page {
    constructor({ name, elClass, bgs, btn, sect }) {
      this.name = name;
      this.class = elClass;
      this.bgs = bgs;
      this.sect = sect;
      this.show = function () {
        clearDisplay();
        changeBg(this.bgs, imgCache);
        btn.classList.add('active');
        sect.style.display = name === 'home' ? 'grid' : 'block';
      };
    }
  }
  // Section Construction
  class SectElems {
    constructor(sectName, sectImg, sectDesc, sectNavBtn) {
      this.sectName = sectName;
      this.sectImg = sectImg;
      this.sectDesc = sectDesc;
      this.sectNavBtn = sectNavBtn;
    }
  }
  const sections = {
    dest: {
      name: 'destinations',
      ...new SectElems(destNameEl, destImgEl, destDescEl, destNav),
      sectDist: destDistanceEl, 
      sectTrav: destTravelEl
    },
    crew: {
      name: 'crew',
      ...new SectElems(crewNameEl, crewImgEl, crewDescEl, crewNav),
      sectRole: crewRoleEl
    },
    tech: {
      name: 'technology',
      ...new SectElems(techNameEl, techImgEl, techDescEl, techNav)
    }
  }
  class Section {
    constructor({name, sectName, sectImg, sectDesc, sectNavBtn, sectRole, sectDist, sectTrav }) {
    this.pageName = name;
    this.nameEl = sectName;
    this.imageEl = sectImg;
    this.descriptionEl = sectDesc ?? '';
    this.distanceEl = sectDist ?? '';
    this.travelEl = sectTrav ?? '';
    this.roleEl = sectRole ?? '';
    this.navBtns = sectNavBtn.querySelectorAll('button');
  }
  setOption(data) {
    const { name, images, description, bio, role, distance, travel } = data;
    this.navBtns.forEach(btn => btn.classList.remove('active'));
    this.nameEl.textContent = name;
    this.descriptionEl.textContent = description ?? bio;
    setImg(this.imageEl, (images.png ?? images.portrait), imgCache);
    switch (this.pageName) {
      case 'destinations':
        const [moonBtn, marsBtn, europaBtn, titanBtn] = this.navBtns;
        this.distanceEl.textContent = distance;
        this.travelEl.textContent = travel;
        switch (name.toLowerCase()) {
          case 'moon':
            activateNav(moonBtn);
            break;
          case 'mars':
            activateNav(marsBtn);
            break;
          case 'europa':
            activateNav(europaBtn);
            break;
          case 'titan':
            activateNav(titanBtn);
            break;
        }
        break;
      case 'crew':
        const [commanderBtn, specialistBtn, pilotBtn, engrBtn] = this.navBtns
        this.roleEl.textContent = role;
        switch (role.toLowerCase()) {
          case 'commander':
            activateNav(commanderBtn);
            break;
          case 'mission specialist':
            activateNav(specialistBtn);
            break;
          case 'pilot':
            activateNav(pilotBtn);
            break;
          case 'flight engineer':
            activateNav(engrBtn);
            break;
        }
        break;
      case 'technology':
        const [launchVBtn, spaceportBtn, capsuleBtn] = this.navBtns;
        switch (name.toLowerCase()) {
          case 'launch vehicle':
            activateNav(launchVBtn);
            break;
          case 'spaceport':
            activateNav(spaceportBtn);
            break;
          case 'space capsule':
            activateNav(capsuleBtn);
            break;
        }
        break;
      default:
        break;
    }
  }
}
  // Make Pages
  const homePage = new Page(pages.home);
  const destPage = new Page(pages.dest);
  const crewPage = new Page(pages.crew);
  const techPage = new Page(pages.tech);
  // Destination Section
  const destinations = new Section(sections.dest);
  // Crew Section
  const crew = new Section(sections.crew);
  // Tech Section
  const tech = new Section(sections.tech);
  // Switch Pages
  function switchPage(e) {
    const targetEl = e.target;
    if(targetEl.closest(`${homePage.class}, .header-logo`)) {
      homePage.show();
    } else if(targetEl.closest(destPage.class) || targetEl.id === 'exploreBtn') {
      destPage.show();
    } else if(targetEl.closest(crewPage.class)) {
      crewPage.show();
    } else if(targetEl.closest(techPage.class)) {
      techPage.show();
    }
    mobileNav.classList.add('hidden');
  }
  // Set Sections
  function setSection(e) {
    const targetEl = e.target;
      switch (targetEl.id) {
        case 'moonBtn':
          // moon.setOption();
          destinations.setOption(moonData);
          break;
        case 'marsBtn':
          // mars.setOption();
          destinations.setOption(marsData);
          break;
        case 'europaBtn':
          // europa.setOption();
          destinations.setOption(europaData);
          break;
        case 'titanBtn':
          // titan.setOption();
          destinations.setOption(titanData);
          break;
        case 'crew1':
          crew.setOption(commanderData);
          break;
        case 'crew2':
          crew.setOption(specialistData);
          break;
        case 'crew3':
          crew.setOption(pilotData);
          break;
        case 'crew4':
          crew.setOption(engineerData);
          break;
        case 'tech1':
          tech.setOption(launchVehicleData);
          break;
        case 'tech2':
          tech.setOption(spacePortData);
          break;
        case 'tech3':
          tech.setOption(spaceCapsuleData);
          break;
        default:
         homePage.show();
         break;
      }
  }
  // Listeners
  mobileNavBtn.addEventListener('click', toggleMobileNav);
  mainNav.addEventListener('click', switchPage);
  mobileNav.addEventListener('click', switchPage);
  headerLogo.addEventListener('click', switchPage);
  exploreBtn.addEventListener('click', switchPage);
  destNav.addEventListener('click', setSection);
  crewNav.addEventListener('click', setSection);
  techNav.addEventListener('click', setSection);
});
// Make pages, sections, and section options dynamic