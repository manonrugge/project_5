import React from 'react';


class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    componentDidMount() {
       
    }
    render() {
        return (
            <div className="createUserModal modal" ref={ref => this.createUserModal = ref}>
                <div className="close-btn">
                    <i className="far fa-times-circle"></i>
                </div>
                <form onSubmit={this.createUser}>
                    <div>
                        <label htmlFor="createEmail">Email:</label>
                        <input type="text" name="createEmail" ref={ref => this.createEmail = ref}/>
                    </div>
                    <div>
                        <label htmlFor="createPassword">Password:</label>
                        <input type="password" name="createPassword" ref={ref => this.createPassword = ref} />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" name="confirmPassword" ref={ref => this.confirmPassword = ref} />
                    </div>

                </form>

                
            
            </div>
        ) 
    }
}


export default Authentication;