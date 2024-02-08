import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './App.css';

function App() {
  const [Usuario, setUsuario] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3000/Usuario')
      .then(response => setUsuario(response.data))
      .catch(error => console.error('Error fetching data: ', error));
  };

  const onSubmit = data => {
    fetch('http://localhost:3000/Usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('La respuesta de la red no es válida');
        }
        return response.json();
      })
      .then(newUsuario => {
        setUsuario([...Usuario, newUsuario]);
        reset();
      })
      .catch(error => {
        console.error('Error; ', error);
      });
  };

  const deleteUsuario = userId => {
    fetch(`http://localhost:3000/Usuario/${userId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedUsuarios = Usuario.filter(user => user.id !== userId);
        setUsuario(updatedUsuarios);
      })
      .catch(error => console.error('Error deleting user: ', error));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Nombre:
          <input {...register("nombre", { required: true })} />
        </label>
        <label>
          Apellido 1:
          <input {...register("ape1", { required: true })} />
        </label>
        <label>
          Apellido 2:
          <input {...register("ape2", { required: true })} />
        </label>
        <label>
          Email:
          <input {...register("mail", { required: true })} />
        </label>
        <label>
          Teléfono:
          <input {...register("telf", { required: true })} />
        </label>
        <input type="submit" value="Enviar" />
      </form>
      <div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido 1</th>
              <th>Apellido 2</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {Usuario.map((item, key) => (
              <tr key={key}>
                <td>{item.nombre}</td>
                <td>{item.ape1}</td>
                <td>{item.ape2}</td>
                <td>{item.mail}</td>
                <td>{item.telf}</td>
                <td>
                  <button onClick={() => deleteUsuario(item.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
