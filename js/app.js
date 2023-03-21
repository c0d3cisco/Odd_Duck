'use strict';

const picsAvailable = []; //initializes array of Objects
let votingRounds = 26; //default is 25, but need to start at 26 since initiating the test counts as a votingRound

// construct function 
function Image(nameImg, source) {
    this.nameImg = nameImg
    this.timeClicked = 0;
    this.shownTimes = 0;
    this.source = source;
}

Image.prototype.shownCounter = function () {
    this.shownTimes++;
}
//resets both properties and list of results
Image.prototype.reset = function () {
    this.timeClicked = 0;
    this.shownTimes = 0;
    renderPicture()
    let listResults = document.getElementById('resultList');
    listResults.innerHTML = "";
    let btn = document.getElementById('resetButton');
    btn.style.backgroundColor = 'rgb(186, 66, 10)';
}
//pushes construct into array
picsAvailable.push(new Image('bag', '/assets/bag.jpg'));
picsAvailable.push(new Image('banana', '/assets/banana.jpg'));
picsAvailable.push(new Image('bathroom', '/assets/bathroom.jpg'));
picsAvailable.push(new Image('boots', '/assets/boots.jpg'));
picsAvailable.push(new Image('breakfast', '/assets/breakfast.jpg'));
picsAvailable.push(new Image('bubblegum', '/assets/bubblegum.jpg'));
picsAvailable.push(new Image('chair', '/assets/chair.jpg'));
picsAvailable.push(new Image('cthulhu', '/assets/cthulhu.jpg'));
picsAvailable.push(new Image('dog-duck', '/assets/dog-duck.jpg'));

let btn = document.getElementById('resetButton');
btn.style.backgroundColor = 'rgb(186, 66, 10)';
btn.style.color = 'white';
btn.style.border = '1px solid white';

let imgEls = document.querySelectorAll('img');
let voteTrackerEl = document.getElementById('contatinerImg');
let clickPic = ['click', '/assets/click.jpeg']
// console.log(picsAvailable);
// console.log(imgEls);


imgEls[0].src = clickPic[1];
imgEls[0].id = clickPic[0];
imgEls[1].src = clickPic[1];
imgEls[1].id = clickPic[0];
imgEls[2].src = clickPic[1];
imgEls[2].id = clickPic[0];

function generateRandomPic() {
    return Math.floor(Math.random() * picsAvailable.length);
}

function renderPicture(votingRounds) {

    let pic1 = picsAvailable[generateRandomPic()];
    let pic2 = picsAvailable[generateRandomPic()];
    let pic3 = picsAvailable[generateRandomPic()];
    let thankYouPic = ['thank-you', '/assets/thankYouImage.jpeg']
    let clickPic = ['click', '/assets/click.jpeg']
    console.log("Pictures to render", imgEls, pic1, pic2, pic3)

    while (pic1.nameImg === pic2.nameImg || pic3.nameImg === pic2.nameImg || pic1.nameImg === pic3.nameImg) {
        pic2 = picsAvailable[generateRandomPic()];
        pic3 = picsAvailable[generateRandomPic()]
    }
    console.log(votingRounds);
    if (votingRounds > 0) {
        pic1.shownCounter();
        pic2.shownCounter();
        pic3.shownCounter();
        imgEls[0].src = pic1.source;
        imgEls[0].id = pic1.nameImg;
        imgEls[1].src = pic2.source;
        imgEls[1].id = pic2.nameImg;
        imgEls[2].src = pic3.source;
        imgEls[2].id = pic3.nameImg;
    } else if (votingRounds <= 0) {
        console.log(votingRounds);
        imgEls[0].src = thankYouPic[1];
        imgEls[0].id = thankYouPic[0];
        imgEls[1].src = thankYouPic[1];
        imgEls[1].id = thankYouPic[0];
        imgEls[2].src = thankYouPic[1];
        imgEls[2].id = thankYouPic[0];
    } else {
        imgEls[0].src = clickPic[1];
        imgEls[0].id = clickPic[0];
        imgEls[1].src = clickPic[1];
        imgEls[1].id = clickPic[0];
        imgEls[2].src = clickPic[1];
        imgEls[2].id = clickPic[0];
    }



}



let eventID = voteTrackerEl.addEventListener('click', function (evt) {
    console.log(evt.target); // EVENT.TARGET ALWAYS REPRESENTS THE EXACT ELEMENT WHERE AN EVENT OCCURRED

    //identify which image it was clicked on
    if (votingRounds > 0) {
        let pictureClicked = evt.target.id;
        picsAvailable.forEach(image => {
            if (image.nameImg === pictureClicked) {
                image.timeClicked += 1;
            }
        })
    }
    console.log(picsAvailable);
    //re-render new goat images -> random goat image from picsAvailable

    votingRounds--;
    console.log(votingRounds);
    renderPicture(votingRounds);

    if (votingRounds <= 0) {
        let btn = document.getElementById('resetButton');
        btn.style.backgroundColor = 'rgb(110, 255, 163)';
    }


})

let formInputEl = document.getElementById('formInput');

formInputEl.addEventListener('submit', function (evt) {
    evt.preventDefault();
    console.log(evt);
    let numbSelected = parseInt(evt.srcElement[1].value);
    // debugger;
    // console.log(numbSelected);
    picsAvailable.forEach(pictureObject => {
        pictureObject.reset();
    })
    return votingRounds = numbSelected + 1;
})

let formResultEl = document.getElementById('resultForm');
formResultEl.addEventListener('submit', function (evt) {
    evt.preventDefault();
    // debugger;
    let x = picsAvailable;
    let listResults = document.getElementById('resultList');
    console.log(listResults);
    listResults.innerHTML = "";
    console.log(votingRounds);
    if (votingRounds <= 0) {
        picsAvailable.forEach(picture => {
            let listItem = document.createElement('li');
            listItem.textContent = `${picture.nameImg} had ${picture.timeClicked} votes, and was seen ${picture.shownTimes} times.`;
            listResults.appendChild(listItem);
            // debugger;
        })
    }
});

