const dotIndicatorsTab = document.querySelector('[data-dotIndicatorsTab]');
const dotIndicators = dotIndicatorsTab.querySelectorAll("[data-dotIndicator]");
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

dotIndicatorsTab.addEventListener('keydown', e=>{
    if(e.keyCode == keyCodeLeft || e.keyCode== keyCodeRight){
        dotIndicators.forEach(indicator=>{
            indicator.setAttribute('tabindex', '-1');
        });
        switch (e.keyCode) {
            case keyCodeRight:
                tabfocus ++;
                if(tabfocus > dotIndicators.length -1){
                    tabfocus = 0;
                }
                break;
            case keyCodeLeft:
                tabfocus --;
                if(tabfocus < 0){
                    tabfocus = dotIndicators.length - 1; //cycles continously
                }
                break
            default:
                break;
        }
        dotIndicators[tabfocus].setAttribute('tabindex', '0');
        dotIndicators[tabfocus].focus();
    }
})

// switching the content and pictures of the crew...
dotIndicators.forEach(indicator=>{
    indicator.addEventListener('click', e=>{
        let targetDot = e.target;
        dotIndicatorsTab.querySelector('[aria-selected = "true"]').setAttribute('aria-selected', 'false');
        targetDot.setAttribute('aria-selected', 'true') //the clicked dot is styled as aria selected

        // we get the articles..
        articles.forEach(article=>{
            article.setAttribute('hidden', true);
            if(targetDot.getAttribute('aria-controls') == article.getAttribute('id')){
                // we need to make the article seen..
                article.removeAttribute('hidden');
            }
        })

        // we switch the images..
        images.forEach(image=>{
            image.hidden = true;
            if(targetDot.getAttribute('aria-controls')== image.getAttribute('id')){
                image.removeAttribute('hidden')
            }
        })
    });
})


