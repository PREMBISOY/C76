import React, { Component } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

export default class MeteorScreen extends Component {

getMeteors=()=>
{

    axios
        .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=n6NoijeqmtHhvo9Jq1ydQlLzowKHAUXY3VTDLSZz")
        .then(response=>{
            this.setState({meteors : response.data.near_earth_objects})
        })
        // .catch(error=>{
        //     Alert.alert(error.message)
        // })

}


componentDidMount()
{

this.getMeteors()

}


constructor(props)
    {
super(props);
this.state={
meteors : {},
};
    }


    render() {
        if (Object.keys(this.state.meteors).length === 0)
         { return ( <View style={{ flex: 1,
             justifyContent: "center",
             alignItems: "center" }}> 
             <Text>Loading
                </Text> 
                </View> ) 
                } 
                else {

        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Text>Meteor Screen!</Text>
                </View>
           )
       }
    }
}