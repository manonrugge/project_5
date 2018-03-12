import React from 'react';
import ReactDOM from 'react-dom';
import PlantCard from'./PlantCard';


// Initialize Firebase
var config = {
    apiKey: "AIzaSyAhiCESuG2lIT9q-i76WFpMgUXAxuBfCbA",
    authDomain: "project5-5ed11.firebaseapp.com",
    databaseURL: "https://project5-5ed11.firebaseio.com",
    projectId: "project5-5ed11",
    storageBucket: "",
    messagingSenderId: "520068741387"
};
firebase.initializeApp(config);


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            plants: [],
            signedIn: false
        } 
        this.showPopUp = this.showPopUp.bind(this);
        this.addPlant = this.addPlant.bind(this);
        this.showCreate = this.showCreate.bind(this);
        this.createUser = this.createUser.bind(this);
        this.showSignIn = this.showSignIn.bind(this);
        this.signInUser = this.signInUser.bind(this);
        // this.lifecycle = this.lifecycle.bind(this);
    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged( (user) => {
            if (user) {
                const dbref = firebase.database().ref(`users/${ user.uid }/plants`);
        
                dbref.on('value', (snapshot) => {
        
                    const data = snapshot.val();
                    const fbstate = [];
                    for (let key in data) {
        
                        const newVal = data[key];
                        newVal["fbKey"] = key;
                        fbstate.push(newVal);
                    }
                    this.setState({
                        plants: fbstate,
                        signedIn: true
                    });
                });
            }
            else {
                this.setState ({
                    plants: [],
                    signedIn: false
                })
            }
        })
    }

    showCreate(event) {
        event.preventDefault();

        this.createUserModal.classList.toggle("show");
        this.overlay.classList.toggle("show");
    }

    createUser (event) {
        event.preventDefault();

        const email = this.createEmail.value;
        const password = this.createPassword.value;
        const confirm = this.confirmPassword.value;
        if (password === confirm) {
            firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then((res => {
                     this.showCreate(event);
                }))
                .catch((err => {
                    alert(err.message)
                })) 
        } 
        else {
            alert("Passwords must match!")
        }
    }

    showSignIn (event) {
        event.preventDefault();

        this.signInModal.classList.toggle("show");
        this.overlay.classList.toggle("show");
    }

    SignOut(event) {
        firebase.auth().signOut();
    }

    signInUser (event) {
        event.preventDefault();
        const email = this.userEmail.value;
        const password = this.userPassword.value;

        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((res => {
                this.showSignIn(event);
            }))
            .catch((err => {
                alert(err.message)
            })) 
    }

    showPopUp(event) {
        event.preventDefault();

        this.popUp.classList.toggle("show");
        this.overlay.classList.toggle("show");
    }

    addPlant (event) {
        event.preventDefault();

        const plant = {
            plantname: this.plantname.value,
            sunlight: this.sunlight.value,
            water: this.water.value,
            notes: this.notetext.value,
            // lifecycle: this.lifecycleValue.value
        };

        const userId = firebase.auth().currentUser.uid;
        const dbref = firebase.database().ref(`users/${userId}/plants`);
        dbref.push(plant);

        this.plantname.value = '';
        this.sunlight.value = 0;
        this.water.value = 0;
        this.notetext.value = '';
        // this.lifecycleValue.value = 'good';
        this.showPopUp(event);
    }

    // lifecycle(event) {
    //     event.preventDefault();
        
    //     const newValue = event.target.value;
    //     document.getElementById("lifecycle").value = newValue;
    // }

    renderPlants () {
        if (this.state.signedIn) {
            return (
                this.state.plants.map((plant, index) => {
                    return (
                        <PlantCard plant={plant} key={`plant-${index}`} />
                    )
                }).reverse()
            )
        }
        else {
            return (

            <div className="signin-background">
                <div className="welcome">
                    <h2>Welcome to <span>House of Plants!</span></h2>
                        <p> <span>Why</span> This app is useful for when you see a plant you like, lost a plant’s name card, or you straight up forgot what plant you bought and don’t know how to take care of it.</p>
                        <p><span>How</span> Simply create an account and add every single plant in your house or office. You can keep track of your plants and their progress!</p>
                
                </div>
            </div>

            );
        }
    }

    render() {
        return (

            <div className="container">

                <header className="mainHeader">
                    <h1>House Of Plants</h1>
                    <nav>
                        {/* <button className="add" onClick={this.showPopUp}><img src="./dev/images/plus.svg" alt="illustration of a plant"/></button>
                        <h5>New Plant</h5> */}
                        
                        {this.state.signedIn ?  
                            <div className="nav">      
                                <a href="" className="add" onClick={this.showPopUp}>Add Plant</a>
                                <a href="" onClick={this.SignOut} >Sign Out</a>
                            </div>
                            :
                            <div className="nav">
                                <a href="" onClick={this.showCreate} >Create Account</a>
                                <a href="" onClick={this.showSignIn} >Sign In</a>
                            </div>
                        }
                        
                    </nav>
                </header>

                <div className="overlay" ref={ref => this.overlay = ref}></div>

                <section className="plants"> 
                    {this.renderPlants()}
                </section>
            
                <div className="overlay" ref={ref => this.overlay = ref}>

                <section className="popUp" ref={ref => this.popUp = ref}>
                    <form onSubmit={this.addPlant}> 
                        <div className="close-btn" onClick={this.showPopUp}>
                            <i className="far fa-times-circle"></i>
                        </div>
                        <img src="./dev/images/placeholder-illustration.png" alt="image of a plant" />

                        <label htmlFor="plant-name"></label>
                        <input type="text" name="plant-name" id="plantname" placeholder="Name"ref={ref => this.plantname = ref }/>

                        <div className="range-sunlight">
                            <label htmlFor="sunlight"></label>
                            <input type="range" name="sunlight" id="sunlight" ref={ref => this.sunlight = ref } min="1" max="3" step="1" className="slider" />
                        </div>

                        <div className="range-water">
                            <label htmlFor="water"></label>
                            <input type="range" name="water" id="water" ref={ref => this.water = ref } min="1" max="3" step="1" className="slider" />
                        </div>

                        <div>
                            <label htmlFor="note-text"></label>
                            <textarea name="note-text" id="notetext" className="note-text" placeholder="Notes:" ref={ref => this.notetext = ref} ></textarea>
                        </div>

                        {/* stretch goal: these icons work and are pushed to firebase but need to connect them to an API */}

                        {/* <div className="life-cycle">
                            <button className="icon-heart" value="good" onClick={this.lifecycle}>
                                <img src="./dev/images/003-like.svg" alt="icon heart" />
                            </button>
                            <button className="icon-skull" value="bad" onClick={this.lifecycle}>
                                <img src="./dev/images/004-skull.svg" alt="icon skull" />
                            </button>
                            <input type="hidden" value="good" id="lifecycle" ref={ref => this.lifecycleValue = ref}/>
                        </div> */}

                        <input className="fbSave btn" type="submit" value="Add"/>
                    </form>
                </section>
                
                <section>
                    <div className="SignInModal modal" ref={ref => this.signInModal = ref}> 
                        <div className="close-btn" onClick={this.showSignIn}>
                            <i className="far fa-times-circle"></i>
                        </div>
                        <form onSubmit={this.signInUser}>
                            <h2>Welcome Back!</h2>
                            <div>
                                <label htmlFor="email"></label>
                                <input placeholder="Email:" id="inputField" type="text" name="email" ref={ref => this.userEmail = ref} />
                            </div>
                            <div>
                                <label htmlFor="password"></label>
                                <input placeholder="Password:" id="inputField" type="password" name="password" ref={ref => this.userPassword = ref} />
                            </div>
                            <div>
                                <input className="btn" type="submit" value="Sign In" />
                            </div>
                        </form>
                    </div>
                </section>

                <section>
                    <div className="createUserModal modal" ref={ref => this.createUserModal = ref}>
                        <div className="close-btn" onClick={this.showCreate}>
                            <i className="far fa-times-circle"></i>
                        </div>
                        <form onSubmit={this.createUser}>
                            <div>
                                <label htmlFor="createEmail"></label>
                                <input placeholder="Email:" id="inputField" type="text" name="createEmail" ref={ref => this.createEmail = ref} />
                            </div>
                            <div>
                                <label htmlFor="createPassword"></label>
                                <input placeholder="Password:" id="inputField" type="password" name="createPassword" ref={ref => this.createPassword = ref} />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword"></label>
                                <input placeholder="Confirm Password:" id="inputField" type="password" name="confirmPassword" ref={ref => this.confirmPassword = ref} />
                            </div>
                            <div>
                                <input className="btn" type="submit" value="Create" />
                            </div>
                        </form>
                    </div>
                </section>

            </div>
        </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app'));