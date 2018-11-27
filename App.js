import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Keyboard } from 'react-native';

import Header from './src/components/Header';
import Footer from './src/components/Footer';
import Row from './src/components/Row';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allComplete: false,
            value: "",
            items: []
        }
        this.handleToggleComplete = this.handleToggleComplete.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
    }
    handleToggleComplete(key, complete) {
        const newItems = this.state.items.map(( item ) => {
            if( item.key !== key ) return item;
            return {
                ...item,
                complete
            }
        });
        this.setState({
            items: newItems
        });
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
                                <Row
                                    item={ item }
                                    onComplete={ (complete) => this.handleToggleComplete( item.key , complete ) }
                                />
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
    }
});

export default App;