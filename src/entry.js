import React from "react";
// import {TextField} from '@material-ui/core'
import Calculator from "./Calculator/calculator";
// import {Button} from '@material-ui/core';

export default class Entry extends React.Component {

    state = {
        name: '',
        submit: false
    }

    submit = () => {
        this.setState({
            submit: true
        })
    }

    render() {
        return (
            <div>
                {!this.state.submit &&
                <div className="login-form left-margin">
                    <form className="bg-color-calculate">
                        <h3 className="text-dark">Welcome to Calculator</h3>
                        <div className="entry-field">
                            <input
                                className="form-control form-control-sm"
                                placeholder="Enter your name"
                                onChange={async (e) =>
                                    await this.setState({
                                        name: e.target.value
                                    })
                                }
                                value={this.state.name}
                                id="Name"
                            />
                        </div>
                        {
                            this.state.name === '' &&
                            <button
                                className="btn btn-secondary disabled"
                            >
                                Enter
                            </button>

                        }

                        {
                            this.state.name !== '' &&
                            <button
                                className="btn btn-dark"
                                type="submit"
                                onClick={this.submit}
                            >
                                Enter
                            </button>

                        }
                    </form>
                </div>
                }
                {this.state.submit &&
                <Calculator
                    name={this.state.name}
                />
                }
            </div>


        )
    }
}

