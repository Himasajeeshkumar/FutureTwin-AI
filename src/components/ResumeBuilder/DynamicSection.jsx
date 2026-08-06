
function DynamicSection({
    data,
    setData,
    fields,
    emptyItem,
    addButtonText
}) {

    const updateField = (index, field, value) => {

        const updated = [...data];
        updated[index][field] = value;

        setData(updated);
    };

    const addItem = () => {

        setData([
            ...data,
            { ...emptyItem }
        ]);

    };

    const deleteItem = (index) => {

        setData(
            data.filter((_, i) => i !== index)
        );

    };

    return (

        <>

            {data.map((item, index) => (

                <div
                    className="dynamic-card"
                    key={index}
                >

                    {fields.map((field) => (

                        <input
                            key={field.name}
                            placeholder={field.placeholder}
                            value={
                                Array.isArray(item[field.name])
                                    ? item[field.name].join(", ")
                                    : item[field.name]
                            }
                            onChange={(e) => {

                                const value = e.target.value;

                                updateField(
                                    index,
                                    field.name,
                                    Array.isArray(item[field.name])
                                        ? value
                                            .split(",")
                                            .map(v => v.trim())
                                            .filter(Boolean)
                                        : value
                                );

                            }}
                        />

                    ))}

                    <button
                        className="delete-btn"
                        onClick={() => deleteItem(index)}
                    >
                        🗑 Delete
                    </button>

                </div>

            ))}

            <button
                className="add-btn"
                onClick={addItem}
            >
                {addButtonText}
            </button>

        </>

    );

}

export default DynamicSection;