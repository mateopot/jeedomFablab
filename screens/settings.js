import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Alert, ActivityIndicator } from 'react-native';
import consts from '../src/consts';
import Icon from "react-native-vector-icons/Ionicons";
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';


class settings extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    onLogOutPress() {
        Alert.alert(
            "Déconnexion",
            "Etes-vous sûr de vouloir vous déconnecter ?",
            [
                {
                    text: "Retour",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Déconnexion", onPress: () => this.logOut() }
            ],
            { cancelable: true }
        );
    }

    async logOut() {
        await SecureStore.deleteItemAsync('secure_token')
        this.props.navigation.navigate("Connection");
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text style={ styles.titleText}>Paramètres</Text>
                </View>

                <View style={[styles.containerButtonsSettings]}>
                    <TouchableOpacity style={styles.buttonSetting}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="ios-sync" size={20} color={consts.BLACK} />
                            <Text style={ styles.textButtonSetting}>
                                Version
                            </Text>
                        </View>
                        <View>
                            <Text>{Constants.manifest.version}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonSetting} onPress={() => this.onLogOutPress()}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="ios-log-out" size={20} color={consts.RED} />
                            <Text style={[styles.textButtonSetting, styles.textLogOut]}>
                                Se déconnecter
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    containerTitle: {
        width: '90%',
        alignSelf: 'center',
        marginTop: '20%',
        marginBottom: '7%',
    },
    containerButtonsSettings: {
        marginBottom: '8%',
        width: '90%'
    },
    titleText: {
        fontSize: consts.FONT_SIZE_TITLE,
        color: '#555555',
    },
    buttonSetting: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '4%',
        alignItems: 'center',
        flexGrow: 1
    },
    textButtonSetting: {
        paddingLeft: '4%',
        fontSize: 18,
        lineHeight: 21,
    },
    textLogOut: {
        color: consts.RED
    },
});

export default settings