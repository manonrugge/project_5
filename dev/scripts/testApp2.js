import React from 'react';
import ReactDOM from 'react-dom';
// import Form from './components/Form.js'
import animals from './plants.js';

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


// this class App looks like an object but it is not, it is a class. 
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            plants: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.addForm = this.addForm.bind(this);
    }

    handleChange(event) {
        const key = event.target.id;
        const plants = Array.from(this.state.plants);
        const index = event.target.attributes.getNamedItem("data-index").value;
        plants[index][key] = event.target.value;

        this.setState({
            plants
        })
    }

    componentDidMount() {
        const dbref = firebase.database().ref('/newPlant');
        console.log(dbref)
        // To listen for changes.  This .on is custom to firebase, but is similar to other languages
        // In documentation they call this “the snapshot”
        // Changing this to an arrow function fixes the issue with “this”

        dbref.on('value', (fbObject) => {
            console.log(fbObject.val());

            const data = fbObject.val();
            const fbstate = [];
            for (let key in data) {
                console.log(key);

                // Here we use the value stored in the key variable to access the object stored at that location.
                // Then we add a new property to that object called key(confusing right?
                // And assign it the value of, key
                const newVal = data[key];
                newVal["fbKey"] = key;
                fbstate.push(newVal);
            }
            
            console.log(state);
            this.setState({
                plants: fbstate
            });
        });
    }

    addForm(event) {
        event.preventDefault();
        console.log('on the page')
        //On submit create a new object that represents the plant. VALUE?
        const plant = {
            plantname: this.state.plantName,
            latinname: this.state.latinName,
            sunlight: this.state.sunLight,
            water: this.state.water,
            notes: this.state.notes
        }
        const dbref = firebase.database().ref('/newPlant');
        console.log(dbref)
        // dbref.push(plant);

        // const newPlant = Array.from(this.state.plants);

        // //Then we push into the new array
        // this.state.plantName = '',
        //     this.state.latinName = '',
        //     this.state.sunLight = '',
        //     this.state.water = '',
        //     this.state.notes = '',

        //     newPlant.push(plant);

        // //Then we set the state.
        // this.setState({
        //     plant: newPlant
        // });
    }

    savingPlant(event) {

    }

    renderBody() {

        if (this.state.plants.length > 0){
            return(
                this.state.plants.map((plant, index) => {
                    return (
                        <form onSubmit={this.addForm} key={`plant-${index}`}>

                            <img src="./dev/images/placeholder.jpg" alt="image of a plant" />

                            <label htmlFor="plantName"></label>
                            <input type="text" id="plantname" data-index={index} value={plant.plantname} onChange={this.handleChange} />

                            <div className="sunlight">
                                <label htmlFor="sunLight"></label>
                                <input type="range" min="1" max="3" step="1" className="slider" id="sunlight" name="sunlight" data-index={index} value={plant.sunlight} onChange={this.handleChange} />
                            </div>

                            <div className="water">
                                <label htmlFor="water"></label>
                                <input type="range" min="1" max="3" step="1" className="slider" id="water" name="water" data-index={index} value={plant.water} onChange={this.handleChange} />
                            </div>

                            <div>
                                <textarea className="notes-input" id="notes" data-index={index} value={plant.notes} onChange={this.handleChange}></textarea>
                            </div>

                            <div className="life-cycle">
                                <button className="icon-heart">
                                    <img src="./dev/images/003-like.svg" alt="icon heart" />
                                </button>
                                <button className="icon-skull">
                                    <img src="./dev/images/004-skull.svg" alt="icon skull" />
                                </button>
                            </div>

                            <button>Add Plant</button>

                        </form>
                    )
                })
            )
        } else {
            return(
                <p>hello</p>
            )
        }
    }

    render () {
        return (
            <div className="plant-container">
                { this.renderBody() }        
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));