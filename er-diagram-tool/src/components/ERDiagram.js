import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

const ERDiagram = () => {
  const diagramContainerRef = useRef(null);
  const [entities, setEntities] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [diagram, setDiagram] = useState('erDiagram'); // Inicializa con 'erDiagram'

  // Función para obtener entidades de la API
  const fetchEntities = async () => {
    try {
      const res = await fetch('http://localhost:5000/entities');
      const data = await res.json();
      setEntities(data);
    } catch (error) {
      console.error('Error fetching entities:', error);
    }
  };

  // Función para obtener relaciones de la API
  const fetchRelationships = async () => {
    try {
      const res = await fetch('http://localhost:5000/relationships');
      const data = await res.json();
      setRelationships(data);
    } catch (error) {
      console.error('Error fetching relationships:', error);
    }
  };

  // Función para generar el diagrama
  const generateDiagram = async () => {
    // Actualiza las entidades y relaciones desde la base de datos antes de generar el diagrama
    await fetchEntities();
    await fetchRelationships();

    const entityDefinitions = entities.map(entity => {
      const attributes = entity.attributes.map(attr => {
        return `${attr.name} ${attr.type}`;
      }).join('\n    ');
      return `${entity.name} {\n    ${attributes}\n}`;
    }).join('\n\n');

    const relationshipDefinitions = relationships.map(rel => {
      return `${rel.fromEntity} ||--|| ${rel.toEntity} : ${rel.name}`;
    }).join('\n');

    const generatedDiagram = `erDiagram\n${entityDefinitions}\n\n${relationshipDefinitions}`;
    setDiagram(generatedDiagram); // Actualiza el estado con el diagrama generado

    console.log(generatedDiagram);
  };

  useEffect(() => {
    if (diagramContainerRef.current && diagram !== 'erDiagram') {
      try {
        // Crea un nuevo div para insertar
        const newDiv = document.createElement('div');
        newDiv.className = 'mermaid';
        newDiv.innerHTML = diagram;

        // Limpia cualquier contenido previo en el contenedor
        diagramContainerRef.current.innerHTML = '';

        // Agrega el nuevo div al DOM
        diagramContainerRef.current.appendChild(newDiv);

        // Inicializa Mermaid en el nuevo div
        mermaid.initialize({ startOnLoad: true });
        mermaid.init(undefined, newDiv);
      } catch (error) {
        console.error('Error rendering Mermaid diagram:', error);
      }
    }
  }, [diagram]);

  return (
    <div>
      <button className='btn btn-success' onClick={generateDiagram}>Generar Diagrama ER</button>
      <div ref={diagramContainerRef}></div>
    </div>
  );
};

export default ERDiagram;