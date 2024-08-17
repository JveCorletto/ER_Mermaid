import React, { useState } from 'react';

const EntityForm = ({ onAddEntity }) => {
    const [entityName, setEntityName] = useState('');
    const [attributes, setAttributes] = useState([{ name: '', type: 'string', primaryKey: false }]);

    const handleAttributeChange = (index, field, value) => {
        const newAttributes = [...attributes];
        newAttributes[index] = { ...newAttributes[index], [field]: value };
        setAttributes(newAttributes);
    };

    const handleAddAttribute = () => {
        setAttributes([...attributes, { name: '', type: 'string', primaryKey: false }]);
    };

    const handleRemoveAttribute = (index) => {
        const newAttributes = attributes.filter((_, i) => i !== index);
        setAttributes(newAttributes);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (entityName && attributes.every(attr => attr.name)) {
            onAddEntity({ name: entityName, attributes });
            setEntityName('');
            setAttributes([{ name: '', type: 'string', primaryKey: false }]);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre de la Entidad:</label>
                <input type="text" value={entityName} onChange={(e) => setEntityName(e.target.value)} required />
            </div>
            <div>
                <h3>Atributos: </h3>
                {attributes.map((attr, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            value={attr.name}
                            placeholder="Nombre del atributo"
                            style={{ marginRight: '5px' }}
                            onChange={(e) => handleAttributeChange(index, 'name', e.target.value)}
                            required
                        />

                        <select
                            value={attr.type}
                            onChange={(e) => handleAttributeChange(index, 'type', e.target.value)}
                            style={{ marginRight: '5px' }}
                        >
                            <option value="string">string</option>
                            <option value="int">int</option>
                            <option value="float">float</option>
                            <option value="boolean">boolean</option>
                        </select>

                        <label>
                            <input
                                type="checkbox"
                                checked={attr.primaryKey}
                                onChange={(e) => handleAttributeChange(index, 'primaryKey', e.target.checked)}
                            />
                            Llave Primaria
                        </label>

                        {attributes.length > 1 && (
                            <button type="button" onClick={() => handleRemoveAttribute(index)}>Eliminar</button>
                        )}
                    </div>
                ))}

                <button type="button" onClick={handleAddAttribute}>Agregar Atributo</button>
            </div><br />
            <button type="submit">Agregar Entidad</button>
        </form>
    );
};

export default EntityForm;