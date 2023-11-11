/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Lance Curio Student ID: 104319223 Date: 2023-10-16
*
********************************************************************************/
const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

function initialize(){
    return new Promise((resolve, reject) =>{
        setData.forEach(setElement => {
            let theme = themeData.find((theme) => theme.id === setElement.theme_id);
            if(theme){
                setElement.theme = theme.name 
            }
            sets.push(setElement);
        });
        resolve(sets);
    })
}

function getAllSets(){
    return new Promise((resolve, reject) =>{
       resolve(sets);
    })
}

function getSetByNum(setNum){
    return new Promise((resolve, reject) =>{
        let result = sets.find((element) => element.set_num === setNum);
        if(result){
            resolve(result);
        }
        else{
            reject(`No match found`);
        }
    })
}

function getSetsByTheme(theme){
    return new Promise((resolve, reject) => {
        let themeLower = theme.toLowerCase();
        let result = sets.filter((element) => {
          let themeLowerCase = element.theme.toLowerCase();
          return themeLowerCase.includes(themeLower);
        });
        if (result.length > 0) {
          resolve(result);
        } else {
          reject(`No set found with theme containing "${theme}"`);
        }
      });
}

module.exports = {
    initialize,
    getAllSets,
    getSetByNum,
    getSetsByTheme
};