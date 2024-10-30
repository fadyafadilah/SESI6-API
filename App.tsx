import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList } from 'react-native';
import { getPosts, getPost, createPost, updatePost, deletePost } from './services/api';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fungsi untuk mengambil semua post
  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fungsi untuk mengambil satu post berdasarkan ID (ditambahkan di sini)
  const fetchSinglePost = async (id: number) => {
    try {
      const response = await getPost(id);
      console.log('Single Post:', response.data); // Hasilnya ditampilkan di console
      // Anda bisa menambahkan response.data ke state tertentu jika ingin menampilkannya
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async () => {
    try {
      const newPost = { title, body, userId: 1 };
      const response = await createPost(newPost);
      setPosts([response.data, ...posts]);
      setTitle('');
      setBody('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    if (selectedPostId === null) return;

    try {
      const updatedPost = { title, body, userId: 1 };
      const response = await updatePost(selectedPostId, updatedPost);
      setPosts(posts.map(post => (post.id === selectedPostId ? response.data : post)));
      setTitle('');
      setBody('');
      setSelectedPostId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>CRUD App with Public API</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Body"
        value={body}
        onChangeText={setBody}
      />
      <Button
        title={selectedPostId ? "Update Post" : "Create Post"}
        onPress={selectedPostId ? handleUpdate : handleCreate}
      />

      {/* Tombol untuk memanggil fetchSinglePost */}
      <Button title="Fetch Single Post with ID 1" onPress={() => fetchSinglePost(1)} />

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.body}</Text>
            <Button title="Edit" onPress={() => {
              setSelectedPostId(item.id);
              setTitle(item.title);
              setBody(item.body);
            }} />
            <Button title="Delete" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default App;
