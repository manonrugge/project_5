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


// this class App looks like an object but it is not, it is a class. 
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            plants: []
        } 
        this.showPopUp = this.showPopUp.bind(this);
        this.addPlant = this.addPlant.bind(this);
        this.lifecycle = this.lifecycle.bind(this);
    }


    componentDidMount() {
        const dbref = firebase.database().ref('/newPlant');
        console.log(dbref)

        dbref.on('value', (snapshot) => {
            console.log(snapshot.val());

            const data = snapshot.val();
            const fbstate = [];
            for (let key in data) {
                console.log(key);

                const newVal = data[key];
                newVal["fbKey"] = key;
                fbstate.push(newVal);
            }

            this.setState({
                plants: fbstate
            });
        });
    }


    showPopUp (event) {
        event.preventDefault();
        this.popUp.classList.toggle("show");
    }

    addPlant (event) {
        event.preventDefault();
        console.log(this)

        const plant = {
            plantname: this.plantName.value,
            sunlight: this.sunlight.value,
            water: this.water.value,
            notes: this.notetext.value,
            lifecycle: this.lifecycleValue.value
        };

        const dbref = firebase.database().ref('/newPlant');

        dbref.push(plant);

        this.plantName.value = '';
        this.sunlight.value = 0;
        this.water.value = 0;
        this.notetext.value = '';
        this.lifecycleValue.value = 'good'
        this.showPopUp(event);
    }

    lifecycle(event) {
        event.preventDefault();
        
        const newValue = event.target.value;
        document.getElementById("lifecycle").value = newValue;

    }



    render() {
        console.log(this.state.plants)

        return (
            <div>
                <header className="mainHeader">
                    <h1>My Plants</h1>
                    <nav>
                        <a href="" onClick={this.showPopUp}>Add New Plant</a>
                    </nav>
                </header>
                <section className="plants"> 
                    {
                        this.state.plants.map((plant,index) => {
                            return (
                                <PlantCard plant={plant} key={`plant-${index}`}/> 
                            )
                        }).reverse()
                    }
                </section>

                <section className="popUp" ref={ref => this.popUp = ref}>
                
                    <form onSubmit={this.addPlant}> 
                        <div className="close-btn" onClick={this.showPopUp}>
                            <i className="far fa-times-circle"></i>
                        </div>
                        <img src="./dev/images/placeholder.jpg" alt="image of a plant" />

                        <label htmlFor="plant-name"></label>
                        <input type="text" name="plant-name" id="plantname" ref={ref => this.plantName = ref }/>

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
                            <textarea name="note-text" id="notetext" className="note-text" ref={ref => this.notetext = ref} ></textarea>
                        </div>

                        <div className="life-cycle">
                            <button className="icon-heart" value="good" onClick={this.lifecycle}>
                                <img src="./dev/images/003-like.svg" alt="icon heart" />
                            </button>
                            <button className="icon-skull" value="bad" onClick={this.lifecycle}>
                                <img src="./dev/images/004-skull.svg" alt="icon skull" />
                            </button>
                            <input type="hidden" value="good" id="lifecycle" ref={ref => this.lifecycleValue = ref}/>
                        </div>

                        <input type="submit" value="Add New Plant"/>

                    
                    </form>
                </section>
            </div>
        )
    }

}


ReactDOM.render(<App />, document.getElementById('app'));