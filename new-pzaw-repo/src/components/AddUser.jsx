import React, {useState} from "react";
import Card from '../UI/Card';
import Button from "../UI/Button";
import classes from './AddUser.module.css';

function AddUser(){

    const [name, setName] = useState('')
    const [age, setAge] = useState('')

    function nameChangeHandler(event){
        setName(event.target.value)
    }

    function ageChangeHandler(event){
        setAge(event.target.value)
    }

    function addUserHandler(event){
        event.preventDefault();
        console.log(name, age)
        setAge('')
        setName('')
    }

    return(
        <Card className={classes.input}>
            <form onSubmit={addUserHandler}>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" onChange={nameChangeHandler} value={name}></input>

                <label htmlFor="age">Age</label>
                <input id="age" type="Number" onChange={ageChangeHandler} value={age}></input>

                <Button type="submit">Add user</Button>
            </form>
        </Card>
    );
}

export default AddUser