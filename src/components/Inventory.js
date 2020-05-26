import React from 'react';
import firebase from "firebase";
import AddFishForm from './AddFishForm';
import UpdateFishForm from './UpdateFishForm';
import PropTypes from 'prop-types';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {

    constructor() {
        super();
        this.renderLogin = this.renderLogin.bind(this);
        this.renderInventory = this.renderInventory.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            uid: null,
            owner: null,
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user });
            }
        });
    }

    renderLogin() {
        return (
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage you store's inventory</p>
                <button className="github" onClick={() => this.authenticate('github')}>Login with Github</button>
                <button className="twitter" onClick={() => this.authenticate('google')}>Login with Google</button>
            </nav>
        )
    }

    renderInventory(key) {
        const fish = this.props.fishes[key];
        return <UpdateFishForm key={key} index={key} fish={fish} updateFish={this.props.updateFish} removeFish={this.props.removeFish} />
    }

    authenticate(provider) {
        let authProvider;
        if (provider === 'github') {
            authProvider = new firebase.auth.GithubAuthProvider();
        } else if (provider === 'google') {
            authProvider = new firebase.auth.GoogleAuthProvider();
        }
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
        console.log(`Signing in using ${provider}`)
    }

    authHandler = async authData => {
        console.log(authData);
        // const storeRef = base.database().ref(this.props.storeId);
        // storeRef.once('value', (snapshot) => {
        //     const data = snapshot.val() || {};
        //     if (!data.owner) {
        //         storeRef.set({
        //             owner: authData.user.uid
        //         });
        //     }
        // });
        // console.log(this.props.storeId);
        const store = await base.fetch(this.props.storeId, { context: this });
        console.log(store);
        if (!store.owner) {
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }

        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        });
        console.log(authData);
    };

    logout = async () => {
        console.log("Logging out!");
        await firebase.auth().signOut();
        this.setState({ uid: null });
    };

    render() {
        const logout = <button onClick={this.logout}>Logout</button>

        if (!this.state.uid) {
            return <div>{this.renderLogin()}</div>
        }

        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry, you are not the store owner</p>
                    {logout}
                </div>
            )
        }
        return (
            <div>
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm addFish= {this.props.addFish} />
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
                {logout}
            </div>
        )
    }
}

Inventory.propTypes = {
    fishes: PropTypes.object.isRequired,
    updateFish: PropTypes.func.isRequired,
    removeFish: PropTypes.func.isRequired,
    addFish: PropTypes.func.isRequired,
    loadSamples: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired
}

export default Inventory;