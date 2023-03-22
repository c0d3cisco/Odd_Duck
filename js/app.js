'use strict';

const picsAvailable = []; //initializes array of Objects
let votingRounds = 26; //default is 25, but need to start at 26 since initiating the test counts as a votingRound
let chartObj = null;
let labels = [];
let shownValues = [];
let clickedValues = [];
let storedViews = readData('storedViews');
let storedClicks = readData('storedClicks');
let preventMultipleAdds = 0;


// let storedViews = [1,2,3,4,5,6,7,8,9,1,1,2,3,4,5,6,7,8,9];
// let storedClicks = [1,2,3,4,5,6,7,8,9,1,1,2,3,4,5,6,7,8,9];



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
Image.prototype.resetAction = function () {
    // voteTrackerEl.addEventListener('click', handleButtonClick);
    this.timeClicked = 0;
    this.shownTimes = 0;
    // renderPicture()
    // let listResults = document.getElementById('resultList');
    // listResults.innerHTML = "";
    // let btn = document.getElementById('resetButton');
    // btn.style.backgroundColor = 'rgb(120, 120, 120)';
    // document.getElementById('draw-on-me').innerHTML = '';
    // drawingContext.clearRect(0, 0, canvasEl.width, canvasEl.height);
}
//pushes construct into array
picsAvailable.push(new Image('bag', 'assets/bag.jpg'));
picsAvailable.push(new Image('banana', 'assets/banana.jpg'));
picsAvailable.push(new Image('bathroom', 'assets/bathroom.jpg'));
picsAvailable.push(new Image('boots', 'assets/boots.jpg'));
picsAvailable.push(new Image('breakfast', 'assets/breakfast.jpg'));
picsAvailable.push(new Image('bubblegum', 'assets/bubblegum.jpg'));
picsAvailable.push(new Image('chair', 'assets/chair.jpg'));
picsAvailable.push(new Image('cthulhu', 'assets/cthulhu.jpg'));
picsAvailable.push(new Image('dog-duck', 'assets/dog-duck.jpg'));
picsAvailable.push(new Image('dragon', 'assets/dragon.jpg'));
picsAvailable.push(new Image('pen', 'assets/pen.jpg'));
picsAvailable.push(new Image('pet-sweep', 'assets/pet-sweep.jpg'));
picsAvailable.push(new Image('scissors', 'assets/scissors.jpg'));
picsAvailable.push(new Image('shark', 'assets/shark.jpg'));
picsAvailable.push(new Image('sweep', 'assets/sweep.png'));
picsAvailable.push(new Image('tauntaun', 'assets/tauntaun.jpg'));
picsAvailable.push(new Image('unicorn', 'assets/unicorn.jpg'));
picsAvailable.push(new Image('water-can', 'assets/water-can.jpg'));
picsAvailable.push(new Image('wine-glass', 'assets/wine-glass.jpg'));

picsAvailable.forEach(distinctValue => {
        labels.push(distinctValue.nameImg);
});

let btn = document.getElementById('resetButton');
btn.style.backgroundColor = 'rgb(120, 120, 120)';
// btn.style.color = 'black';
// btn.style.border = '1px solid black';

let imgEls = document.querySelectorAll('img');
let voteTrackerEl = document.getElementById('contatinerImg');
let clickPic = ['click', 'assets/click.jpeg']
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

