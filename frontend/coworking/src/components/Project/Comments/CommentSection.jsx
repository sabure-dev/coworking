import React, { useState, useEffect } from "react";

function CommentSection({ projectId }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [projectId, showComments]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://proven-shortly-python.ngrok-free.app/api/project/${projectId}/comments`,
        {
          method: "GET",
          headers: {
            "Authorization": `bearer ${token}`,
            'ngrok-skip-browser-warning': '123'
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
        `https://proven-shortly-python.ngrok-free.app/api/project/${projectId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}`,
            'ngrok-skip-browser-warning': '123'
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

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  return (
    <div
      className="comment-section"
      style={{
        marginTop: "20px",
        border: "1px solid #eee",
        borderRadius: "8px",
        padding: "15px",
        backgroundColor: "#f9f9f9"
      }}
    >
      <button
        onClick={toggleComments}
        style={{
          marginBottom: "15px",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        {showComments ? "Скрыть комментарии" : "Показать комментарии"}
      </button>

      {showComments && (
        <>
          <div className="comment-list" style={{ marginBottom: "20px" }}>
            {comments.length === 0 ? (
              <p style={{ fontStyle: "italic", color: "#777" }}>
                Комментариев пока нет. Добавьте комментарий первым!
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="comment-item"
                  style={{
                    marginBottom: "15px",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    backgroundColor: "#fff"
                  }}
                >
                  <strong>{comment.username}:</strong>
                  <p style={{ margin: "5px 0" }}>{comment.text}</p>
                </div>
              ))
            )}
          </div>
          <form
            onSubmit={handleAddComment}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}
          >
            <textarea
              placeholder="Введите ваш комментарий..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                resize: "vertical",
                minHeight: "60px"
              }}
            />
            <button
              type="submit"
              style={{
                alignSelf: "flex-end",
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Отправить
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default CommentSection; 