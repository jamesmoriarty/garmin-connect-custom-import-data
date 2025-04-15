import React, { useState } from "react";
import ReactDOMServer from 'react-dom/server'

export default function Download() {
    const [date, setDate] = useState(getCurrentDate());
    const [time, setTime] = useState(getCurrentTime());
    const [age, setAge] = useState(37);
    const [height, setHeight] = useState(170);
    const [weight, setWeight] = useState(75);
    const [bmi, setBMI] = useState(getBMI());
    const [fat, setFat] = useState(getFat());
    
    function download(formData) {
    //   const query = formData.get("query");
      alert(`You searched for '${formData}'`);
    }

    function getCurrentDate() {
        const currentDate = new Date();
        return currentDate.toLocaleDateString("en-NZ")
    }

    function getCurrentTime() {
        const currentDate = new Date();
        return currentDate.toLocaleTimeString("en-NZ", { hour12: false })
    }

    function getBMI() {
        return weight / ( ( height / 100) ^ 2 )
    }

    function getFat() {
        return (1.20 * bmi) + (0.23 * age) - 16.2
    }

    function getOutput(){
        return <pre>
            Body{"\n"}
            date,time,weight,bmi,fat{"\n"}
            {date},{time},{weight},{bmi},{getFat()}{"\n"}
        </pre>
    }

    function getDataHREF() {
        const regex = /<[^>]*>/gm;
        return "data:text/plain;base64," + btoa(ReactDOMServer.renderToString(getOutput()).replace(regex, ""))
    }


    return (
      <form action={download}>
        <label for="date">Date:
            <input name="date" value={date} onChange={e => setDate(e.target.value)}/>
        </label>

        <label for="time">Time:
            <input name="time" value={time} onChange={e => setTime(e.target.value)}/>
        </label>

        <label for="age">Age:
            <input name="age" value={age} onChange={e => setAge(e.target.value)}/>
        </label>

        <label for="height">Height:
            <input name="height" value={height} onChange={e => setHeight(e.target.value)}/>
        </label>

        <label for="weight">Weight:
            <input name="weight" value={weight} onChange={e => setWeight(e.target.value)}/>
        </label>

        <label for="bmi">BMI:
            <input name="bmi" value={bmi} onChange={e => setBMI(e.target.value)}/>
        </label>

        <label for="fat">Fat:
            <input name="fat" value={fat} onChange={e => setFat(e.target.value)}/>
        </label>

        <hr />

        <pre>
            {getOutput()}
        </pre>

        <hr/>

        <a href={getDataHREF()} download="weight.csv">Download</a>

        <hr />

        <a href="https://connect.garmin.com/modern/import-data" target="_blank" rel="noreferrer">Import Data</a>
      </form>
    );
  }