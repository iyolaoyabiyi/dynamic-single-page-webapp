window.addEventListener('DOMContentLoaded', async () => {
  const mainNav = document.getElementById('mainNav');
  const mobileNavBtn = document.getElementById('mobileNavBtn');
  const mobileNav = document.getElementById('mobileNav');
  const destNav = document.getElementById('destNav');
  const crewNav = document.getElementById('crewNav');
  const techNav = document.getElementById('techNav');
  const homeSect = document.getElementById('home');
  const destSect = document.getElementById('destination');
  const crewSect = document.getElementById('crew');
  const techSect = document.getElementById('tech');
  const docBody = document.body;
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
  const pageNavs = {
    home: {
      class: '.home-nav',
      bgs: [
        './assets/images/bgs/desktop/background-home-desktop.jpg', 
        './assets/images/bgs/tab/background-home-tablet.jpg', 
        './assets/images/bgs/mobile/background-home-mobile.jpg'
      ],
      sect: homeSect
    },
    dest: {
      class: '.dest-nav',
      bgs: [
        './assets/images/bgs/desktop/background-destination-desktop.jpg', 
        './assets/images/bgs/tab/background-destination-tablet.jpg', 
        './assets/images/bgs/mobile/background-destination-mobile.jpg'
      ],
      sect: destSect
    },
    crew: {
      class: '.crew-nav',
      bgs: [
        './assets/images/bgs/desktop/background-crew-desktop.jpg', 
        './assets/images/bgs/tab/background-crew-tablet.jpg', 
        './assets/images/bgs/mobile/background-crew-mobile.jpg'
      ],
      sect: crewSect
    },
    tech: {
      class: '.tech-nav',
      bgs: [
        './assets/images/bgs/desktop/background-technology-desktop.jpg', 
        './assets/images/bgs/tab/background-technology-tablet.jpg', 
        './assets/images/bgs/mobile/background-technology-mobile.jpg'
      ],
      sect: techSect
    },
  }
  async function fetchData() {
    const data = await fetch('./assets/data.json');
    const result = await data.json();

    return result;
  }
  const siteData = await fetchData();

  function toggleMobileNav() {
    mobileNav.classList.toggle('hidden');
  }
  // const restartObserver = new ResizeObserver((entries) => {
  //   for(let entry of entries) {
  //     console.log(checkWidth());
  //   }
  // });
  // restartObserver.observe(docBody);
  function checkWidth() {
    const width = docBody.clientWidth;
    if (width <= 768) {
      return 'mobile';
    } else if (width <= 992) {
      return 'tab';
    } else {
      return 'desktop';
    }
  }
  function setStyle(element, property, value) {
    element.style[property] = value;
  };
  function resetDisplay() {
    pageSects.forEach(sect => {
      setStyle(sect, 'display', 'none');
    });
  }
  function changeBg(urls) {
    let imgUrl = '';
    switch (checkWidth()) {
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
    setStyle(docBody, 'background', `url('${imgUrl}'`);
    setStyle(docBody, 'backgroundSize', 'cover');
  }

  function switchPage(e) {
    const targetEl = e.target;
    const buttons = mainNav.querySelectorAll('button');

    buttons.forEach(button => {
      button.classList.remove('active');
    });
    // console.log(targetEl.closest('home-nav'));
    if(targetEl.closest(pageNavs.home.class)) {
      resetDisplay();
      homeSect.style.display = 'grid';
      changeBg(pageNavs.home.bgs);
      buttons[0].classList.add('active');
    } else if(targetEl.closest(pageNavs.dest.class) || targetEl.id === 'exploreBtn') {
      resetDisplay();
      destSect.style.display = 'block';
      buttons[1].classList.add('active');
      changeBg(pageNavs.dest.bgs);
    } else if(targetEl.closest(pageNavs.crew.class)) {
      resetDisplay();
      crewSect.style.display = 'block';
      buttons[2].classList.add('active');
      changeBg(pageNavs.crew.bgs);
    } else if(targetEl.closest(pageNavs.tech.class)) {
      resetDisplay();
      techSect.style.display = 'block';
      buttons[3].classList.add('active');
      changeBg(pageNavs.tech.bgs);
    }
    mobileNav.classList.add('hidden');
  }
  function switchDest(e) {
    const targetEl = e.target;
    const buttons = this.querySelectorAll('button');
    buttons.forEach(button => {
      button.classList.remove('active');
    });
    const destData = siteData.destinations;
    const moon = destData[0];
    const mars = destData[1];
    const europa = destData[2];
    const titan = destData[3];
    function setDest(obj) {
      const destName = obj.name;
      const destImg = obj.images.png;
      const destDesc = obj.description;
      const destDistance = obj.distance;
      const destTravel = obj.travel;
      destNameEl.textContent = destName;
      destDescEl.textContent = destDesc;
      destDistanceEl.textContent = destDistance;
      destTravelEl.textContent = destTravel;
      destImgEl.setAttribute('src', destImg);
    }
    switch (targetEl.id) {
      case 'moonBtn':
        targetEl.classList.add('active');
        setDest(moon);
        break;
      case 'marsBtn':
        targetEl.classList.add('active');
        setDest(mars);
        break;
      case 'europaBtn':
        targetEl.classList.add('active');
        setDest(europa);
        break;
      case 'titanBtn':
        targetEl.classList.add('active');
        setDest(titan);
        break;
    }
  }

  function switchCrew(e) {
    const targetEl = e.target;
    const buttons = this.querySelectorAll('button');
    buttons.forEach(button => {
      button.classList.remove('active');
    });
    const crewData = siteData.crew;
    const commander = crewData[0];
    const missionSpecialist = crewData[1];
    const pilot = crewData[2];
    const flightEngr = crewData[3];
    function setCrew(obj) {
      const crewName = obj.name;
      const crewImg = obj.images.png;
      const crewDesc = obj.bio;
      const crewRole = obj.role;
      crewNameEl.textContent = crewName;
      crewDescEl.textContent = crewDesc;
      crewRoleEl.textContent = crewRole;
      crewImgEl.setAttribute('src', crewImg);
    }
    switch (targetEl.id) {
      case 'crew1':
        targetEl.classList.add('active');
        setCrew(commander);
        break;
      case 'crew2':
        targetEl.classList.add('active');
        setCrew(missionSpecialist);
        break;
      case 'crew3':
        targetEl.classList.add('active');
        setCrew(pilot);
        break;
      case 'crew4':
        targetEl.classList.add('active');
        setCrew(flightEngr);
        break;
    }
  }
  function switchTech(e) {
    const targetEl = e.target;
    const buttons = this.querySelectorAll('button');
    buttons.forEach(button => {
      button.classList.remove('active');
    });
    const techData = siteData.technology;
    const launchVehicle = techData[0];
    const spacePort = techData[1];
    const spaceCapsule = techData[2];
    function setTech(obj) {
      const techName = obj.name;
      const techImg = obj.images.portrait;
      const techDesc = obj.description;
      techNameEl.textContent = techName;
      techDescEl.textContent = techDesc;
      techImgEl.setAttribute('src', techImg);
    }
    switch (targetEl.id) {
      case 'tech1':
        targetEl.classList.add('active');
        setTech(launchVehicle);
        break;
      case 'tech2':
        targetEl.classList.add('active');
        setTech(spacePort);
        break;
      case 'tech3':
        targetEl.classList.add('active');
        setTech(spaceCapsule);
        break;
    }
  }

  mobileNavBtn.addEventListener('click', toggleMobileNav);
  mainNav.addEventListener('click', switchPage);
  mobileNav.addEventListener('click', switchPage);
  exploreBtn.addEventListener('click', switchPage);
  destNav.addEventListener('click', switchDest);
  crewNav.addEventListener('click', switchCrew);
  techNav.addEventListener('click', switchTech);
});