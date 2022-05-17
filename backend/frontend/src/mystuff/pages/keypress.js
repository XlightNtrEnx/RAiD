import React, { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import Cookies from "js-cookie";

export default function KeypressPage() {
    const { handleSubmit, register, control } = useForm();
    const onError = (errors, e) => console.log(errors, e);
    var data = retrieveAllKeys();

    function retrieveAllKeys() {
        function convertColumnToString(arrayOfObjects) {
            for (let i=0;i<arrayOfObjects.length;i++) {
                arrayOfObjects[i].available_for_loan = arrayOfObjects[i].available_for_loan.toString()
            }
            return arrayOfObjects
        }
        const data = fetch('/api/keys').then(response => response.json()).then(result => convertColumnToString(result))
        return data
    }

    function onSubmit(event, e) {
        console.log(event.code);
        const url='/api/keys/'
        if (event.code === "") {
            window.alert("No empty bookings!")
        } else {
            data.then((data) => {
                console.log("thenning");
                for (let i=0;i<data.length;i++) {
                    console.log("looping")
                    if (data[i].code === event.code) {
                        if (data[i].available_for_loan === "true") {
                            event.available_for_loan = false
                        } else if (data[i].available_for_loan === "false") {
                            event.available_for_loan = true
                        } 
                    } 
                }
            }).then(()=>{
                fetch(
                    url.concat(event.code.concat("/")), 
                    { method: 'PATCH',
                    body: JSON.stringify(event),
                    headers: {'Content-Type': 'application/json',
                                'X-CSRFToken': Cookies.get("csrftoken")}}
                ).then(response => response.json())
                .then(() => window.alert(JSON.stringify(event.code)))
                .then(() => window.location.reload())})
        }
    }

    function DynamicallyChangingText({ control }) {
        const code = useWatch({
            control,
            name: "code",
            defaultValue: "",
        });
        return <span>{code.length}</span>;
    }

    return (
        <div className='Key' class="center">
            <h1>Remember to record significant events! </h1>
            <Table
            headers = {["Code", "Name", "Available for booking?"]}
            data = {data}
            fieldIdentifiers = {["code", "name", "available_for_loan"]}
            >
            </Table>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <TextField
                    placeholder="Record down a booking"
                    fullWidth = {true}
                    inputProps = {register("code")}
                >
                </TextField>
                <DynamicallyChangingText control={control}/>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );    
}   

function Table(props) {

    function Thead(props) {
        const headers = props.headers.map((headers) => <th>{headers}</th>)
        return (
            <thead>
                <tr>
                    {headers}
                </tr>
            </thead>
        )
    }

    function Tbody(props) {
        const [rows, setRows] = useState([]);
        const fieldIdentifiersArrayLength = props.fieldIdentifiers.length
        useEffect(() => {props.data.then(data => createTemporaryRows(data)).then(result => setRows(result))}, []);
        function createTemporaryRows(arrayOfObjects) {
            const temporaryRows = [];
            for (let i=0;i<arrayOfObjects.length;i++) {
                let objectBeingWorkedOn = arrayOfObjects[i]
                console.log(objectBeingWorkedOn)
                let randomArray = []
                for (let x=0;x<fieldIdentifiersArrayLength;x++) {
                    randomArray.push(
                        <td>{objectBeingWorkedOn[props.fieldIdentifiers[x]]}</td>
                    )
                }
                temporaryRows.push(
                    <tr>
                        {randomArray}
                    </tr>
                )
            }
            return temporaryRows
        }
        return (
            <tbody>
                {rows}
            </tbody>
        )
    }

    return (
        <table class="center">
            <Thead headers = {props.headers} />
            <Tbody 
                data = {props.data}
                fieldIdentifiers = {props.fieldIdentifiers}
            />
        </table>
    )
}