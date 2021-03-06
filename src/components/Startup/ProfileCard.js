import React, { Component } from 'react';

import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Linking } from 'expo';

import api, { BASE_URL } from './../../services/api';

// import { Container } from './styles';

export default class ProfileCard extends Component {
    state = {
        apply: {},
    }

    componentDidMount(){
        const _id = this.props.apply;
        this.setApply(_id)
    }

    async setApply(_id){
        const response =  await api.get('/user', {
            headers: {id: _id},
        });

       this.setState({ apply: response.data });
    }

    async deleteApply() {
    
        const response = api.post(`/startup/${this.props.startupid}/deleteApply`, 
          null,
          {
            headers: { userid: this.state.apply._id }
          }
        );
        
        this.setState({ apply: null });
      }

    render() {
        const { apply } = this.state;
        
        
        if(apply){
            const { photoURL, name, phoneNumber, resumeURL } = apply; 
            return (
                <View style={styles.container}>
                    <View style={styles.avatarContainer}>
                        <Image 
                            source={{ uri: `${BASE_URL}${photoURL}`}} 
                            style={styles.avatar}    
                        />
                    </View>
    
                    <View style={styles.middleSection}>
                        <Text style={styles.nome}>{name}</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(`${BASE_URL}${resumeURL}`)} style={styles.resumeButton}>
                            <Text style={styles.resumeText}>resumé</Text>
                        </TouchableOpacity>
                    </View>
    
                    <View style={styles.endSection}>
                        <TouchableOpacity 
                            onPress={() => this.deleteApply()}
                            style={{ width: '70%', alignItems: 'flex-end', marginTop: 5, }}>
                            <Ionicons name="md-close" size={15} color="#999"/>
                        </TouchableOpacity>
    
                        <TouchableOpacity
                          onPress={() => Linking.openURL('whatsapp://send?phone=55'+phoneNumber)}
                          style={styles.whatsButton}
                        >
                            <FontAwesome name="whatsapp" size={30} color="#403BEB" />
                        </TouchableOpacity>
                    </View>           
    
                </View>
            );
        }

        else return(<View />);
        
    }
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#999',
        borderWidth: StyleSheet.hairlineWidth,
        height: 90,
        marginTop: 20,
        flexDirection: 'row',
    },

    avatarContainer: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    avatar: {
        height: 65,
        width: 65,
        borderRadius: 50,
    },

    middleSection: {
        paddingLeft: 20,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    nome: {
        fontSize: 15,
        fontWeight: 'bold',
    },

    resumeButton: {
        borderColor: '#2B93B6',
        borderWidth: 1,
        marginTop: 10,
        height: 30,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    resumeText: {
        fontWeight: 'bold',
        color: '#2B93B6',
    },

    endSection: {
        width: '25%',
        alignItems: 'center',
    },

    whatsButton: {
        alignSelf: 'center',
        marginTop: 15,
    },
});