import React, {useState, useEffect, useCallback} from "react";
import Card from '../UI/Card';
import Button from "../UI/Button";
import classes from './AddUser.module.css';
import ErrorModal from "../UI/ErrorModal";

function AddUser(){

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorModal, setErrorModal] = useState(null)
    const [myData, setMyData] = useState('')


    function nameChangeHandler(event){
        setName(event.target.value)
    }

    function ageChangeHandler(event){
        setAge(event.target.value)
    }

    function emailChangeHandler(event){
        setEmail(event.target.value)
    }

    function passwordChangeHandler(event){
        setPassword(event.target.value)
    }

    async function addUserHandler(event){
        event.preventDefault();
        console.log(name, age)
        const my_object={
            userName: name,
            userAge: age,
            userEmail: email,
            userPassword: password
          }

        if(name.length<3){
            setErrorModal(
                {title: "Błędna nazwa", msg: "Nazwa musi mieć co najmniej 3 znaki!"}
            )
        }
        else if(+age<1){
            setErrorModal(
                {title: "Błędny wiek", msg: "Wiek musi być większy od zera!"}
            )
        }
        else if(!email.includes("@")){
            setErrorModal(
                {title: "Błędny email", msg: "Email musi zawierać @!"}
            )
        }
        else if(password.length<8){
            setErrorModal(
                {title: "Błędne hasło", msg: "Hasło musi mieć co najmniej 8 znaków!"}
            )
        }
        else{
            const res = await fetch('https://react-pzaw-default-rtdb.europe-west1.firebasedatabase.app/users.json', 
            {
              method: 'POST',
              body: JSON.stringify(my_object),
              headers:{
                'Content-Type': 'application/json'
              }
            })
            console.log(res)
        }
        setAge('')
        setName('')
        setEmail('')
        setPassword('')
    }
    const errorHandler = () => {
        setErrorModal(null)
    }

    const GetDataHandler = useCallback( async () => {
        const res = await fetch('https://react-pzaw-default-rtdb.europe-west1.firebasedatabase.app/users.json')
        const data = await res.json()
        const loadedData = []
        for(const key in data){
          loadedData.push({
            userName : data[key].userName,
            userAge : data[key].userAge,
            userEmail : data[key].userEmail,
            userPassword : data[key].userPassword
          })
        }
        setMyData(loadedData)
      }, [])

    useEffect(() => {
        GetDataHandler()
      }, [GetDataHandler])

    return(
        <>
            {errorModal && <ErrorModal title={errorModal.title} msg={errorModal.msg} removeError={errorHandler}/>}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" onChange={nameChangeHandler} value={name}></input>

                    <label htmlFor="age">Age</label>
                    <input id="age" type="Number" onChange={ageChangeHandler} value={age}></input>

                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" onChange={emailChangeHandler} value={email}></input>

                    <label htmlFor="pass">Password</label>
                    <input id="pass" type="Password" onChange={passwordChangeHandler} value={password}></input>

                    <Button type="submit">Add user</Button>
                </form>
            </Card>
            <>
                {Array.isArray(myData) && myData.map(data => {
                    return(
                        <ul style={{color: 'white'}}>
                            <li>{data.userName}</li>
                            <li>{data.userAge}</li>
                            <li>{data.userEmail}</li>
                            <li>{data.userPassword}</li>
                        </ul>
                    )
                })

                }
            </>
        </>
    );
}

export default AddUser