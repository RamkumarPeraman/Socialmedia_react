import {Route, Routes, useNavigate } from 'react-router-dom';
import About from './About';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Missing from './Missing';
import Nav from './Nav';
import NewPost from './NewPost';
import PostPage from './PostPage';
// import Post from './Post';
import { useEffect, useState } from 'react';
import './index.css'
import { format } from 'date-fns';
import api from './api/posts';
import EditPost from './EditPost';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetchData from './hooks/useAxiosFetch';
function App() {
  const [posts,setPosts] = useState([]);
  const [search,setSearch] = useState('');
  const [searchResults,setSearchResults] = useState([]);
  const [postBody,setPostBody] = useState('');
  const [postTitle,setPostTitle] = useState('');
  const [editBody,setEditBody] = useState('');
  const [editTitle,setEditTitle] = useState('');
  const navigate = useNavigate(false);
  const width = useWindowSize();
  // const {datas,isLoading,fetchError} =useAxiosFetchData('http://localhost:3500/posts')


  useEffect(() => {
    try {
      const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
      console.log('Stored Posts (on mount):', storedPosts);
      setPosts(storedPosts);
    } catch (error) {
      console.error('Error retrieving data from local storage:', error);
    }
  }, []);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = posts.length ? String(Number(posts[posts.length - 1].id) + 1) : '1';
    const dateTime = format(new Date(), 'MMMM dd, yyyy pp');

    const newPost = { id: newId, title: postTitle, date: dateTime, body: postBody };
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setPostTitle('');
    setPostBody('');
    console.log('New Post added:', newPost);
    navigate('/');
    // Update local storage after adding the new post
    localStorage.setItem('posts', JSON.stringify([...posts, newPost]));
  };
  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    console.log('Post deleted (ID:', id, '):', updatedPosts);
    navigate('/');
    // Update local storage after deleting a post
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };
  const handleEdit = (id) => {
    const editTime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, title: editTitle, date: editTime, body: editBody } : post
    );
    setPosts(updatedPosts);
    setEditTitle('');
    setEditBody('');
    console.log('Post edited (ID:', id, '):', updatedPosts);
    navigate('/');
    // Update local storage after editing a post
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };
  return (
    <div className="App">
      <Header 
        title="SOCIAL MEDIA"
        width = {width}
      />
      <Nav 
      search={search} 
      setSearch={setSearch}
      />
      <Routes>

          <Route path='/' element={  <Home 
            posts={searchResults}
            />} />

            <Route path='post'>
                <Route index element={  <NewPost
                  handleSubmit={handleSubmit}
                  postBody={postBody}
                  postTitle={postTitle}
                  setPostBody={setPostBody}
                  setPostTitle={setPostTitle}
                  />} />

                  <Route path=':id' element={<PostPage posts={posts} handleDelete={handleDelete}/>}/>
            </Route>

            <Route path ='/edit/:id' element={
                      <EditPost 
                          posts={posts}
                          handleEdit={handleEdit}
                          editTitle={editTitle}
                          editBody={editBody}
                          setEditTitle={setEditTitle}
                          setEditBody={setEditBody}
                      />}
            />

            <Route path='about' element={ <About />}/>
           <Route path='*' element={ <Missing /> }/>
      </Routes>
      <Footer />
      
    </div>
  );
}

export default App;
