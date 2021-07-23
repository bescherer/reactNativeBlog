/*react*/
import React from 'react';
import { FlatList } from 'react-native';

/* react native paper */
import { Card, Button } from 'react-native-paper';

/*styles*/
import { StyledCard } from './cards-to-posts.styles'; 


const theme = {
    button: {
        width: '100%',
    },
    card: {
        marginBottom: '2%'
    },
    colors: {
        primary: '#004AAD',
    }
}

const Item = (props) => { //show the content from post

    const data = props.item;
    const { navigate } = props.navigation;
   
    return(

    <StyledCard>
        <Card key={props.item.id} style={theme.card}> 
            <Card.Cover source={{uri: props.item.img}} />
            <Card.Actions>
                <Button style={theme.button} theme={theme} onPress={() =>{ navigate('View Post', {data} )}}>{props.item.title}</Button>
            </Card.Actions>
        </Card>
    </StyledCard>

   );
};
  

const CardsToPosts = (props) => {

    const DATA = props.posts;
    
    const renderItem = ({item}) => { //render items to show cards
        return (
          <Item
            item={item}
            navigation={props.navigation}
          />
        );
    };

    return (    
        <>
            <FlatList data={DATA} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} onEndReachedThreshold={0.01} onEndReached={props.loadMorePosts}/> 
        </>
    );
}

export default CardsToPosts;
