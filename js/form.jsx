class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 'coconut' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        $.post('https://us-central1-leetcode-207514.cloudfunctions.net/demo', { "question": "1", "lang": this.state.value, "time": "10" }).done(function (data) {
            response = ($.type(data) === "object")
                ? data
                : JSON.parse(data);
            alert(response.code)
        });
        alert(this.state.value)
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} >
                <label>
                    Pick your favorite language:
            <select value={this.state.value} onChange={this.handleChange}>
                        <option value="java">java</option>
                        <option value="python">python</option>
                        <option value="c">c</option>
                        <option value="cpp">cpp</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

ReactDOM.render(
    <FlavorForm />,
    document.getElementById('root')
);