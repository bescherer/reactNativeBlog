/* react*/
import React, { useState, useEffect } from 'react';

/*react-navigation*/
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

/*react-native-paper*/
import { Searchbar } from 'react-native-paper';

/*styles*/
import { StyledSearchBar, StyledText } from './home.styles';

/*api*/
import { getPosts, getPhotos, getSpecificSearch } from '../../api/getUtils';

/* components */
import CardsToPosts from '../../components/cards-to-posts/cards-to-posts.component';

const theme = {
    colors: {
        placeholder: '#004AAD', 
        text: '#000', 
        primary: '#004AAD',
        underlineColor:'transparent', 
        background : '#fff'
    },
}

const Home = (props) => {
    const [photos, setPhotos] = useState([]);
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [tempAllPosts, setTempAllPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [postsPerPage] = useState(5);
    const [postsFromAsync, setPostsFromAsync] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const isFocused = useIsFocused();

    useEffect(() => { //specific search to endpoint based in id
        setSearchQuery("");

        const specificSearch = async (id) => { //specific search to endpoint based in id
            const response = await getSpecificSearch(id);
            const body = await response.json();
    
            return body;
        }

        specificSearch(4) // change this to call others posts from diferents id's
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }, [isFocused])

    useEffect(() => { //get all posts and photos from api

        const getPostsFromApi = async () => {
            const response = await getPosts();
            const body = await response.json();
    
            if (response.status !== 200) throw Error(body.message);

            return body;
        } 
    
        const getPhotosFromApi = async () => {
            const response = await getPhotos();
            const body = await response.json();
    
            if (response.status !== 200) throw Error(body.message);
    
            return body;
        }
    
        getPostsFromApi()
            .then(responsePosts => {
                setTempAllPosts(responsePosts);
            })
            .catch(err => console.log(err));

        getPhotosFromApi()
            .then(responsePhotos => {
                setPhotos(responsePhotos);
            })
            .catch(err => console.log(err));

    }, [isFocused]);

    useEffect(() => { // join photos and posts in the same object
        
        const joinPostsAndPhotos = async (all, photos) => {
            
            const getAllKeysFromAsync = async () => {
                try {
                    return await AsyncStorage.getAllKeys();
                } catch(error) {
                  console.log(err)
                }
              }

            const getOnePostFromAsync = async (key) => {
                    try {
                        return await AsyncStorage.getItem(key);

                    } catch(err) {
                      console.log(err)
                    }
            }

            getAllKeysFromAsync()
                .then(resK => {
                    const obj = [];
                        if(resK) {
                        resK.map((res) => {
                        getOnePostFromAsync(res)
                            .then(resP => {
                                const a = JSON.parse(resP);
                                obj.push({
                                    body: a.body,
                                    title: a.title,
                                    date: a.date,
                                    author: a.author,
                                })
                            })
                            .catch(err => console.log(err));
                    })
                }
                    setPostsFromAsync(obj);
                })
                .catch(err => console.log(err));

            const joinPosts = postsFromAsync.concat(tempAllPosts);

            const body = joinPosts.map((post,index) => {
                return {
                    title: post.title,
                    body: post.body,
                    id:  index,
                    img: photos[index].url, 
                    date: post.date ? post.date : "", 
                    author: post.author ? post.author : "",
                };
            })

            return body; 
        }

        joinPostsAndPhotos(tempAllPosts, photos)
            .then(responseJoin => {
                setPosts(responseJoin.slice(page, postsPerPage));
                setAllPosts(responseJoin);
            })
            .catch(err => console.log(err));

    }, [photos, isFocused])

      
    const loadMorePosts = () => { //load more posts to flatlist
        const nextPage = page + postsPerPage;
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
        posts.push(...nextPosts);
    
        setPosts(posts);
        setPage(nextPage);
      };


    const filteredPosts = searchQuery  //filter all post comparing if the post has the searchQuery (text input) include in your title
    ? allPosts.filter((post) => {
    return post.title.toLowerCase().includes(searchQuery.toLowerCase());
    })
    : posts;

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <>
            <StyledSearchBar>
                <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
            </StyledSearchBar>

            {filteredPosts.length > 0 ? 
                <CardsToPosts posts={filteredPosts} style={{flex:1}} loadMorePosts={loadMorePosts} navigation={props.navigation}/> 
                : 
                <StyledText>Nothing Here :(</StyledText>
            }
            
        </>
    );
}

export default Home;