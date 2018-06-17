class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 'java' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        console.log(this.state.value);
        fetch('https://us-central1-leetcode-207514.cloudfunctions.net/demo', {
            method: 'post',
            body: JSON.stringify({ question: "1", lang: this.state.value, time: "10" }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (response) {
            console.log(response.code);
        });
    };

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