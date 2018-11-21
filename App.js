import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Header from './src/components/Header';
import Footer from './src/components/Footer';

class App extends Component {
    render() {
        return (
            <View style={ styles.container }>
                <Header />
                <View style={ styles.content }>

                </View>
                <Footer />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5"
    },
    content: {
        flex: 1
    }
});

export default App;