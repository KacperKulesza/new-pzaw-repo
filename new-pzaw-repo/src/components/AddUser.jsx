import React from "react";

function AddUser(){
    return(
        <form>
            <label htmlFor="username">Username</label>
            <input id="username" type="text"></input>

            <label htmlFor="age">Age</label>
            <input id="age" type="Number"></input>

            <button type="submit">Add User</button>
        </form>
    );
}

export default AddUser