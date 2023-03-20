'use strict';


let votingRounds = 5; //25

function Image(nameImg, source) {
    this.nameImg = nameImg
    this.timeClicked = 0;
    this.shownTimes = 0;
    this.source = source;
}

Image.prototype.shownCounter = function() {
    this.shownTimes++;
}

let picSourceArr = [
['bag', '/assets/bag.jpg'],
['banana', '/assets/banana.jpg'],
['bathroom', '/assets/bathroom.jpg'],
['boots', '/assets/boots.jpg'],
['breakfast', '/assets/breakfast.jpg'],
['bubblegum', '/assets/bubblegum.jpg'],
['chair', '/assets/chair.jpg'],
['cthulhu', '/assets/cthulhu.jpg'],
['dog-duck', '/assets/dog-duck.jpg']];

let picObjArray = []

picSourceArr.forEach(picSource => {
    picObjArray.push(new Image(picSource[0],picSource[1]));
})

console.log(picObjArray);

let imgEls = document.querySelectorAll('img');
let voteTrackerEl = document.getElementById('container');

console.log(picObjArray);
console.log(imgEls);

renderPicture();

function generateRandomPic() {
    return Math.floor(Math.random() * picSourceArr.length);
}

function renderPicture() {

    let pic1 = picSourceArr[generateRandomPic()][0];
    let pic2 = picSourceArr[generateRandomPic()][0];
    let pic3 = picSourceArr[generateRandomPic()][0];
    // debugger;
    console.log("Pictures to render", imgEls, pic1, pic2, pic3)

    while (pic1.nameImg === pic2.nameImg || pic3.nameImg === pic2.nameImg || pic1.nameImg === pic3.nameImg) {
        pic2 = picSourceArr[generateRandomPic()][0];
        pic3 = picSourceArr[generateRandomPic()][0];
    }

    imgEls[0].src = pic1.source;
    imgEls[0].id = pic1.nameImg;
    imgEls[1].src = pic2.source;
    imgEls[1].id = pic2.nameImg;
    imgEls[2].src = pic3.source;
    imgEls[2].id = pic3.nameImg;

}

let eventID = voteTrackerEl.addEventListener('click', function (evt) {
    console.log(evt.target); // EVENT.TARGET ALWAYS REPRESENTS THE EXACT ELEMENT WHERE AN EVENT OCCURRED

    //identify which image it was clicked on
    let pictureClicked = evt.target.id;
    picsAvailable.forEach(image => {
        if (image.nameImg === pictureClicked) {
            image.timeClicked += 1;
        }
    })
    console.log(picObjArray);
    //re-render new goat images -> random goat image from picsAvailable
 
  if(votingRounds) {
    //renderPicture();
    votingRounds--;
} else {
    voteTrackerEl.removeEventListener('click', eventID);
}
})