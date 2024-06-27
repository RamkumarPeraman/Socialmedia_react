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
  const {datas,isLoading,fetchError} =useAxiosFetchData('http://localhost:3500/posts')


  useEffect(()=>{
    setPosts(datas);
  },[datas])


  // useEffect(()=>{
  //   const fetchPosts =  async () =>{
  //     try{
  //     const response = await api.get('/posts');
  //     setPosts(response.data);
  //     }catch(e){
  //       console.error(e)
  //     }
  //   }
  //   fetchPosts();
  // },[])

  useEffect(() => {
    const filteredResults = posts.filter(post => post.body.toLowerCase().includes(search.toLowerCase()) ||
      post.title.toLowerCase().includes(search.toLowerCase()));
    setSearchResults(filteredResults);
  }, [posts, search]);


  const handleSubmit = async(e) => {
        e.preventDefault()
        const id1 = (posts.length) ? posts.length + 1 : 1;
        const id = String(id1);
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newpost = {id,title:postTitle,datetime,body:postBody}
        try{
            const response = await api.post('/posts',newpost);
            setPosts([...pozsts,response.data]);
            setPostTitle('');
            setPostBody('');
            navigate("/");
        }
        catch(err){
          console.log(err.message);
        }
}
const handleDelete = async (id) => {
    try {
      await api.delete(`posts/${id}`)
      const deleteList = posts.filter(post => post.id !== id);
      setPosts(deleteList);
      navigate('/');
    } catch (e) {
        console.error(e); 
    }
}
const handleEdit = async (id) => {
  const datetime = format(new Date(), 'MMMM dd, yyyy pp');
  const updatedpost = {id,title:editTitle,datetime,body:editBody}
  try{
      const response = await api.put(`/posts/${id}`,updatedpost);
      setPosts(posts.map(post => post.id === id ?{...response.data} : post));
      setEditTitle('');
      setEditBody('');
      navigate("/");

  }catch(err){
    console.log(err);
  }
  console.log('Edit'); 
}
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
            isLoading={isLoading}
            fetchError={fetchError}
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
