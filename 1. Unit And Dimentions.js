const category_dict = {
    "fundamentals"              :   ["Length", "Mass", "Time", "Current", "Temperature", "Amount of substance", "Luminous intensity"],
    "supplementary quantities"  :   ["Plane angle", "Solid angle", "Radioactivity"],
    "derived quantities"        :   ["Area", "Volume", "Velocity", "Acceleration", "Force", "Density", "Angle", "Strain", "Relative", "Angular velocity", "Universal gravitational constant", "Coefficient of viscosity"]
}

const units_dict = {
    "length"                    :   ["meter", "m", "L", "fundamentals"],
    "mass"                      :   ["kilogram" , "kg", "M", "fundamentals"],
    "time"                      :   ["second", "s", "T", "fundamentals"],
    "current"                   :   ["ampere", "A", "I", "fundamentals"],
    "temperature"               :   ["kelvin", "K", "θ", "fundamentals"],
    "amount of substance"       :   ["mole", "mol", "N", "fundamentals"],
    "luminous intensity"        :   ["candela", "cd", "none", "fundamentals"],
    "plane angle"               :   ["radian", "rad", "none", "supplementary quantities"],
    "solid angle"               :   ["steradian", "sr", "none", "supplementary quantities"],
    "radioactivity"             :   ["bequral", "Bq", "T\u207b\u00b9", "supplementary quantities"],
    "area"                      :   ["square meter", "m\u00b2", "L\u00b2", "derived quantities"],
    "volume"                    :   ["cubic meter" ,"m\u00b3", "L\u00b3", "derived quantities"],
    "velocity"                  :   ["meters per second", "ms\u207b\u00b9","LT\u207b\u00b9", "derived quantities"],
    "acceleration"              :   ["meters per square second", "ms\u207b\u00b2", "LT\u207b\u00b2", "derived quantities"],
    "force"                     :   ["kilogram meters per square second", "kgms\u207b\u00b2 = N", "MLT\u207b\u00b2", "derived quantities"],
    "density"                   :   ["kilogram meters per cubic second", "kgms\u207b\u00b3", "ML\u207b\u00b3", "derived quantities"],
    "angle"                     :   ["radian", "rad", "none", "derived quantities"],
    "strain"                    :   ["none", "none", "none", "derived quantities"],
    "relative"                  :   ["none", "none", "none", "derived quantities"],
    "angular velocity"          :   ["radian per second", "rad s\u207b\u00b9", "T\u207b\u00b9", "derived quantities"],
    "universal gravitational constant"  :   ["newton square meters per square kilogram", "N m\u00b2 kg\u207b\u00b2", "M\u207b\u00b9L\u00b3T\u207b\u00b2", "derived quantities"],
    "coefficient of viscosity"  :   ["newton second per square meters", "Nsm\u207b\u00b2", "ML\u207b\u00b9T\u207b\u00b9", "derived quantities"]
}

function hideResults()  {
    document.getElementById("results").style.display = "none";
    document.getElementById("relResults").style.display = "none";
    document.getElementById("ErrDiv").style.display = "none";
}

function searchParams() {
    let params = new URLSearchParams(location.search);
    searchTxtUrl = params.get('search')
    if (searchTxtUrl != null) {
        document.getElementById("search").value = searchTxtUrl;
        startSearch();
    }
}

function relatedSearch(category)    {
    rUnits = category_dict[category];
    let relRText = "";
    for (let i = 0; i < rUnits.length; i++) {
        var url = window.location.href.replace(window.location.search,'');        
        relRText += `<a href="${url}?search=${rUnits[i]}">${rUnits[i]}</a> . `;
    }
    document.getElementById("relRPara").innerHTML = relRText
    document.getElementById("relResults").style.display = "block";
}

function startSearch()  {
    hideResults()
    var searchText = document.getElementById("search").value.toLowerCase();
    unit =  units_dict[searchText]
    if (!(unit == undefined))  {
        let RpQty = searchText[0].toUpperCase() + searchText.slice(1); // Capitalize first Letter
        
        document.getElementById("RHeading").innerHTML = "Physical Quantity: " + RpQty;
        document.getElementById("RPara1").innerHTML = "Unit: " + unit[0];
        document.getElementById("RPara1").innerHTML = "Symbol: " + unit[1];
        document.getElementById("RPara2").innerHTML = "Dimention: " + unit[2];
        document.getElementById("RPara3").innerHTML = "Category: " + unit[3];
        document.getElementById("results").style.display = "block";
        
        relatedSearch(unit[3])
    }
    else    {
        console.log(unit)
        document.getElementById("ErrPara").innerHTML = `Did you make a Typo? \"${searchText}\" was not found.`
        document.getElementById("ErrDiv").style.display = "block";
    }
} 