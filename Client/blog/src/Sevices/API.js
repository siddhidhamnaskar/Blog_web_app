export const base_url="https://blog-app-api-asc5.onrender.com"
// export const base_url="http://localhost:3046"

export const likePost = async (postId, token) => {
  try {
    const response = await fetch(`${base_url}/blogs/${postId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
};

export const unlikePost = async (postId, token) => {
  try {
    const response = await fetch(`${base_url}/blogs/${postId}/unlike`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error unliking post:', error);
    throw error;
  }
};