function renderPicture(votingRounds) {// renders picture first round? Not update? MIGHT BE GOOD FOR WRITING LOCAL DATA

    let pic1 = picsAvailable[generateRandomPic()];
    let pic2 = picsAvailable[generateRandomPic()];
    let pic3 = picsAvailable[generateRandomPic()];
    let thankYouPic = ['thank-you', 'assets/thankYouImage.jpeg']
    let clickPic = ['click', 'assets/click.jpeg']

    let pic1Capture = pic1;
    let pic2Capture = pic2;
    let pic3Capture = pic3;

    while (pic1.nameImg === pic2.nameImg || pic3.nameImg === pic2.nameImg || pic1.nameImg === pic3.nameImg || imgEls[0].id === pic1.nameImg || imgEls[0].id === pic2.nameImg || imgEls[0].id === pic3.nameImg || imgEls[1].id === pic1.nameImg || imgEls[1].id === pic2.nameImg || imgEls[1].id === pic3.nameImg || imgEls[2].id === pic1.nameImg || imgEls[2].id === pic2.nameImg || imgEls[2].id === pic3.nameImg) {
        pic1 = picsAvailable[generateRandomPic()]
        pic2 = picsAvailable[generateRandomPic()];
        pic3 = picsAvailable[generateRandomPic()];
    }
    // console.log('FINAL  ', imgEls[0].id, imgEls[1].id, imgEls[2].id, ' COMPARE ', pic1.nameImg, pic2.nameImg, pic3.nameImg);
    //console.log("Pictures to render", imgEls, pic1, pic2, pic3)

    //console.log(votingRounds);
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
        preventMultipleAdds = 0;
    } else if (votingRounds <= 0) {
        //console.log(votingRounds);
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

voteTrackerEl.addEventListener('click', handleButtonClick);

function handleButtonClick(evt) {
    //console.log(evt.target); // EVENT.TARGET ALWAYS REPRESENTS THE EXACT ELEMENT WHERE AN EVENT OCCURRED

    //identify which image it was clicked on
    if (votingRounds > 0) {
        let pictureClicked = evt.target.id;
        picsAvailable.forEach(image => {
            if (image.nameImg === pictureClicked) {
                image.timeClicked += 1;
            }
        })
    }
    //console.log(picsAvailable);
    //re-render new goat images -> random goat image from picsAvailable

    votingRounds--;
    //console.log(votingRounds);
    renderPicture(votingRounds);

    let btn = document.getElementById('resetButton'); // no need to be here, could be outside, doesnt matter.
    if (votingRounds===0) {
        btn.style.backgroundColor = 'rgb(0, 163, 79)';
        voteTrackerEl.removeEventListener('click', handleButtonClick);
    }
};

let formInputEl = document.getElementById('formInput');

formInputEl.addEventListener('submit', handleInputClick)

function handleInputClick(evt) { // saves numerical input 
    evt.preventDefault();
    //console.log(evt);
    let numbSelected = parseInt(evt.srcElement[1].value); // WHY DO I NEED TO USE srcElement[1]
    // debugger;
    // console.log(numbSelected);
    picsAvailable.forEach(pictureObject => {
        pictureObject.resetAction();
    })
    renderPicture()
    let listResults = document.getElementById('resultList');
    listResults.innerHTML = "";
    let btn = document.getElementById('resetButton');
    btn.style.backgroundColor = 'rgb(120, 120, 120)';
    document.getElementById('draw-on-me').innerHTML = '';
    voteTrackerEl.addEventListener('click', handleButtonClick);
    console.log(votingRounds);
    //debugger;
    
    return votingRounds = numbSelected + 1; // this one accounts for the starting screen
}

let formResultEl = document.getElementById('resultForm');
formResultEl.addEventListener('submit', loadForm);
function loadForm(evt) {
    evt.preventDefault();
    let listResults = document.getElementById('resultList');
    //console.log(listResults);
    listResults.innerHTML = "";
    //console.log(votingRounds);
    let chartContainer = document.getElementById('canvas-container');
    if (votingRounds <= 0 && preventMultipleAdds === 0) {
        storedViews = readData('storedViews');
        storedClicks = readData('storedClicks');
        arrayAccumulation(storedViews, storedClicks);
        if (chartObj === null) {
            chartObj = drawChart(labels, storedViews, storedClicks);
            chartContainer.style.backgroundColor = 'white';
        } else {
            console.log(storedViews, storedClicks);
            // debugger;
            updateChart(storedViews, storedClicks);
        }
        //console.log("CHART OBJECT TO UPDATE", chartObj);
        picsAvailable.forEach(picture => {
            let listItem = document.createElement('li');
            listItem.textContent = `${picture.nameImg} had ${picture.timeClicked} votes, and was seen ${picture.shownTimes} times.`;
            listResults.appendChild(listItem);
            // debugger;
        })
        return preventMultipleAdds = 1;
    }
};


const canvasEl = document.getElementById('draw-on-me');

function drawChart(labels, storedViews, storedClicks) {

    return new Chart(canvasEl, {
        type: 'bar',
        data: {
            labels: labels, //HARD CODE THIS
            datasets: [{
                label: 'Times Seen',
                data: storedViews,//shownValues,
                borderWidth: 1,
                backgroundColor: 'rgba(252, 186, 3, 0.5)',
            }, {
                label: 'Times Clicks',
                data: storedClicks, //clickedValues,
                borderWidth: 1,
                backgroundColor: 'rgba(252, 90, 3, 0.5)',
            }]
        },
        options: {
            indexAxis: 'y',
            elements: {
                bar: {
                    borderWidth: 2,
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: 'Total Views vs Total Clicks per Image'
                }
            }
        },
    });
}

// function getArrayViews_Clicks(picsAvailable, labels, shownValues, clickedValues) {
//     picsAvailable.forEach(distinctValue => {
//         labels.push(distinctValue.nameImg);
//         shownValues.push(distinctValue.shownTimes);
//         clickedValues.push(distinctValue.timeClicked);
//     })
// };

function updateChart(storedViews, storedClicks) {
    // console.log("CHART OBJECT TO UPDATE", chartObj.data);


    chartObj.data.datasets[0].data = storedViews;
    chartObj.data.datasets[1].data = storedClicks;
    chartObj.update();
};

let resetButton = document.getElementById('resetLocal');

resetButton.addEventListener('click', resetLocalStorage)
function resetLocalStorage(evt){
    evt.preventDefault();
    let storedViews = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    let storedClicks = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    writeData('storedViews', storedViews);
    writeData('storedClicks', storedClicks);
    updateChart(storedViews, storedClicks);
    storedViews = readData('storedViews');
    storedClicks = readData('storedClicks');
    console.log('IM CLEARING' + readData('storedViews'))
    return storedViews, storedClicks;
}

function writeData (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};

function readData (key) {
    return JSON.parse (localStorage.getItem (key));
};









function  arrayAccumulation(storedViews, storedClicks){
    // debugger;

    if (storedViews === null || storedClicks === null){
        resetLocalArray();
        console.log('FIRST DRAW AFTER REFRESH' + storedViews);
        console.log('FIRST DRAW AFTER REFRESH' + storedClicks);
    }

    let shownValues = [];
    let clickedValues = [];
    picsAvailable.forEach(distinctValue => {
        shownValues.push(distinctValue.shownTimes);
        clickedValues.push(distinctValue.timeClicked);
    });
    // debugger;
    for(let i = 0; i<storedViews.length; i++){
        storedViews[i] = shownValues[i] + storedViews[i];
        storedClicks[i] = clickedValues[i] + storedClicks[i];
    }
    writeData('storedViews', storedViews);
    writeData('storedClicks', storedClicks);
    return storedViews, storedClicks;
};




// currentClickArray
// currentCountArray
// picsAvailable.forEach(picture)
// finalCountArray
// finalClickArray



function resetLocalArray(){
    let storedViews = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    let storedClicks = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    writeData('storedViews', storedViews);
    writeData('storedClicks', storedClicks);


    return storedViews, storedClicks;
}

// let storedViews = readData('storedViews');
// let storedClicks = readData('storedClicks');



//this will get the count for the current round 

    // getArrayViews_Clicks(picsAvailable, labels, shownValues, clickedValues);
    
    // picsAvailable.forEach(distinctValue => {
        //     labels.push(distinctValue.nameImg);
        //     shownValues.push(distinctValue.shownTimes);
        //     clickedValues.push(distinctValue.timeClicked);
        // });









