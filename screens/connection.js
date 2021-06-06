import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import consts from '../src/consts';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import globalStyle from "../assets/styles/globalStyle";
import Icon from "react-native-vector-icons/Ionicons";
import * as SecureStore from 'expo-secure-store';


class connection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            hidePassword : true,
            errorConnect : false,
            loading: false
        };
    }

    onSubmit = async () => {
        this.setState({
            loading: true
        });

        await fetch(consts.API_URL + '/auth/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.access_token == undefined) {
                    this.setState({
                        errorConnect: true,
                        loading: false
                    });
                } else {
                     SecureStore.setItemAsync('secure_token', data.access_token);
                    this.props.navigation.navigate('Stackstabs');
                    this.setState({
                        loading: false
                    });
                }
            })
            .catch(e => {
                this.setState({
                    error: true
                })
            })
    }

    onShowHidePress() {
        this.setState({ hidePassword: !this.state.hidePassword });
    }


    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps='handled'>
                    <View style={{ justifyContent: 'space-around', flex: 1, marginTop: consts.PHONE_HEIGHT / 20 }}>
                        <View style={{}}>
                            <Text style={styles.title}>Connexion</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput
                                value={this.state.email}
                                placeholderTextColor='#000'
                                onChangeText={(email) => this.setState({ email })}
                                style={[styles.input, styles.inputLogin]}
                                autoCapitalize='none'
                                autoCorrect={false}
                            />
                            <Text style={styles.inputLabel}>Mot de passe</Text>
                            <View style={styles.inputPasswordContainer}>
                                <TextInput
                                    secureTextEntry={this.state.hidePassword}
                                    value={this.state.password}
                                    placeholderTextColor='#000'
                                    onChangeText={(password) => this.setState({ password })}
                                    style={[styles.input, styles.inputPassword]}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                />
                                <Icon name="eye" size={28} color={consts.YELLOW} onPress={() => { this.onShowHidePress() }} style={styles.buttonSeePass} />
                            </View>
                            {this.state.errorConnect &&
                            <Text style={styles.errorConnectText}>Email/Mot de passe invalide</Text>
                            }

                            <Text style={styles.forgotText} onPress={() => { this.props.navigation.navigate("Register"); }}>Inscription</Text>


                        </View>


                        <TouchableOpacity style={[styles.btn, styles.loginBtn, globalStyle.shadowStyle]} onPress={() => { this.onSubmit() }}>
                            <Text style={[globalStyle.buttonYellowText]}>Log in</Text>
                            {
                                this.state.loading &&
                                <ActivityIndicator size="small" color={consts.BLACK} style={{ marginLeft: '5%' }} />
                            }
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: consts.BACKGROUND_COLOR,
        justifyContent: 'space-around',
    },
    btn: {
        width: "80%",
        borderRadius: 5,
        height: 50,
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 10,
        alignSelf: 'center'
    },
    loginText: {
        color: "#000",
        fontSize: 22
    },
    loginBtn: {
        backgroundColor: consts.YELLOW,
        flexDirection: 'row',
    },
    title: {
        fontSize: consts.FONT_SIZE_TITLE,
        alignSelf: 'center',
        color: '#555555',
        marginBottom: '5%'
    },
    input: {
        borderColor: '#C4C4C4',
        borderWidth: 1,
        borderRadius: 3,
        paddingLeft: '3%',
        width: '100%',
        fontSize: 16,
        height: 40,
    },
    inputContainer: {
        width: '80%',
        alignSelf: 'center',
    },
    inputLabel: {
        color: consts.LIGHT_GRAY,
        marginBottom: '2%',
        fontSize: 16
    },
    forgotText: {
        color: consts.YELLOW,
        width: '50%',
        marginTop: '2%',
        fontSize: 15
    },
    inputLogin: {
        marginBottom: '5%'
    },
    inputPassword: {
        // marginBottom: '3%'
    },
    errorConnectText: {
        width: '70%',
        alignSelf: 'center',
        color: '#cc0000',
        marginBottom: '4%',
        textAlign: 'center'
    },
    inputPasswordContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    buttonSeePass: {
        position: 'absolute',
        right: 0,
        marginRight: '3%',
        alignSelf: 'center',
    }
});

export default connection