import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Keyboard } from 'react-native';

import Header from './src/components/Header';
import Footer from './src/components/Footer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allComplete: false,
            value: "",
            items: []
        }
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
    }
    handleToggleAllComplete() {
        const complete = !this.state.allComplete;
        const newItems = this.state.items.map((item) => ({
            ...item,
            complete
        }));
        console.table(newItems);
        this.setState({
            items: newItems,
            allComplete: complete
        })
    }
    handleAddItem() {
        if(!this.state.value) return;
        const newItems = [
            ...this.state.items,
            {
                key: Date.now(),
                text: this.state.value,
                complete: false
            }
        ]
        this.setState({
            items: newItems,
            value: ""
        });
    }

    render() {
        return (
            <View style={ styles.container }>
                <Header 
                    value={ this.state.value }
                    onAddItem={ this.handleAddItem }
                    onChange={ (value) => this.setState({ value }) }
                    onToggleAllComplete={ this.handleToggleAllComplete }
                />
                <View style={ styles.content }>
                    <FlatList
                        style={ styles.list }
                        keyExtractor={ item => item.key.toString() }
                        data={ this.state.items }   
                        renderItem={ ({ item }) => {
                            return (
                                <View style={ styles.textContainer }>
                                    <Text style={ styles.text }>{ item.text }</Text> 
                                </View>
                            );
                        }}
                        ItemSeparatorComponent={ () => <View style={ styles.separator } /> }
                    />
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
    },
    list: {
        backgroundColor: "#fff"
    },
    separator: {
        height: 2,
        backgroundColor: "#f5f5f5"
    },
    textContainer: {
        padding: 10,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    text: {
        fontSize: 16,
        color: "#4d4d4d"
    }
});

export default App;