import React from "react";
import io from 'socket.io-client'

const socket = io('https://calculator-app-server.herokuapp.com/')

export default class Calculator extends React.Component {

    state = {
        message: '',
        num1: NaN,
        num2: NaN,
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
        socket.on('calculator', async ({name, message}) => {
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

        await socket.emit('calculator', this.state.name, this.state.message)
        await this.setState({
            message: '',
        })
    }

    render() {
        return (
            <div>
                <div className="card">
                    <form className="bg-color-calculate">
                        <h1>Calculator</h1>
                        <div className="name-field">
                            <input
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                disabled
                                id="Name"
                            />
                        </div>
                        <div>
                            <input
                                name="message"
                                className="form-control"
                                type="number"
                                placeholder="Enter First Number"
                                onChange={async (e) =>
                                    await this.setState({
                                        num1: parseInt(e.target.value)
                                    })
                                }
                                value={this.state.num1}
                                id="outlined-multiline-static"
                            />
                        </div>
                        <div className="top-margin bottom-margin">
                            <select
                                name="message"
                                className="custom-select"
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
                            <input
                                name="message"
                                className="form-control"
                                type="number"
                                placeholder="Enter Second Number"
                                onChange={async (e) =>
                                    await this.setState({
                                        num2: parseInt(e.target.value)
                                    })
                                }
                                value={this.state.num2}
                                id="outlined-multiline-static"
                            />
                        </div>
                        <div className={"calculate-button"}>
                            {
                                (isNaN(this.state.num1) ||
                                    isNaN(this.state.num2)
                                ) &&
                                <button
                                    className="btn btn-secondary disabled"
                                >
                                    Calculate
                                </button>

                            }

                            {
                                (!isNaN(this.state.num1) &&
                                    !isNaN(this.state.num2)
                                ) &&
                                <button
                                    className="btn btn-dark"
                                    type="submit"
                                    onClick={this.calculate}
                                >
                                    Calculate
                                </button>

                            }


                        </div>
                    </form>
                    <div className="render-chat bg-color-calculate">
                        <h1>Calculator Log</h1>
                        {this.state.chat.map(({name, message}, index) => (
                            <div key={index}>
                                <h4 className="text-warning">
                                    {name}: <span>{message}</span>
                                </h4>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>

        )
    }
}