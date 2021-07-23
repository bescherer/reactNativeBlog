/*react*/
import React from 'react';

/*async-storage*/
import AsyncStorage from '@react-native-async-storage/async-storage';

/* react native paper */
import { Card, Paragraph, IconButton } from 'react-native-paper';

const theme = {
    card: {
        height: '100%',
    },
    img: {
        width: '100%',
        height: '50%',
    },
    text: {
        alignSelf: 'center',
        textAlign: 'center',
    },
    dataText: {
        marginTop: '5%',
        alignSelf: 'center',
        textAlign: 'center',
    }
}


const ViewPost = (props) => {

    const { navigate } = props.navigation;
    const data = props.route.params.data; 

    const removeData = async (data) => { //remove the actual post in view
        try {
            await AsyncStorage.removeItem(JSON.stringify(data.title)); 
        } catch (error) {
            console.log(error);
        }
        alert('Deleted with success')
        navigate('Home');
    }


    return (
        <>
            <Card style={theme.card}>
                <Card.Content>
                    <Card.Cover source={{ uri: props.route.params.data.img}} style={theme.img}/>
                    <Card.Title title={props.route.params.data.title}/>
                    <Paragraph style={theme.text}>{props.route.params.data.body}</Paragraph>
                    <Paragraph style={theme.dataText}>Author: {props.route.params.data.author}</Paragraph>
                    <Paragraph style={theme.dataText}>Date: {props.route.params.data.date}</Paragraph>
                    <Card.Content style={{flexDirection: 'row', alignSelf:'center'}}>
                        <IconButton icon="pencil" onPress={() =>{ navigate('Post', {data})}} size={25} />  
                        <IconButton  icon="delete" onPress={() => {removeData(props.route.params.data)}} size={25}/> 
                    </Card.Content>
                </Card.Content>
            </Card>
        </>
    );
}

export default ViewPost;