let suggestions = [
    "Itching","Skin Rash","Nodal Skin Eruptions","Continuous Sneezing",	"Shivering","Chills", "Joint Pain",	"Stomach Pain", "Acidity", "Ulcers On Tongue",	"Muscle Wasting", "Vomiting", "Burning Micturition", "Spotting  Urination", "Fatigue", "Weight Gain",	"Anxiety",	"Cold Hands And Feets", "Mood Swings",	"Weight Loss",	"Restlessness",	"Lethargy", "Patches In Throat",	"Irregular Sugar Level",	"Cough",	"High Fever",	"Sunken Eyes",	"Breathlessness",	"Sweating",	"Dehydration",	"Indigestion",	"Headache",	"Yellowish Skin",	"Dark Urine",	"Nausea",	"Loss Of Appetite",	"Pain Behind The Eyes",	"Back Pain", 	"Constipation",	"Abdominal Pain",	"Diarrhoea",	"Mild Fever", "Yellow Urine",	"Yellowing Of Eyes",	"Acute Liver Failure",	"Fluid Overload",	"Swelling Of Stomach",	"Swelled Lymph Nodes",	"Malaise",	"Blurred And Distorted Vision",	"Phlegm",	"Throat Irritation",	"Redness Of Eyes",	"Sinus Pressure",	"Runny Nose",	"Congestion",	"Chest Pain",	"Weakness In Limbs",	"Fast Heart Rate",	"Pain During Bowel Movements",	"Pain In Anal Region",	"Bloody Stool",	"Irritation In Anus",	"Neck Pain","Dizziness",	"Cramps",	"Bruising",	"Obesity",	"Swollen Legs",	"Swollen Blood Vessels",	"Puffy Face And Eyes",	"Enlarged Thyroid",	"Brittle Nails",	"Swollen Extremeties",	"Excessive Hunger",	"Extra Marital Contacts",	"Drying And Tingling Lips",	"Slurred Speech",	"Knee Pain",	"Hip Joint Pain","Muscle Weakness",	"Stiff Neck",	"Swelling Joints",	"Movement Stiffness",	"Spinning Movements",	"Loss Of Balance",	"Unsteadiness",	"Weakness Of One Body Side",	"Loss Of Smell",	"Bladder Discomfort","Foul Smell Of Urine", "Continuous Feel Of Urine",	"Passage Of Gases",	"Internal Itching",	"Toxic Look (typhos)",	"Depression",	"Irritability",	"Muscle Pain",	"Altered Sensorium", "Red Spots Over Body",	"Belly Pain",	"Abnormal Menstruation",	"Dischromic  Patches",	"Watering From Eyes",	"Increased Appetite",	"Polyuria",	"Family History",	"Mucoid Sputum",	"Rusty Sputum",	"Lack Of Concentration",	"Visual Disturbances",	"Receiving Blood Transfusion",	"Receiving Unsterile Injections",	"Coma",	"Stomach Bleeding",	"Distention Of Abdomen",	"History Of Alcohol Consumption",	"Fluid Overload",	"Blood In Sputum",	"Prominent Veins On Calf",	"Palpitations",	"Painful Walking",	"Pus Filled Pimples",	"Blackheads",	"Scurring",	"Skin Peeling",	"Silver Like Dusting",	"Small Dents In Nails",	"Inflammatory Nails",	"Blister",	"Red Sore Around Nose",	"Yellow Crust Ooze",	"Prognosis"

];
const searchWrapper = document.querySelector(".search-input");
const textF = document.querySelector(".textF");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

// if user press any key and release
inputBox.onkeyup = (e)=>{
let userData = e.target.value; //user enetered data
let emptyArray = [];
if(userData){
    icon.onclick = ()=>{
        webLink = `https://www.google.com/search?q=${userData}`;
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
    emptyArray = suggestions.filter((data)=>{
        //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
        return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data)=>{
        // passing return data inside li tag
        return data = `<li>${data}</li>`;
    });
    searchWrapper.classList.add("active"); //show autocomplete box
    showSuggestions(emptyArray);
    let allList = suggBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
        //adding onclick attribute in all li tag
        allList[i].setAttribute("onclick", "select(this)");
    }
}else{
    searchWrapper.classList.remove("active"); //hide autocomplete box
}
}
let a=[]
let arr=''
function select(element){
let selectData = element.textContent;

arr+=selectData+','
// arr = arr.substring(0, arr.length - 1);
inputBox.value = selectData;
a.push(selectData)
textF.value=arr;
icon.onclick = ()=>{
    webLink = `https://www.google.com/search?q=${selectData}`;
    linkTag.setAttribute("href", webLink);
    linkTag.click();
}
searchWrapper.classList.remove("active");
}
console.log(a)
function showSuggestions(list){
let listData;
if(!list.length){
    userValue = inputBox.value;
    listData = `<li>${userValue}</li>`;
}else{
  listData = list.join('');
}
suggBox.innerHTML = listData;
}