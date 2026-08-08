function DynamicSection({
    data,
    setData,
    fields,
    emptyItem,
    addButtonText
}) {

    const updateField = (index, field, value) => {

        const updated = data.map((item, itemIndex) =>
            itemIndex === index
                ? {
                    ...item,
                    [field]: value
                }
                : item
        );

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
            data.filter(
                (_, itemIndex) =>
                    itemIndex !== index
            )
        );
    };


    return (
        <div className="dynamic-section">

            {data.map((item, index) => (

                <div
                    className="dynamic-card"
                    key={index}
                >

                    {fields.map((field) => {

                        const fieldValue =
                            item[field.name];

                        const isArray =
                            Array.isArray(fieldValue);


                        return (
                            <input
                                key={field.name}
                                type={
                                    field.name
                                        .toLowerCase()
                                        .includes("url")
                                        ? "url"
                                        : "text"
                                }
                                placeholder={
                                    field.placeholder
                                }
                                value={
                                    isArray
                                        ? fieldValue.join(", ")
                                        : fieldValue || ""
                                }
                                onChange={(e) => {

                                    const value =
                                        e.target.value;

                                    updateField(
                                        index,
                                        field.name,
                                        isArray
                                            ? value
                                                .split(",")
                                                .map(
                                                    (v) =>
                                                        v.trim()
                                                )
                                                .filter(
                                                    Boolean
                                                )
                                            : value
                                    );

                                }}
                            />
                        );

                    })}


                    <button
                        type="button"
                        className="delete-btn"
                        onClick={() =>
                            deleteItem(index)
                        }
                    >
                        Delete
                    </button>

                </div>

            ))}


            <button
                type="button"
                className="add-btn"
                onClick={addItem}
            >
                {addButtonText}
            </button>

        </div>
    );
}

export default DynamicSection;