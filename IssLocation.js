import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform, StatusBar, ImageBackground, Image, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView,{Marker} from 'react-native-maps';
import axios from 'axios';
export default class IssLocationScreen extends Component {

    constructor(props)
    {
super(props);
this.state={
location : {},
};
    }

    componentDidMount()
    {

this.getIssLocation()

    }

getIssLocation=()=>{

axios
        .get("https://api.wheretheiss.at/v1/satellites/25544")
        .then(response=>{
            this.setState({location : response.data})
        })
        // .catch(error=>{
        //     Alert.alert(error.message)
        // })
}

    render() {
       if(Object.keys(this.state.location).length === 0) 
       { return ( 
       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}> <Text>Loading</Text> </View> ) }
        else {
        return (
            <View style = {styles.container}>
            <SafeAreaView styles = {styles.droidSafeArea}/>
            <ImageBackground source={require('../assets/iss_bg.jpg')} style={styles.backgroundImage}>
                <View style = {styles.titleContainer}>
                <Text style = {styles.titleText}>ISS Tracker App</Text>
                </View>

                <View style = {styles.mapContainer}>
                    <MapView style = {styles.map}
                    region = {{
                        latitude : this.state.location.latitude,
                        longitude : this.state.location.longitude,
                        latitudeDelta : 100,
                        longitudeDelta : 100
                    }}
                    >
<Marker coordinate={{ latitude: this.state.location.latitude, longitude: this.state.location.longitude }}>
<Image source={require('../assets/iss_icon.png')} style={{ height: 50, width: 50 }} />
</Marker>
                    </MapView>
                </View>

                </ImageBackground>
                </View>       
             )
                }
    }
}

const styles = StyleSheet.create({ 
    container: { flex: 1 },

    titleText: { 
         fontSize: 40,
         fontWeight: "bold",
          color: "white"
         },

         droidSafeArea: { 
            marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },

            titleBar: { flex: 0.15,
                 justifyContent: "center",
                  alignItems: "center"
                 },

                 routeCard: { flex: 0.25,
                     marginLeft: 50,
                      marginRight: 50,
                       marginTop: 50, 
                       borderRadius: 30,
                        backgroundColor: 'white' },

                        routeText: { fontSize: 35,
                             fontWeight: "bold",
                              color: "black",
                              marginTop: 75, 
                              paddingLeft: 30 },

                              backgroundImage: { flex: 1,
                                 sizeMode: 'cover',
                                 },

                                 knowMore: { paddingLeft: 30,
                                     color: "red",
                                      fontSize: 15 },
                                       bgDigit: { position: "absolute",
                                        color: "rgba(183, 183, 183, 0.5)",
      fontSize: 150,
      right: 20, bottom: -15,
     zIndex: -1 },
        iconImage: { position: "absolute",
      height: 200,
     width: 200,
    resizeMode: "contain",
   right: 20, top: -80 },
                            
     titleContainer: { flex: 0.1,
    justifyContent: "center",
     alignItems: "center" },

     mapContainer: { flex: 0.7 },
      map: { width: "100%",
       height: "100%" },
});