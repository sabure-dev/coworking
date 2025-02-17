import React, { useState, useEffect } from "react";

function CommentSection({ projectId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchComments();
  }, [projectId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://backend-coworking.onrender.com/api/project/${projectId}/comments`,
        {
          method: "GET",
          headers: {
            "Authorization": `bearer ${token}`
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Ошибка при загрузке комментариев:", error.message);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch(
        `https://backend-coworking.onrender.com/api/project/${projectId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}`
          },
          body: JSON.stringify({ text: newComment })
        }
      );

      if (response.ok) {
        setNewComment("");
        fetchComments();
      }
    } catch (error) {
      console.error("Ошибка при добавлении комментария:", error.message);
    }
  };

  return (
    <div className="comment-section">
      <h4>Комментарии</h4>
      {comments.length === 0 ? (
        <p>Комментариев пока нет. Добавьте комментарий первым!</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <strong>{comment.username}:</strong> {comment.text}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          placeholder="Добавьте комментарий"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}

export default CommentSection; 