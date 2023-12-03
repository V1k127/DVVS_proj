<template>
  <div class="post-management">
    <h1>Post Management</h1>

    <div class="post-form">
      <h2>Create/Edit Post</h2>
      <form @submit.prevent="savePost">
        <label for="title">Post Title:</label>
        <input type="text" v-model="newPost.name" required>

        <label for="author">Author Name:</label>
        <input type="text" v-model="newPost.written_by" required>
        <label for="description">Post Description:</label>
        <textarea class="description" v-model="newPost.content" required></textarea>

        <button type="submit">Save Post</button>
      </form>
    </div>

    <div class="all-posts">
      <h2>All Posts</h2>
      <ul>
        <li v-for="(post, index) in posts" :key="index" class="post-item">
          <strong>{{ post.name }}</strong>
          <p>{{ post.content }}</p>
          <p>Author: {{ post.written_by }}</p>
          <button @click="editPost(index)">Edit</button>
          <button @click="removePost(index)">Remove</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const posts = ref([]);
const newPost = ref({ name: '', content: '', written_by: '' });
let editingIndex = ref(null);

const fetchPosts = async () => {
  try {
    const response = await axios.get('http://localhost:8080/posts');
    posts.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const savePost = async () => {
  try {
    if (editingIndex.value !== null) {
      const response = await axios.put(`http://localhost:8080/posts/${posts.value[editingIndex.value].id}`, newPost.value);
      posts.value[editingIndex.value] = response.data;
      editingIndex.value = null;
    } else {
      const response = await axios.post('http://localhost:8080/posts', newPost.value);
      posts.value.push(response.data);
    }

    newPost.value = { name: '', content: '', written_by: '' };
  } catch (error) {
    console.error(error);
  }
};

const editPost = (index) => {
  newPost.value = { ...posts.value[index] };
  editingIndex.value = index;
};

const removePost = async (index) => {
  try {
    const response = await axios.delete(`http://localhost:8080/posts/${posts.value[index].id}`);
    if (response.status === 200) {
      posts.value.splice(index, 1);
    } else {
      console.error('Failed to delete post');
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchPosts);
</script>

<style>
body {
  background: #2c3e50;
  color: #ecf0f1;
  font-family: 'Arial', sans-serif;
}

h1 {
  color: #3498db;
}

.post-management {
  max-width: 800px;
  margin: auto;
}

.post-form,
.all-posts {
  background-color: #34495e;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #2c3e50;
  border-radius: 5px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #ecf0f1;
}

.description {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

button {
  background-color: #e74c3c;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #c0392b;
}

.post-item {
  margin-top: 10px;
  padding: 8px;
  border: 1px solid #2c3e50;
  border-radius: 5px;
  background-color: #ecf0f1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #2c3e50;
}

.post-item button {
  margin-left: 10px;
  background-color: #e67e22;
  color: white;
  border: none;
  cursor: pointer;
}

.post-item button:hover {
  background-color: #d35400;
}
</style>
