let times = [];
let timeChart = [];
let effectiveMPG = [];
let costsPerDay = [];
let costsPerYear = [];
let formattedCostsPerDay = [];
let formattedCostsPerYear = [];

let speed55 = document.getElementById("speed-55").getAttribute('data-mph');
let speed60 = document.getElementById("speed-60").getAttribute('data-mph');;
let speed65 = document.getElementById("speed-65").getAttribute('data-mph');;
let speed70 = document.getElementById("speed-70").getAttribute('data-mph');
let speed75 = document.getElementById("speed-75").getAttribute('data-mph');;
let speed80 = document.getElementById("speed-80").getAttribute('data-mph');;    


function createTimeChart(times, miles){

    let time55 = (miles / speed55);
    let time60 = (miles / speed60);
    let time65 = (miles / speed65);
    let time70 = (miles / speed70);
    let time75 = (miles / speed75);
    let time80 = (miles / speed80); 

    times.push(time55, time60, time65, time70, time75, time80);

    for (let i = 0; i < times.length; i++) {

        let minutes = times[i] * 60;
        let hours = (minutes / 60);
        console.log(minutes);
        let rhours = Math.floor(hours);
        let min = (hours - rhours) * 60;
        let rmin = Math.floor(min);
        let sec = (min - rmin) * 60;
        let rsec = Math.floor(sec);
        let convertedTime = (rhours < 10 ? "0" + rhours : rhours) + ":" + (rmin < 10 ? "0" + rmin : rmin) + ":" + (rsec < 10 ? rsec + "0" : rsec);
        timeChart.push(convertedTime);

    }

    return timeChart;
}

function createMPGChart(userMPG) {
    let drops = [0, .03, .08, .17, .23, .28]

    for (let i = 0; i < drops.length; i++) {

        let dropAmount = userMPG * drops[i];
        let dropFinal = userMPG - dropAmount;
        let dropConvert = Math.round(dropFinal * 10) /10;
        effectiveMPG.push(dropConvert);
    }

    return effectiveMPG;
}

function createCostPerDayChart(effectiveMPG, price, miles) {

    for (let i = 0; i < effectiveMPG.length; i++) {
        let costPerDay = Math.round(price / effectiveMPG[i] * miles * 100) / 100;
        costsPerDay.push(costPerDay);
    }

    return costsPerDay;
}

function createCostPerYearChart(costsPerDay) {

    for (let i = 0; i < costsPerDay.length; i++) {
        let costPerYear = Math.round(costsPerDay[i] * 365 * 100) / 100;
        costsPerYear.push(costPerYear);
    }

    return costsPerYear;
}

function costFormatting(costsPerDay, costsPerYear) {

    for (let i = 0; i < costsPerDay.length; i++) {
        formattedCostsPerDay.push("$" + costsPerDay[i]);
        formattedCostsPerYear.push("$" + costsPerYear[i]);
    }

    return formattedCostsPerDay, formattedCostsPerYear;
}

function clearArrays() {
    times = [];
    timeChart = [];
    effectiveMPG = [];
    costsPerDay = [];
    costsPerYear = [];
    formattedCostsPerDay = [];
    formattedCostsPerYear = [];
}

function addTableColumns(array) {
    jQuery('#time-tr td').empty();
    jQuery('#mpg-tr td').empty();
    jQuery('#cost-day-tr td').empty();
    jQuery('#cost-year-tr td').empty();

    for (let i = 0; i < timeChart.length; i++) {
        if (timeChart.length[i] == jQuery('#time-tr td').length[i]) {
            jQuery('#time-tr td')[i].append(timeChart[i]);
        }
    }

    for (let i = 0; i < timeChart.length; i++) {
        if (effectiveMPG.length[i] == jQuery('#mpg-tr td').length[i]) {
            jQuery('#mpg-tr td')[i].append(effectiveMPG[i]);
        }
    }

    for (let i = 0; i < timeChart.length; i++) {
        if (formattedCostsPerDay.length[i] == jQuery('#cost-day-tr td').length[i]) {
            jQuery('#cost-day-tr td')[i].append(formattedCostsPerDay[i]);
        }
    }

    for (let i = 0; i < timeChart.length; i++) {
        if (formattedCostsPerYear.length[i] == jQuery('#cost-year-tr td').length[i]) {
            jQuery('#cost-year-tr td')[i].append(formattedCostsPerYear[i]);
        }
    }
}

function userSubmit() {

    jQuery('#fuel-submit-button').click(function(e){
        e.preventDefault();

        //Set up variables and arrays
        let userMPG = document.getElementById("mpg").value;
        let miles = document.getElementById("miles").value;
        let price = document.getElementById("price").value;
     
        createTimeChart(times, miles);
        createMPGChart(userMPG);
        createCostPerDayChart(effectiveMPG, price, miles);
        createCostPerYearChart(costsPerDay);
        costFormatting(costsPerDay, costsPerYear)

        addTableColumns(timeChart, effectiveMPG, formattedCostsPerDay, formattedCostsPerYear);

        // Reset arrays when user submits new form values
        clearArrays();
    })

}

function embedClick() {
    jQuery('#calc-embed-button').click(function() {
        jQuery('.calc-embed-code').css('display', 'block');
    })

    jQuery(document).mouseup(function (e) { 
        if (jQuery(e.target).closest("#calc-embed-code").length 
                    === 0) { 
            jQuery("#calc-embed-code").css('display', 'none'); 
        } 
    });
}

jQuery(userSubmit);
jQuery(embedClick);


