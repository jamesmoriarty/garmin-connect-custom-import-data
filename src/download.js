import React, { useState } from "react";
import ReactDOMServer from 'react-dom/server'

export default function Download() {
    const [date, setDate] = useState(getCurrentDate());
    const [time, setTime] = useState(getCurrentTime());
    const [age, setAge] = useState(37);
    const [height, setHeight] = useState(170);
    const [weight, setWeight] = useState(75);
    const [bmi, setBMI] = useState(25);
    const [fat, setFat] = useState(22);

    function getCurrentDate() {
        const currentDate = new Date();
        return currentDate.toLocaleDateString("en-NZ")
    }

    function getCurrentTime() {
        const currentDate = new Date();
        return currentDate.toLocaleTimeString("en-NZ", { hour12: false })
    }

    function getBMI(weight, height) {
        return Math.round(weight / ((height / 100) ^ 2))
    }

    function getFat(bmi, age) {
        return Math.round((1.20 * bmi) + (0.23 * age) - 16.2)
    }

    function changeAge(age) {
        setAge(age)
        setFat(getFat(bmi, age))
    }

    function changeHeight(height) {
        setHeight(height)
        changeBMI(getBMI(weight, height))
    }

    function changeWeight(weight) {
        setWeight(weight)
        changeBMI(getBMI(weight, height))
    }

    function changeBMI(bmi) {
        setBMI(bmi)
        setFat(getFat(bmi, age))
    }

    function getOutput() {
        return <code>
            Body{"\n"}
            date,time,weight,bmi,fat{"\n"}
            {date},{time},{weight},{bmi},{fat}{"\n"}
        </code>
    }

    function getDataHREF() {
        const regex = /<[^>]*>/gm;
        return "data:text/plain;base64," + btoa(ReactDOMServer.renderToString(getOutput()).replace(regex, ""))
    }

    return (
        <form>
            <div>
                <label for="date">Date:
                    <input name="date" value={date} onChange={e => setDate(e.target.value)} />
                </label>
            </div>
            <div>
                <label for="time">Time:
                    <input name="time" value={time} onChange={e => setTime(e.target.value)} />
                </label>
            </div>
            <div>
                <label for="age">Age:
                    <input name="age" value={age} onChange={e => changeAge(Number(e.target.value))} />
                </label>
            </div>

            <div>
                <label for="height">Height (cm):
                    <input name="height" value={height} onChange={e => changeHeight(Number(e.target.value))} />
                </label>
            </div>

            <div>
                <label for="weight">Weight (kg):
                    <input name="weight" value={weight} onChange={e => changeWeight(Number(e.target.value))} />
                </label>
            </div>

            <div>
                <label for="bmi">BMI:
                    <input name="bmi" value={bmi} onChange={e => changeBMI(Number(e.target.value))} />
                </label>
            </div>

            <div>
                <label for="fat">Fat (%):
                    <input name="fat" value={fat} onChange={e => setFat(e.target.value)} />
                </label>
            </div>

            <hr />

            <div>
                <label for="preview">Preview:</label>
                <pre>
                    {getOutput()}
                </pre>
            </div>

            <a role="button" href={getDataHREF()} download="weight.csv">Download</a>

            <hr />

            <a class="secondary" role="button" href="https://connect.garmin.com/modern/import-data" target="_blank" rel="noreferrer">Import Data</a>

            <hr />
        </form>
    );
}