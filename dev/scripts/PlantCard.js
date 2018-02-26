import React from 'react';

//stateless component, take some data(props) and display it
export default class PlantCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plant: props.plant
        }
        this.saveChanges = this.saveChanges.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.lifecycle = this.lifecycle.bind(this);
    }

    handleChange(event) {
        event.preventDefault();

        let editPlant = Object.assign({ }, this.state.plant)
        const key = event.target.id;
        const value = event.target.value;
        editPlant[key] = value;

        this.setState({
            plant: editPlant
        }) 

        // const dbref = firebase.database().ref('/newPlant/' + this.state.plant.fbKey);
        // dbref.update(editPlant);
    }


    saveChanges(event) {
        event.preventDefault();

        const dbref = firebase.database().ref('/newPlant/' + this.state.plant.fbKey);
        dbref.update(this.state.plant);
    }

    lifecycle(event) {
        event.preventDefault();

        const newValue = event.target.value;

        console.log(newValue)

        const editLifecycle = Object.assign({ }, this.state.plant)
        editLifecycle.lifecycle = newValue;
            
        this.setState({
           plant: editLifecycle
        }) 

    }

    //refs
    //naming


    
    render () {
        return (
            <div className="plantsContainer">
                <div className="plantCard">
        
                    <form onSubmit={this.saveChanges}>
        
                        <div className="close-btn">
                            <i className="far fa-times-circle"></i>
                        </div>
                        <img src="./dev/images/placeholder.jpg" alt="image of a plant" />
        
                        <label htmlFor="plant-name"></label>
                        <input type="text" name="plant-name" id="plantname" value={this.state.plant.plantname} onChange={this.handleChange} ref={ref => this.plantName = ref} />
        
                        <div className="range-sunlight">
                            <label htmlFor="sunlight"></label>
                            <input type="range" name="sunlight" id="sunlight" value={this.state.plant.sunlight} onChange={this.handleChange} ref={ref => this.sunlight = ref} min="1" max="3" step="1" className="slider" />
                        </div>
        
                        <div className="range-water">
                            <label htmlFor="water"></label>
                            <input type="range" name="water" id="water" value={this.state.plant.water} onChange={this.handleChange} ref={ref => this.water = ref} min="1" max="3" step="1" className="slider" />
                        </div>
        
                        <div>
                            <label htmlFor="note-text"></label>
                            <textarea name="note-text" id="notes" className="note-text" value={this.state.plant.notes} onChange={this.handleChange} ref={ref => this.noteText = ref}></textarea>
                        </div>
        
                        <div className="life-cycle">
                            <button className="icon-heart" value="good" onClick={this.lifecycle}>
                                <img src="./dev/images/003-like.svg" alt="icon heart" />
                            </button>
                            <button className="icon-skull" value="bad" onClick={this.lifecycle}>
                                <img src="./dev/images/004-skull.svg" alt="icon skull" />
                            </button>
            
                        </div>

                        <input type="submit" value="Save Changes" />
        
                    </form>
                </div>
            </div >
        )
    }
}

