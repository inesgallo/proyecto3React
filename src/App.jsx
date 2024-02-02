import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";

function App() {
  const [Usuario, setUsuario] = useState([]);
  const {register, handleSubmit, reset }=useForm();



  useEffect(() => {
    axios.get("http://localhost:3000/Usuario")
      .then(response => setUsuario(response.data))

  }, []);

  const onSubmit = data=>{
    fetch("http://localhost:3000/Usuario",{
      method:'POST',
      headers: {
        'Content-Type':'apllication/json',
      },
      body:JSON.stringify(data),
    }).then(response=>{
      if (!response.ok) {
        throw new Error('La respuesta de la red no es válida')
      }
      return response.json();
    }).then(newUsuario =>{
      setUsuario([...Usuario,newUsuario]);
      reset();
    }).catch((error)=>{
      console.log('Error; ', error);
    });
  }



  return (
    <>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Nombre:
          <input {...register("nombre", { required: true })} />
        </label>
        <label>
          Edad:
          <input {...register("edad", { required: true })} />
        </label>
        <input type="submit" value="Enviar" />
      </form>


      
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Edad</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
   
    </>
  )
}

export default App
