import React from "react";
import TextField from '@material-ui/core/TextField'
import Calculator from "./Calculator/calculator";

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
               {   !this.state.submit &&
               <div className="login-form left-margin">
                   <form className="bg-color">
                       <h1>Calculator</h1>
                       <div className="name-field">
                           <TextField
                               onChange={async (e) =>
                                   await this.setState({
                                       name: e.target.value
                                   })
                               }
                               value={this.state.name}
                               label="Name"
                           />
                       </div>
                       <button onClick={this.submit}>Enter</button>
                   </form>
               </div>
               }
               { this.state.submit &&
                 <Calculator
                    name = {this.state.name}
                 />
                }
           </div>


        )
    }
}

