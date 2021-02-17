import React from "react";
import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField'

const socket = io('http://localhost:4000')

export default class Calculator extends React.Component {

    state = {
        message: '',
        name: '',
        chat : [],
        nameEntered: false
    }

    componentDidMount() {
        this.setState({
            name: this.props.name
        })
        this.updateChat()
    }

    updateChat = async () => {
        socket.on('a', async ({ name, message }) => {
            if(this.state.chat.length === 10) {
                await this.setState({
                    chat: this.state.chat.slice(1)
                })
            }
            await this.setState({
                chat: [...this.state.chat, {name, message}]
            })
        })
    }

    renderChat = () => {
        return this.state.chat.map(({ name, message }, index) => (
            <div key={index}>
                <h3>
                    {name}: <span>{message}</span>
                </h3>
            </div>
        ))
    }

    onMessageSubmit = async (e) => {
        e.preventDefault()
        await socket.emit('a', this.state.name, this.state.message)
        await this.setState({
            message: ''
        })
    }
    render() {
        return (
            <div className="card">
                <form onSubmit={this.onMessageSubmit}>
                    <h1>Calculator</h1>
                    <div className="name-field">
                        <TextField
                            name="name"
                            value={this.state.name}
                            disabled
                            label="Name"
                        />
                    </div>
                    <div>
                        <TextField
                            name="message"
                            onChange={async (e) =>
                                await this.setState({
                                    message: e.target.value
                                })
                            }
                            value={this.state.message}
                            id="outlined-multiline-static"
                            variant="outlined"
                            label="Message"
                        />
                    </div>
                    <button>Send Message</button>
                </form>
                <div className="render-chat">
                    <h1>Calculation Log</h1>
                    {this.renderChat()}
                </div>
            </div>
        )
    }
}

