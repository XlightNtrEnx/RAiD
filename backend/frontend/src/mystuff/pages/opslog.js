import React, { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import Cookies from "js-cookie";

export default function Opslog() {
    const { handleSubmit, register, control } = useForm();
    const onError = (errors, e) => console.log(errors, e);

    function retrieveAllOpslogRecords() {
        const data = fetch('/api/opslogrecords').then(response => response.json()).then(data => convertAllDateTimesToLocaleString(data));
        function convertAllDateTimesToLocaleString(data) {
            const d = new Date();
            for (let i=0;i<data.length;i++) {
                const dateObject = new Date(data[i]['created']);
                data[i]['created'] = dateObject.toString();
            }
            return data
        }
        return data
    }

    function onSubmit(data, e) {
        console.log(data.event.value)
        if (data.event.value === undefined) {
            window.alert("No empty events!")
        } else {
            fetch(
                '/api/opslogrecords/', 
                { method: 'POST',
                  body: JSON.stringify(data),
                  headers: {'Content-Type': 'application/json',
                            'X-CSRFToken': Cookies.get("csrftoken")}}
            ).then(response => response.json())
            .then(() => window.alert(JSON.stringify(data.event.value)))
            .then(() => window.location.reload())
        }
    }

    function Child({ control }) {
        const event = useWatch({
            control,
            name: "event",
            defaultValue: "",
        });
        return <span>{event.length}</span>;
    }

    return (
        <div className='Opslog' class="center">
            <h1>Remember to record significant events!</h1>
            <Table
            headers = {["Created", "Event", "Author"]}
            dataFetcher = {retrieveAllOpslogRecords}
            fieldIdentifiers = {["created", "event", "full_name"]}
            >
            </Table>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <TextField
                    placeholder="Record down an event"
                    fullWidth = {true}
                    inputProps = {register("event")}
                >
                </TextField>
                <Child control={control}/>
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
        useEffect(() => {props.dataFetcher().then(data => createTemporaryRows(data)).then(result => setRows(result))}, []);
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
                dataFetcher = {props.dataFetcher}
                fieldIdentifiers = {props.fieldIdentifiers}
            />
        </table>
    )
}

