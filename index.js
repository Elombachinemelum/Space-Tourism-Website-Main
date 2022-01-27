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


// .......................DESTINATION PAGE SECTION....................

let tabfocus = 0; // to loop through the tabs array....
let keyCodeLeft = 37;
let keyCodeRight = 39;

// destination constants........
const tablist = document.querySelector('[role="tablist"]');
const tabs = tablist.querySelectorAll('[role="tab"]');  //we query the tablist instead of the whole document...
const articles = document.querySelectorAll('div > [role = "tabpanel"]');  //the tabs
// the images too be shown...
const images = document.querySelectorAll("div picture[id]"); //array of images...

tabs.forEach(tab=>{
    tab.addEventListener('click', showContent);
});

tablist.addEventListener('keydown', (e)=>{
    if(e.keyCode == keyCodeLeft || e.keyCode == keyCodeRight){
        // we only want to work when its left or right
        changeTabs(e, tabs) // takes our tabs array and does the switcing
    }
});

function changeTabs(evt, items){ // pass in event obj and an array of 
    // we set all tabs to -1 so they cant be focused on.. then 
    items.forEach(item=>{
        item.setAttribute('tabindex', '-1');
    })

    // we switch on the e.keycode..
    switch (evt.keyCode) {
        case keyCodeRight:
            tabfocus ++ //increament..
            if(tabfocus > items.length - 1){
                // must be 3 previously so we take it back to the begining...
                tabfocus = 0;
            }
            break;
        case keyCodeLeft:
            tabfocus -- //decreament...
            if(tabfocus < 0){
                tabfocus = items.length - 1; //starts afresh....
            }
            break
        default:
            break;
    }

    // finally we set the focus in the appropriate tab...
    items[tabfocus].setAttribute('tabindex', '0')
    items[tabfocus].focus();
}

function showContent(e){
    //only one tab at a time should have this attribute set as true...
    document.querySelector('[role="tablist"] [aria-selected = "true"]').setAttribute('aria-selected', false); 
    e.target.setAttribute('aria-selected', true); //the clicked tab becomes styled accordingly

    articles.forEach(article=>{
        // hide all content...
        article.classList.add('invisible');

        if(article.getAttribute('id')== e.target.innerText){
            article.classList.remove('invisible');
        }
    });
    showCorrespondingPicture(e, images);  //pass in the event object and array of images...
}

// functions cleaning up code.....
function showCorrespondingPicture(evt, pictures){
    pictures.forEach(picture=>{  //pictures is an array..
        picture.hidden = true;  //can still use setAttribute('hidden', true)
        if(picture.getAttribute('id')== evt.target.innerText){
            picture.removeAttribute('hidden'); //lets us see the corresponding image..
        }
    });
}


