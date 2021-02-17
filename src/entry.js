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
               {   !this.state.submit &&
               <div className="login-form left-margin">
                   <form className="bg-color">
                       <h1>Calculator</h1>
                       <div className="name-field">
                           <input
                               onChange={async (e) =>
                                   await this.setState({
                                       name: e.target.value
                                   })
                               }
                               value={this.state.name}
                               label="Name"
                           />
                       </div>
                       {
                           this.state.name === '' &&
                           <button
                               disabled
                               // variant="contained"
                           >
                               Enter
                           </button>

                       }

                       {
                           this.state.name !== '' &&
                           <button

                               color={"secondary"}
                               // variant="contained"
                               onClick={this.submit}
                           >
                               Enter
                           </button>

                       }
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

