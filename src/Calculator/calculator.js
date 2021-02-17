import React from "react";
import io from 'socket.io-client'
import {TextField} from '@material-ui/core'
import {Button} from '@material-ui/core';

const socket = io('http://calculator-app-server.herokuapp.com/')

export default class Calculator extends React.Component {

    state = {
        message: '',
        num1: '',
        num2: '',
        symbol: '+',
        name: '',
        chat: [],
        nameEntered: false
    }

    componentDidMount() {
        this.setState({
            name: this.props.name
        })
        this.updateChat()
    }

    updateChat = async () => {
        socket.on('a', async ({name, message}) => {
            if (this.state.chat.length === 10) {
                await this.setState({
                    chat: this.state.chat.slice(1)
                })
            }
            await this.setState({
                chat: [...this.state.chat, {name, message}]
            })
        })
    }

    calculate = async (e) => {
        e.preventDefault()

        if (this.state.num2 === 0 && this.state.symbol === '/') {
            await this.setState({
                message: 'Cannot divide by 0!'
            })
        } else {
            let ans = 0
            switch (this.state.symbol) {
                case "+":
                    ans = this.state.num1 + this.state.num2
                    break
                case "-":
                    ans = this.state.num1 - this.state.num2
                    break
                case "x":
                    ans = this.state.num1 * this.state.num2
                    break
                default:
                    ans = this.state.num1 / this.state.num2
            }
            const m = this.state.num1 + " " + this.state.symbol + " " + this.state.num2 + " = " + ans
            await this.setState({
                message: m
            })
        }

        await socket.emit('a', this.state.name, this.state.message)
        await this.setState({
            message: ''
        })
    }

    renderChat = () => {
        return this.state.chat.map(({name, message}, index) => (
            <div key={index}>
                <h3>
                    {name}: <span>{message}</span>
                </h3>
            </div>
        ))
    }


    render() {
        return (
            <div>
                <div className="card">
                    <form>
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
                                type="number"
                                onChange={async (e) =>
                                    await this.setState({
                                        num1: parseInt(e.target.value)
                                    })
                                }
                                value={this.state.num1}
                                id="outlined-multiline-static"
                                variant="outlined"
                                label="First Number"
                            />
                        </div>
                        <div className="top-margin bottom-margin">
                            <select
                                name="message"
                                onChange={(e) =>
                                    this.setState({
                                        symbol: e.target.value
                                    })
                                }
                                value={this.state.symbol}
                                id="outlined-multiline-static"
                            >
                                <option value="+">+</option>
                                <option value="-">-</option>
                                <option value="x">x</option>
                                <option value="/">/</option>
                            </select>
                        </div>
                        <div>
                            <TextField
                                name="message"
                                type="number"
                                onChange={async (e) =>
                                    await this.setState({
                                        num2: parseInt(e.target.value)
                                    })
                                }
                                value={this.state.num2}
                                id="outlined-multiline-static"
                                variant="outlined"
                                label="Second Number"
                            />
                        </div>
                        <div className={"calculate-button"}>
                            {
                                (this.state.num1 === '' ||
                                    this.state.num2 === ''
                                ) &&
                                <Button
                                    disabled
                                    variant="contained"
                                >
                                    Calculate
                                </Button>

                            }

                            {
                                (this.state.num1 !== '' &&
                                    this.state.num2 !== ''
                                ) &&
                                <Button

                                    color={"secondary"}
                                    variant="contained"
                                    onClick={this.calculate}
                                >
                                    Calculator Log
                                </Button>

                            }


                        </div>
                    </form>
                    <div className="render-chat">
                        <h1>Calculate</h1>
                        {this.renderChat()}
                    </div>
                </div>
            </div>

        )
    }
}