import Axios from "axios";
import { useState } from "react";
import "./styles.css";
import Maskedinput from "./Maskedinput";

function App(){

    const [cnpj, setCnpj] = useState();
    const [data, setData] = useState();

    const fetchData = () => {
        console.log(cnpj)
        Axios.get(`https://api.gtech.site/companies/${cnpj}/is_blocked`).then((res) =>{
            setData(res.data)
            console.log(res)
            if(res.status === 204){
                alert("CNPJ não foi encontrado ou é inválido")
            }
        })
    };

    const fetchDate = () => {
        const d1  = data?.lock_date;

        const diffMs = new Date(d1) - Date.now();
        const diffDay = diffMs / (1000 * 60 * 60 * 24)  
        
        return  Math.round(diffDay);
    }

    
    // const diffInMs   = new Date(d2) - new Date(d1)
    // const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    // console.log(diffInDays)

    return(
        <div className="App">
            {/* <input
                placeholder="CNPJ 11586637000128..."
                onChange={(event) => {
                    setCnpj(parseInt(event.target.value));
                }}
            /> */}
            <Maskedinput className="input" value={cnpj} onChange={(event => setCnpj(event.target.value))}/>

            <div className="Information">
                <h4>CNPJ: {data?.cnpj}</h4>
                <h4>Name: {data?.name}</h4>
                <h4>Data de Bloqueio: {data?.lock_date}</h4>
                <h4>Versão: {data?.version}</h4>
                <h4>Sistema: {data?.system}</h4>
                <h4>Telefone: {data?.phone}</h4>
                <h4>Dias para ser bloqueado: {fetchDate()} dias</h4>
                <h4>Dias Bloqueados: {data?.is_blocked ? fetchDate() : 0} dias</h4>
            </div>

            <button onClick={fetchData}>Consultar CNPJ</button>

        </div>

    );
}

export default App;