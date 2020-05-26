import React from 'react';
import PropTypes from 'prop-types';

class UpdateFishForm extends React.Component {

    updateFish(event) {
        event.preventDefault();
        const updatedFish = {
            name: this.name.value,
            price: this.price.value,
            status: this.status.value,
            desc: this.desc.value,
            image: this.image.value,
        }

        this.props.updateFish(this.props.index, updatedFish);
    }

    removeFish(event) {
        event.preventDefault();
        this.props.removeFish(this.props.index);
    }

    render() {
        const fish = this.props.fish
        return (
            <div className="fish-edit" key={this.props.index}>
                <form ref={(input) => { this.fishForm = input }} className="fish-edit" onSubmit={(e) => this.updateFish(e)}>
                    <input defaultValue={fish.name} ref={(input) => { this.name = input }} type="text" placeholder="Fish Name" />
                    <input defaultValue={fish.price} ref={(input) => { this.price = input }} type="text" placeholder="Fish Price" />
                    <select defaultValue={fish.status} ref={(input) => { this.status = input }}>
                        <option value="available">Fresh!</option>
                        <option value="unavailable">Sold Out!</option>
                    </select>
                    <textarea defaultValue={fish.desc} ref={(input) => { this.desc = input }} placeholder="Fish Desc" ></textarea>
                    <input defaultValue={fish.image} ref={(input) => { this.image = input }} type="text" placeholder="Fish Image" />
                    <button type="submit">Update Fish</button>
                </form>
                <form onSubmit={(e) => this.removeFish(e)}>
                    <button type="submit">Remove Fish</button>
                </form>
                
            </div>

        )
    }
}

UpdateFishForm.propTypes = {
    index: PropTypes.string.isRequired,
    updateFish: PropTypes.func.isRequired,
    removeFish: PropTypes.func.isRequired,
}

export default UpdateFishForm;