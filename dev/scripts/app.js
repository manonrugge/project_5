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
            plants: []
        } 
        this.showPopUp = this.showPopUp.bind(this);
        this.addPlant = this.addPlant.bind(this);
        // this.lifecycle = this.lifecycle.bind(this);
    }


    componentDidMount() {
        const dbref = firebase.database().ref('/newPlant');

        dbref.on('value', (snapshot) => {

            const data = snapshot.val();
            const fbstate = [];
            for (let key in data) {

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

        const dbref = firebase.database().ref('/newPlant');
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

    render() {
        return (

            <div className="container">

                <header className="mainHeader">
                    <h1>House Of Plants</h1>
                    <nav>
                        <button className="add" onClick={this.showPopUp}><img src="./dev/images/plus.svg" alt="illustration of a plant"/></button>
                        <h5>New Plant</h5>
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

                            <input className="fbSave" type="submit" value="Add"/>
                            </form>

                    </section>
                </div>
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app'));