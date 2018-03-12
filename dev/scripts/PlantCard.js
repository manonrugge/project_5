import React from 'react';


export default class PlantCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plant: props.plant
        }
        this.saveChanges = this.saveChanges.bind(this)
        this.handleChange = this.handleChange.bind(this)
        // this.lifecycle = this.lifecycle.bind(this);
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
    }

    saveChanges(event) {
        event.preventDefault();

        const dbref = firebase.database().ref('/newPlant/' + this.state.plant.fbKey);
        dbref.update(this.state.plant);
    }

    // lifecycle(event) {
    //     event.preventDefault();

    //     const newValue = event.target.value;

    //     const editLifecycle = Object.assign({ }, this.state.plant)
    //     editLifecycle.lifecycle = newValue;
            
    //     this.setState({
    //        plant: editLifecycle
    //     }) 
    // }

    
    render () {
        return (
            <div className="plantsContainer">

                <div className="plantCard">

                    <form onSubmit={this.saveChanges}>
        
                        <img className="illustration" src="./dev/images/placeholder-illustration.png" alt="illustration of a plant" />
        
                        <label htmlFor="plant-name"></label>
                        <input type="text" name="plant-name" id="plantname" value={this.state.plant.plantname} onChange={this.handleChange} ref={ref => this.plantname = ref} />
        
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
        
                        {/* stretch goal: these icons work and are pushed to firebase but need to connect them to an API */}

                        {/* <div className="lif ">
                            <button className="icon-heart" value="good" onClick={this.lifecycle}>
                                <img src="./dev/images/003-like.svg" alt="icon heart" />
                            </button>
                            <button className="icon-skull" value="bad" onClick={this.lifecycle}>
                                <img src="./dev/images/004-skull.svg" alt="icon skull" />
                            </button>
                        </div> */}

                        <input className="fbSave btn" type="submit" value="Save" />
        
                    </form>
                </div>
            </div >
        )
    }
}

