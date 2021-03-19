import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import consts from '../src/consts';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import globalStyle from "../assets/styles/globalStyle";
import Icon from "react-native-vector-icons/Ionicons";


class connection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hidePassword : true,
            errorConnect : false
        };
    }

    onSubmit = async () => {
        return true;
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
                            <Text style={styles.title}>Login</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Username</Text>
                            <TextInput
                                value={this.state.username}
                                placeholderTextColor='#000'
                                onChangeText={(username) => this.setState({ username })}
                                style={[styles.input, styles.inputLogin, globalStyle.fontTextRegular]}
                                autoCapitalize='none'
                                autoCorrect={false}
                            />
                            <Text style={styles.inputLabel}>Password</Text>
                            <View style={styles.inputPasswordContainer}>
                                <TextInput
                                    secureTextEntry={this.state.hidePassword}
                                    value={this.state.password}
                                    placeholderTextColor='#000'
                                    onChangeText={(password) => this.setState({ password })}
                                    style={[styles.input, styles.inputPassword, globalStyle.fontTextRegular]}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                />
                                <Icon name="ios-eye" size={28} color={consts.YELLOW} onPress={() => { this.onShowHidePress() }} style={styles.buttonSeePass} />
                            </View>
                            {this.state.errorConnect &&
                            <Text style={styles.errorConnectText}>Invalid username or password</Text>
                            }

                            <Text style={styles.forgotText} onPress={() => { Linking.openURL('https://crm.lovelydays.com/password/reset/request') }}>Forgot password ?</Text>


                        </View>


                        <TouchableOpacity style={[styles.btn, styles.loginBtn, globalStyle.shadowStyle]} onPress={() => { this.onSubmit() }}>
                            <Text style={[globalStyle.buttonYellowText, globalStyle.fontTextRegular]}>Log in</Text>
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
        fontFamily: 'PlayfairDisplay-Regular',
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
        fontFamily: 'Raleway-Regular',
        color: consts.LIGHT_GRAY,
        marginBottom: '2%',
        fontSize: 16
    },
    forgotText: {
        color: consts.YELLOW,
        fontFamily: 'Raleway-Regular',
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
        fontFamily: 'Raleway-Medium',
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