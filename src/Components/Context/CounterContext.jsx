import { createContext, useState } from "react";


export let CounterContext = createContext(0);



export default function CounterContextProvider(props){

let [counter, setcounter] = useState(0);
let [user, setuser] = useState('Samar');



    return <>
    
    <CounterContext.Provider value={{counter,setcounter,user}}>
{props.children}
    </CounterContext.Provider>
    
    
    </>
}





