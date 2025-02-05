const GetJsxInputRow = (rowInformation, handleChange, data, setData) => {
    if (rowInformation.length === 1) {
        const input = rowInformation[0];
        if (input.isArea) {
            return (<div key={input.value}>
                <div className="admin-label">{input.label}</div>
                <textarea className="admin-textarea" placeholder={input.label} value={data[input.value]}
                          onChange={(e) => handleChange(e, input.value, data, setData)}></textarea>
            </div>)
        }

        return (<div className="admin-input-row" key={input.value}>
            <div className="admin-input admin-single">
                <div className="admin-label">{input.label}</div>
                <input type="text" placeholder={input.label} value={data[input.value]}
                       onChange={(e) => handleChange(e, input.value, data, setData)}/>
            </div>
        </div>)
    }
    else {
        return (<div className="admin-input-row" key={rowInformation[0].value}>
            {rowInformation.map((input) => {
                return (<div className="admin-input" key={input.value}>
                    <div className="admin-label">{input.label}</div>
                    <input type="text" placeholder={input.label} value={data[input.value]}
                           onChange={(e) => handleChange(e, input.value, data, setData)}/>
                </div>)
            })}
        </div>)
    }
}

export default GetJsxInputRow;