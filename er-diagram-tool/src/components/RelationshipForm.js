import React, { useState, useEffect } from 'react';

const RelationshipForm = ({ entities }) => {
    const [fromEntity, setFromEntity] = useState('');
    const [fromAttribute, setFromAttribute] = useState('');
    const [toEntity, setToEntity] = useState('');
    const [toAttribute, setToAttribute] = useState('');
    const [name, setName] = useState(''); // Estado para el nombre de la relación

    useEffect(() => {
        // Si las entidades cambian, limpia los campos para evitar errores
        setFromEntity('');
        setFromAttribute('');
        setToEntity('');
        setToAttribute('');
        setName('');
    }, [entities]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (fromEntity && fromAttribute && toEntity && toAttribute && name) {
            const newRelationship = { fromEntity, fromAttribute, toEntity, toAttribute, name };

            try {
                const response = await fetch('http://localhost:5000/relationships', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newRelationship),
                });

                if (response.ok) {
                    // Si la solicitud fue exitosa, limpia el formulario
                    setFromEntity('');
                    setFromAttribute('');
                    setToEntity('');
                    setToAttribute('');
                    setName(''); // Limpiar el campo de nombre
                } else {
                    console.error('Error al agregar la relación:', response.statusText);
                }
            } catch (error) {
                console.error('Error al agregar la relación:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre de la Relación:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div style={{ marginTop: '10px' }}>
                <label>Entidad Origen:</label>
                <select value={fromEntity} onChange={(e) => setFromEntity(e.target.value)} required>
                    <option value="">Selecciona una entidad</option>
                    {entities.map((entity) => (
                        <option key={entity.name} value={entity.name}>{entity.name}</option>
                    ))}
                </select>
            </div>
            <div style={{ marginTop: '10px' }}>
                <label>Atributo Origen:</label>
                <select value={fromAttribute} onChange={(e) => setFromAttribute(e.target.value)} required>
                    <option value="">Selecciona un atributo</option>
                    {entities.find(entity => entity.name === fromEntity)?.attributes.map((attr) => (
                        <option key={attr.name} value={attr.name}>{attr.name}</option>
                    ))}
                </select>
            </div>
            <div style={{ marginTop: '10px' }}>
                <label>Entidad Destino:</label>
                <select value={toEntity} onChange={(e) => setToEntity(e.target.value)} required>
                    <option value="">Selecciona una entidad</option>
                    {entities.map((entity) => (
                        <option key={entity.name} value={entity.name}>{entity.name}</option>
                    ))}
                </select>
            </div>
            <div style={{ marginTop: '10px' }}>
                <label>Atributo Destino:</label>
                <select value={toAttribute} onChange={(e) => setToAttribute(e.target.value)} required>
                    <option value="">Selecciona un atributo</option>
                    {entities.find(entity => entity.name === toEntity)?.attributes.map((attr) => (
                        <option key={attr.name} value={attr.name}>{attr.name}</option>
                    ))}
                </select>
            </div>
            <button type="submit" style={{ marginTop: '10px' }}>Agregar Relación</button>
        </form>
    );
};

export default RelationshipForm;