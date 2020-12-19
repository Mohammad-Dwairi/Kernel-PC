import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import AppText from '../../SharedComponents/Atomic/AppText';
import Card from './GridItem/Card';
import { CATEGORIES } from '../../../data/Categories';
import { useSelector } from 'react-redux';
import { gridStyle } from '../Styles';

// A Function that renders the grid and the bottom horizontal list cards (used instead of hardcoded the grid).
const renderRow = rowNumber => {
    const item1 = CATEGORIES[2 * rowNumber];
    const item2 = CATEGORIES[2 * rowNumber + 1];
    
    if (rowNumber == 3) {
        return CATEGORIES.slice(6).map(item => <Card
            style={{width: Dimensions.get('screen').width / 1.8, maxWidth: 250, height: Dimensions.get('screen').height / 5, minHeight: 150, maxHeight: 200, marginBottom: 10}}
            id={item.id}
            key={item.id}
            name={item.name}
            image={item.image}
            horizontalList={true}
            textLeft={true}
        />)
    }
    return [
        <Card
            id={item1.id}
            key={item1.id}
            name={item1.name}
            image={item1.image}
        />,
        <Card
            id={item2.id}
            key={item2.id}
            name={item2.name}
            image={item2.image}
        />
    ];
}

const Grid = props => {

    const darkMode = useSelector(state => state.darkMode.isDark);
    const styles = gridStyle(darkMode);

    return (
        <View style={styles.container}>
            <View style={styles.titlContainer}>
                <AppText style={styles.title}>Shop by product</AppText>
            </View>
            <View style={styles.row}>
                {renderRow(0)}
            </View>
            <View style={styles.row}>
                {renderRow(1)}
            </View>
            <View style={styles.row}>
                {renderRow(2)}
            </View>
            <View style={styles.container}>
                <View style={styles.titlContainer}>
                    <AppText style={styles.title}>Hardware & Accessories</AppText>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollList}>
                    {renderRow(3)}
                </ScrollView>
            </View>
        </View>
    );
};

export default Grid;