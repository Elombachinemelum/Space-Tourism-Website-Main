const articles = document.querySelectorAll('article[data-content]');
const images = document.querySelectorAll('picture[data-image]');

// MENU SWITCHING SECTION.........
const mobileToggle = document.querySelector('.navbar-toggle-mobile');
const navbar = document.querySelector('[data-navbar]');

//............................. NAVBAR SECTION..............................
const navbarLinks = document.querySelectorAll('#primary-navbar > * a');

navbarLinks.forEach(link=>{
    link.addEventListener('click', e=>{
        navbarLinks.forEach(navlink=>{
           let linkParent = navlink.parentNode;
           linkParent.setAttribute("aria-selected", false);
        })
        // console.log(e.target);
        let targetParent;
        if(e.target.matches('span')){
            // in this case the anchor is clicked, but the specific target is a span. we simple apply the attribute to link its self
            targetParent = link.parentNode; //because the link is a parent to the spans. so link parentNode is <li>
        }else{
            targetParent = (e.target).parentNode; // e.target is link hence parent node is still <li>
        }
        // finally we set the attribute to target element....
        targetParent.setAttribute("aria-selected", true);
    });
});

// navbar slide out and slide in............
mobileToggle.addEventListener("click", ()=>{
    if(navbar.classList.contains('slide-out')){
        navbar.classList.remove("slide-out");
        mobileToggle.classList.remove('dissmiss');  //changing toggle to hamburger
    }else{
        navbar.classList.add("slide-out");
        mobileToggle.classList.add('dissmiss');  // changing the hamburger to "X"
    }
})

let tabfocus = 0; // to loop through the tabs array....
let keyCodeLeft = 37;
let keyCodeRight = 39;
let keyCodeUp = 38;
let keyCodeDown = 40;

// circle indictors section
const circleIndicatorsTab = document.querySelector('[data-indicatorTab]');
const circleIndicators = circleIndicatorsTab.querySelectorAll('[data-indicator]');

// adding ev to circleindicators tab
circleIndicatorsTab.addEventListener('keydown', e=>{
    let code = e.keyCode
    if(code == keyCodeUp || code == keyCodeDown || code == keyCodeLeft || code == keyCodeRight){
        circleIndicators.forEach(indi=>{
            indi.setAttribute('tabindex', '-1'); //untabable..
        });
        if(code==keyCodeRight || code==keyCodeDown){
            tabfocus ++;
            if(tabfocus > circleIndicators.length-1){
                tabfocus = 0;
            }
        }else if(code==keyCodeLeft || code==keyCodeUp){
            tabfocus --;
            if(tabfocus < 0){
                tabfocus = circleIndicators.length -1;
            }
        } 

        // set focus on selected indicator....
        circleIndicators[tabfocus].setAttribute('tabindex', '0');
        circleIndicators[tabfocus].focus();
    }
})

// adding ev to cirlcle indicators..............
circleIndicators.forEach(indi=>{
    indi.addEventListener('click', e=>{
        circleIndicators.forEach(indicator=>{
            indicator.setAttribute('aria-selected', 'false');
        });
        // give the clicked link the aria-selected attribute...
        indi.setAttribute('aria-selected', 'true');
        // allow the appropriate article be seen...
        articles.forEach(article=>{
            article.hidden = true;
            if(indi.getAttribute('aria-controls') === article.getAttribute('id')){
                article.removeAttribute('hidden');
            }
        });

        // set the right image to be seen....
        images.forEach(image=>{
            image.setAttribute('hidden', 'true');
            if(indi.getAttribute('aria-controls') === image.getAttribute('id')){
                image.removeAttribute('hidden');
            }
        });
    });
}); //last bit of code in this project or not??.....