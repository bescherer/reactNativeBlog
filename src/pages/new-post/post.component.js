/*react*/
import React, {useState, useEffect} from 'react';

/*react-native-paper*/
import { TextInput, HelperText, Button } from 'react-native-paper';

/*async-storage*/ 
import AsyncStorage from '@react-native-async-storage/async-storage';

/*react-navigation*/
import { useIsFocused } from "@react-navigation/native";

/*styles*/
import { StyledPostContainer } from './post.styles';


const theme = {
    colors: {
        placeholder: '#004AAD', 
        text: '#000', 
        primary: '#004AAD',
        underlineColor:'transparent', 
        background : '#fff'
    },
    input: {
        marginTop: '5%',
    },
    helper: {
        alignSelf: 'center',
    }
}

const Post = (props) => {

    const { navigate } = props.navigation;

    const isFocused = useIsFocused();

    const [data, setData] = useState({
        title: props.route.params ? props.route.params.data.title : "",
        author: props.route.params ? props.route.params.data.author : "",
        body: props.route.params ? props.route.params.data.body : "",
        date: props.route.params ? props.route.params.data.date : "",
    });

    useEffect(() => { //reload all data to input when te page is focused
        setData({
            title: props.route.params ? props.route.params.data.title : "",
            author: props.route.params ? props.route.params.data.author : "",
            body: props.route.params ? props.route.params.data.body : "",
            date: props.route.params ? props.route.params.data.date : "",
        });
    }, [isFocused])


    const hasErrors = () => {
       return !data.title || !data.author || !data.date || !data.body;
      };

    const saveData = async () => {
        try {
            if (props.route.params) {
                await AsyncStorage.removeItem(JSON.stringify(props.route.params.data.title)); //remove current data so it doesn't have duplication
                await AsyncStorage.setItem(JSON.stringify(data.title), JSON.stringify(data));
            } else {
                await AsyncStorage.setItem(JSON.stringify(data.title), JSON.stringify(data));
            }
        } catch (error) {
            console.log(error);
        }
        alert("Save!");
        navigate('Home');
    }

    return (
        <>
        <StyledPostContainer>
            <Button  mode="contained" theme={theme} disabled={hasErrors() ? true : false} onPress={() => saveData()}>
                Save
            </Button>
            <HelperText type="error" visible={hasErrors()} style={theme.helper}>
                Please fill all inputs!
            </HelperText>

            <TextInput theme={theme} style={theme.input}
                label="Title"
                value={data.title}
                onChangeText={titleText => setData({...data, title: titleText})}
            />
            <TextInput theme={theme} style={theme.input}
                label="Author"
                value={data.author}
                onChangeText={authorText => setData({...data, author: authorText})}
            />
            <TextInput theme={theme} style={theme.input}
                label="Date"
                value={data.date}
                onChangeText={dateText => setData({...data, date: dateText})}
            />
            <TextInput theme={theme} style={theme.input}
                label="Body"
                value={data.body}
                multiline
                onChangeText={bodyText => setData({...data, body: bodyText})}
            />
        </StyledPostContainer>
    </>
    );
}

export default Post;