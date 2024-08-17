import React, { useState, useEffect } from 'react';

import './App.css';
import logo from './logo.svg';
import ERDiagram from './components/ERDiagram';
import EntityForm from './components/EntityForm';
import RelationshipForm from './components/RelationshipForm';

const App = () => {
  const [entities, setEntities] = useState([]);
  const [relationships, setRelationships] = useState([]);

  // Función para obtener entidades desde la base de datos
  const fetchEntities = async () => {
    try {
      const res = await fetch('http://localhost:5000/entities');
      const data = await res.json();
      setEntities(data);
    } catch (error) {
      console.error('Error fetching entities:', error);
    }
  };

  // Función para agregar una nueva entidad
  const addEntity = async (entity) => {
    try {
      const response = await fetch('http://localhost:5000/entities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entity),
      });

      if (response.ok) {
        const newEntity = await response.json();
        setEntities([...entities, newEntity]); // Actualiza el estado de entidades
      } else {
        console.error('Error al agregar la entidad:', response.statusText);
      }
    } catch (error) {
      console.error('Error al agregar la entidad:', error);
    }
  };

  useEffect(() => {
    // Cargar entidades al montar el componente
    fetchEntities();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>Generador de Diagramas ER</h3>
      </header>

      <div className="container" style={{ marginTop: '10px' }}>
        <div className="row">
          <div className="col-md-6">
            <h2>Ingreso de Entidades</h2>
            <EntityForm onAddEntity={addEntity} />
          </div>
          <div className="col-md-6">
            <h2>Ingreso de Relaciones</h2>
            <RelationshipForm entities={entities} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12" style={{ marginTop: '20px' }}>
            <h2>Diagrama ER</h2>

            <ERDiagram />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;