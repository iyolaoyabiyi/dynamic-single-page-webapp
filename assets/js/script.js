window.addEventListener('DOMContentLoaded', async () => {
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
    const data = await fetch(url);
    let result;
    if (type === 'json') {
      result = await data.json();
    }
    return result;
  }
  function activateNav(nav) {
    nav.classList.add('active')
  }
  // Site Options
  const sectionsData = await fetchData('./assets/data.json', 'json');
  const destData = sectionsData.destinations;
  const crewData = sectionsData.crew;
  const techData = sectionsData.technology;
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
  function Page({name, elClass, bgs, btn, sect}) {
    function clearDisplay() {
      pageSects.forEach(sect => {
        sect.style.display = 'none';
      });
      pageNavBtns.forEach(btn => {
        btn.classList.remove('active');
      });
    }
    function changeBg(urls) {
      let imgUrl = '';
      switch (checkBreakpoint()) {
        case 'desktop':
          imgUrl = urls[0];
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
    this.name = name;
    this.class = elClass;
    this.bgs = bgs;
    this.sect = sect;
    this.show = function() {
      clearDisplay();
      changeBg(this.bgs);
      btn.classList.add('active');
      sect.style.display = name === 'home' ? 'grid' : 'block';
    }
  }
  // Section Construction
  function SectElems(sectName, sectImg, sectDesc, sectNavBtn) {
    this.sectName = sectName;
    this.sectImg = sectImg;
    this.sectDesc = sectDesc;
    this.sectNavBtn = sectNavBtn;
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
  function Section({name, sectName, sectImg, sectDesc, sectNavBtn, sectRole, sectDist, sectTrav }) {
    const navBtns = sectNavBtn.querySelectorAll('button');
    let [moonBtn, marsBtn, europaBtn, titanBtn] = [];
    let [commanderBtn, specialistBtn, pilotBtn, engrBtn] = [];
    let [launchVBtn, spaceportBtn, capsuleBtn] = [];
    const pageName = name;
    const nameEl = sectName;
    const imageEl = sectImg;
    const descriptionEl = sectDesc ?? '';
    const distanceEl = sectDist ?? '';
    const travelEl = sectTrav ?? '';
    const roleEl = sectRole ?? '';
    if(pageName === 'destinations') {
      [moonBtn, marsBtn, europaBtn, titanBtn] = navBtns;
    } else if(pageName === 'crew') {
      [commanderBtn, specialistBtn, pilotBtn, engrBtn] = navBtns
    } else if(pageName === 'technology') {
      [launchVBtn, spaceportBtn, capsuleBtn] = navBtns
    }
    return function({ name, images, description, bio, role, distance, travel }) {
      this.name = name;
      this.images = images;
      if(pageName === 'crew') {
        this.description = bio;
        this.role = role;
      } else if(pageName === 'destinations') {
        this.distance = distance;
        this.travel = travel;
        this.description = description;
      } else {
        this.description = description;
      }
      this.setOption = function() {
        navBtns.forEach(btn => {
          btn.classList.remove('active');
        });
        nameEl.textContent = this.name;
        imageEl.src = this.images.png ?? this.images.portrait
        descriptionEl.textContent = this.description ?? this.bio;
        if (pageName === 'destinations') {
          distanceEl.textContent = this.distance;
          travelEl.textContent = this.travel;
          switch (this.name.toLowerCase()) {
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
        } else if (pageName === 'crew') {
          roleEl.textContent = this.role;
          switch (this.role.toLowerCase()) {
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
        } else if (pageName === 'technology') {
          switch (this.name.toLowerCase()) {
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
        }
      }
    }
  }
  // Make Pages
  const homePage = new Page(pages.home);
  const destPage = new Page(pages.dest);
  const crewPage = new Page(pages.crew);
  const techPage = new Page(pages.tech);
  // Destinations Section
  const Destination = new Section(sections.dest);
  const moon = new Destination(destData[0]);
  const mars = new Destination(destData[1]);
  const europa = new Destination(destData[2]);
  const titan = new Destination(destData[3]);
  // Crew Sections
  const Crew = new Section(sections.crew);
  const commander = new Crew(crewData[0]);
  const specialist = new Crew(crewData[1]);
  const pilot = new Crew(crewData[2]);
  const engr = new Crew(crewData[3]);
  // Tech Sections
  const Tech = new Section(sections.tech);
  const launchVehicle = new Tech(techData[0]);
  const spaceport = new Tech(techData[1]);
  const spaceCapsule = new Tech(techData[2]);
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
          moon.setOption();
          break;
        case 'marsBtn':
          mars.setOption();
          break;
        case 'europaBtn':
          europa.setOption();
          break;
        case 'titanBtn':
          titan.setOption();
          break;
        case 'crew1':
          commander.setOption();
          break;
        case 'crew2':
          specialist.setOption();
          break;
        case 'crew3':
          pilot.setOption();
          break;
        case 'crew4':
          engr.setOption();
          break;
        case 'tech1':
          launchVehicle.setOption();
          break;
        case 'tech2':
          spaceport.setOption();
          break;
        case 'tech3':
          spaceCapsule.setOption();
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