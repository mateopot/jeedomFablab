import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import consts from "../src/consts";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import globalStyle from "../assets/styles/globalStyle";
import * as SecureStore from "expo-secure-store";


class home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            lockState: 1,
            livingRoomLight: 1,
            kitchenLight: 1,
            roomLight: 1,
            bathroomLight: 1,
            roomShutter: 1,
            livingRoomShutter: 1,
            thermometerState: 20
        };
    }

    async componentDidMount() {
        await this.refresh();
    }

    async jeedomLock(id) {
        await fetch(consts.JEEDOM_API_URL + '?plugin=virtual&apikey=' + consts.JEEDOM_API_KEY + '&type=cmd&id=' + id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    lockState: data
                })
            })
            .catch(e => {
                console.log(e);
                this.setState({
                    error: true
                })
            })
    }

    async jeedomLight(id, room) {
        await fetch(consts.JEEDOM_API_URL + '?plugin=virtual&apikey=' + consts.JEEDOM_API_KEY + '&type=cmd&id=' + id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (room == 'livingRoom') {
                    this.setState({
                        livingRoomLight: data
                    })
                } else if (room == 'bathroom') {
                    this.setState({
                        bathroomLight: data
                    })
                } else if (room == 'kitchen') {
                    this.setState({
                        kitchenLight: data
                    })
                } else if (room == 'all') {
                    if (id == 486) {
                        this.setState({
                            kitchenLight: 0,
                            livingRoomLight: 0,
                            roomLight: 0,
                            bathroomLight: 0
                        })
                    } else {
                        this.setState({
                            kitchenLight: 1,
                            livingRoomLight: 1,
                            roomLight: 1,
                            bathroomLight: 1
                        })
                    }
                } else {
                    this.setState({
                        roomLight: data
                    })
                }

            })
            .catch(e => {
                console.log(e);
                this.setState({
                    error: true
                })
            })
    }

    async jeedomShutter(id, room) {
        await fetch(consts.JEEDOM_API_URL + '?plugin=virtual&apikey=' + consts.JEEDOM_API_KEY + '&type=cmd&id=' + id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (room == 'livingRoom') {
                    this.setState({
                        livingRoomShutter: data
                    })
                } else if (room == 'all') {
                    if (id == 489) {
                        this.setState({
                            livingRoomShutter: 0,
                            roomShutter: 0
                        })
                    } else {
                        this.setState({
                            livingRoomShutter: 1,
                            roomShutter: 1
                        })
                    }
                } else {
                    this.setState({
                        roomShutter: data
                    })
                }

            })
            .catch(e => {
                console.log(e);
                this.setState({
                    error: true
                })
            })
    }

    async jeedomThermometer(id) {
        await fetch(consts.JEEDOM_API_URL + '?apikey=' + consts.JEEDOM_API_KEY_THERMOMETER + '&type=cmd&id=' + id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    thermometerState: data
                })
            })
            .catch(e => {
                console.log(e);
                this.setState({
                    error: true
                })
            })
    }

    async jeedomThermometerMode(id) {
        await fetch(consts.JEEDOM_API_URL + '?apikey=' + consts.JEEDOM_API_KEY_THERMOMETER + '&type=cmd&id=' + id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.jeedomThermometer(449);
            })
            .catch(e => {
                console.log(e);
                this.setState({
                    error: true
                })
            })
    }

    async refresh(){
        await this.jeedomLock(373);
        await this.jeedomLight(377, 'kitchen');
        await this.jeedomLight(381, 'livingRoom');
        await this.jeedomLight(26, 'room');
        await this.jeedomLight(404, 'bathroom');
        await this.jeedomShutter(474, 'room');
        await this.jeedomShutter(478, 'livingRoom');
        await this.jeedomThermometer(449);
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleLine}>
                    <Text style={styles.title}>Bienvenue !</Text>
                    <Icon name={"refresh"} size={38} color={'#555555'} onPress={() => {
                        this.refresh()
                    }}/>
                </View>
                <ScrollView>
                    <View style={styles.roomContainer}>
                        <View style={styles.roomRowTitle}>
                            <Icon name="home-outline" size={26} color={'#555555'} style={styles.iconRoom}/>
                            <Text style={styles.roomTitle}>Home</Text>
                        </View>
                        <View style={styles.roomAction}>
                            <Icon name="thermometer-outline" size={65}
                                  color={this.state.thermometerState < 15 ? '#6495ED' : this.state.thermometerState < 25 ? consts.YELLOW : '#8B0000'}
                                  style={styles.iconRoom}/>
                            <Text style={styles.roomTitle}>{this.state.thermometerState} °C</Text>
                            <View style={styles.roomActionButtons}>
                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    this.jeedomThermometerMode(470)
                                }}>
                                    <Text style={[globalStyle.buttonYellowText]}>FRAÎCHEUR</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    this.jeedomThermometerMode(469)
                                }}>
                                    <Text style={[globalStyle.buttonYellowText]}>CONFORT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.roomAction}>
                            <Icon name={this.state.lockState == 1 ? "lock-closed-outline" : "lock-open-outline"}
                                  size={65} color={'#555555'} style={styles.iconRoom}/>
                            <View style={styles.roomActionButtons}>
                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    this.jeedomLock(374)
                                }}>
                                    <Text style={[globalStyle.buttonYellowText]}>ON</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    this.jeedomLock(375)
                                }}>
                                    <Text style={[globalStyle.buttonYellowText]}>OFF</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.roomAction}>
                            <Icon name="bulb-outline" size={65}
                                  color={(this.state.roomLight == 1 && this.state.livingRoomLight == 1 && this.state.bathroomLight == 1 && this.state.kitchenLight == 1) ? consts.YELLOW : '#555555'}
                                  style={styles.iconRoom}/>
                            <View style={styles.roomActionButtons}>
                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    this.jeedomLight(485, 'all')
                                }}>
                                    <Text style={[globalStyle.buttonYellowText]}>ON</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    this.jeedomLight(486, 'all')
                                }}>
                                    <Text style={[globalStyle.buttonYellowText]}>OFF</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.roomAction}>
                            <MaterialIcon
                                name={(this.state.roomShutter == 0 && this.state.livingRoomShutter == 0) ? "window-shutter-open" : "window-shutter"}
                                size={65}
                                color={'#555555'}
                                style={styles.iconRoom}/>
                            <View style={styles.roomActionButtons}>
                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    this.jeedomShutter(489, 'all')
                                }}>
                                    <Text style={[globalStyle.buttonYellowText]}>OUVRIR</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    this.jeedomShutter(490, 'all')
                                }}>
                                    <Text style={[globalStyle.buttonYellowText]}>FERMER</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.roomContainer}>
                        <View style={styles.roomRowTitle}>
                            <Icon name="bed-outline" size={26} color={'#555555'} style={styles.iconRoom}/>
                            <Text style={styles.roomTitle}>Chambre</Text>
                        </View>
                        <View style={styles.roomAction}>
                            <Icon name="bulb-outline" size={65}
                                  color={this.state.roomLight == 1 ? consts.YELLOW : '#555555'}
                                  style={styles.iconRoom}/>
                            <View style={styles.roomActionButtons}>
                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    this.jeedomLight(25, 'room')
                                }}>
                                    <Text style={[globalStyle.buttonYellowText]}>ON</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    this.jeedomLight(27, 'room')
                                }}>
                                    <Text style={[globalStyle.buttonYellowText]}>OFF</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.roomAction}>
                            <MaterialIcon name={this.state.roomShutter == 1 ? "window-shutter" : "window-shutter-open"}
                                          size={65}
                                          color={'#555555'}
                                          style={styles.iconRoom}/>
                            <View style={styles.roomActionButtons}>
                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    this.jeedomShutter(475, 'room')
                                }}>
                                    <Text style={[globalStyle.buttonYellowText]}>OUVRIR</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    this.jeedomShutter(476, 'room')
                                }}>
                                    <Text style={[globalStyle.buttonYellowText]}>FERMER</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.roomContainer}>
                        <View style={styles.roomRowTitle}>
                            <Icon name="water-outline" size={26} color={'#555555'} style={styles.iconRoom}/>
                            <Text style={styles.roomTitle}>Salle de bain</Text>
                        </View>
                        <View style={styles.roomAction}>
                            <Icon name="bulb-outline" size={65}
                                  color={this.state.bathroomLight == 1 ? consts.YELLOW : '#555555'}
                                  style={styles.iconRoom}/>
                            <View style={styles.roomActionButtons}>
                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    this.jeedomLight(405, 'bathroom')
                                }}>
                                    <Text style={[globalStyle.buttonYellowText]}>ON</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    this.jeedomLight(406, 'bathroom')
                                }}>
                                    <Text style={[globalStyle.buttonYellowText]}>OFF</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.roomContainer}>
                        <View style={styles.roomRowTitle}>
                            <Icon name="tv-outline" size={26} color={'#555555'} style={styles.iconRoom}/>
                            <Text style={styles.roomTitle}>Salon</Text>
                        </View>
                        <View style={styles.roomAction}>
                            <Icon name="bulb-outline" size={65}
                                  color={this.state.livingRoomLight == 1 ? consts.YELLOW : '#555555'}
                                  style={styles.iconRoom}/>
                            <View style={styles.roomActionButtons}>
                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    this.jeedomLight(382, 'livingRoom')
                                }}>
                                    <Text style={[globalStyle.buttonYellowText]}>ON</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    this.jeedomLight(383, 'livingRoom')
                                }}>
                                    <Text style={[globalStyle.buttonYellowText]}>OFF</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.roomAction}>
                            <MaterialIcon
                                name={this.state.livingRoomShutter == 1 ? "window-shutter" : "window-shutter-open"}
                                size={65}
                                color={'#555555'}
                                style={styles.iconRoom}/>
                            <View style={styles.roomActionButtons}>
                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    this.jeedomShutter(479, 'livingRoom')
                                }}>
                                    <Text style={[globalStyle.buttonYellowText]}>OUVRIR</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    this.jeedomShutter(480, 'livingRoom')
                                }}>
                                    <Text style={[globalStyle.buttonYellowText]}>FERMER</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.roomContainer}>
                        <View style={styles.roomRowTitle}>
                            <Icon name="fast-food-outline" size={26} color={'#555555'} style={styles.iconRoom}/>
                            <Text style={styles.roomTitle}>Cuisine</Text>
                        </View>
                        <View style={styles.roomAction}>
                            <Icon name="bulb-outline" size={65}
                                  color={this.state.kitchenLight == 1 ? consts.YELLOW : '#555555'}
                                  style={styles.iconRoom}/>
                            <View style={styles.roomActionButtons}>
                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    this.jeedomLight(378, 'kitchen')
                                }}>
                                    <Text style={[globalStyle.buttonYellowText]}>ON</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    this.jeedomLight(379, 'kitchen')
                                }}>
                                    <Text style={[globalStyle.buttonYellowText]}>OFF</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        marginTop: "20%",
        marginRight: "5%",
        marginLeft: "5%",
        width: "90%",
    },
    title: {
        fontSize: consts.FONT_SIZE_TITLE,
        color: '#555555',
        marginBottom: '5%'
    },
    roomContainer: {
        flexDirection: "column",
        borderWidth: 1,
        borderColor: consts.BLACK,
        borderRadius: 3,
        marginBottom: "7%",
        backgroundColor: 'white'
    },
    iconRoom: {
        marginLeft: "5%"
    },
    roomRowTitle: {
        flexDirection: "row",
        alignItems: "center",
    },
    roomTitle: {
        fontSize: 20,
        marginLeft: "5%",
        marginTop: "5%",
        marginBottom: "7%",
        fontWeight: "600",
        color: '#555555',
    },
    roomAction: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "7%"
    },
    roomActionButtons: {
        flexDirection: "row",
    },
    btn: {
        backgroundColor: consts.YELLOW,
        flexDirection: 'row',
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 10,
        alignSelf: 'center',
        padding: '4%',
        marginLeft: '5%',
        marginTop: '5%'
    },
    titleLine: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default home