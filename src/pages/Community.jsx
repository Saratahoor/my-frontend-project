import { useState } from "react";
import AddForumModal from "../features/Community/AddForumModal";
import useCommunityData from "../features/Community/useCommunityData";
import useLoginData from "../features/Auth/useLoginData";
import useDeleteForum from "../features/Community/useDeleteForum";

const Community = () => {
  const { data, isLoading } = useCommunityData();
  const forumsData = data;
  const [expandedForumId, setExpandedForumId] = useState(null);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { data: UserData, isLoading: userDataLoading } = useLoginData();
  const { deleteForum, isLoading: deletingForum } = useDeleteForum();

  const toggleForum = (forumId) => {
    setExpandedForumId(forumId === expandedForumId ? null : forumId);
    setExpandedPostId(null);
  };

  const togglePost = (postId) => {
    setExpandedPostId(postId === expandedPostId ? null : postId);
  };

  const handleAddForum = () => setShowModal(true);

  const handleDeleteForum = (id) => {
    const data = { forum_id: id, user_id: UserData.linked_id };
    deleteForum(data);
  };

  const handleAddPost = (forumId) => alert("Add post to forum: " + forumId);
  const handleDeletePost = (postId) => alert("Delete post: " + postId);

  const handleAddComment = (postId) => alert("Add comment to post: " + postId);
  const handleDeleteComment = (commentId) =>
    alert("Delete comment: " + commentId);

  if (isLoading || userDataLoading || deletingForum) return <h1>Loading...</h1>;

  return (
    <div className="min-h-screen min-w-full bg-gradient-to-r from-orange-500 via-white to-green-500 py-10 px-4 md:px-12 lg:px-24 xl:px-32">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        🧑‍🤝‍🧑 Community Forums
      </h1>

      {/* Add Forum Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handleAddForum}
          className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
        >
          ➕ Add New Forum
        </button>
      </div>

      <div className="space-y-8 w-full max-w-screen-2xl mx-auto">
        {forumsData?.map((forum) => (
          <div
            key={forum._id}
            className="bg-white rounded-lg shadow-lg border border-gray-300 w-full transition-all duration-300"
          >
            <div
              onClick={() => toggleForum(forum._id)}
              className="cursor-pointer px-6 py-4 hover:bg-gray-50 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold text-indigo-700">
                    {forum.title}
                  </h2>
                  <p className="text-gray-700 mt-1">{forum.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    <span className="italic mr-6">
                      🏷️ Tags:{forum.tags.join(", ")}
                    </span>
                    🎯 Category: {forum.category}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    👤 Created by:{" "}
                    <span className="font-medium">{forum.created_by}</span> (
                    {forum.created_by_model})
                  </p>
                </div>
                <div className="text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteForum(forum._id);
                    }}
                    className="text-red-600 hover:underline text-sm"
                  >
                    🗑️ Delete
                  </button>
                  <div className="text-xl text-gray-500 mt-2">
                    {expandedForumId === forum._id ? "🔼" : "🔽"}
                  </div>
                </div>
              </div>
            </div>

            {expandedForumId === forum._id && (
              <div className="px-6 pb-4 transition-all duration-300 ease-in-out">
                {/* Add Post Button */}
                <div className="mb-4">
                  <button
                    onClick={() => handleAddPost(forum._id)}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm"
                  >
                    ➕ Add Post
                  </button>
                </div>

                <div className="bg-gray-50 border-t py-4 space-y-6 min-h-[120px]">
                  {forum.posts.map((post) => (
                    <div
                      key={post._id}
                      className="bg-gray-200 p-4 rounded-md shadow-md border border-gray-200"
                    >
                      <p className="text-lg font-medium text-gray-800">
                        {post.content}
                      </p>
                      <div className="text-sm text-gray-500 mt-2 flex justify-between">
                        <span>
                          👤 {post.created_by} ({post.created_by_model})
                        </span>
                        <span>
                          👍 {post.upvotes} / 👎 {post.downvotes}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <p
                          onClick={() => togglePost(post._id)}
                          className="text-blue-600 hover:underline cursor-pointer text-sm font-medium"
                        >
                          💬 Comments on post ({post.comments.length})
                        </p>
                        <div className="flex gap-4">
                          <button
                            onClick={() => handleAddComment(post._id)}
                            className="text-green-600 hover:underline text-sm"
                          >
                            ➕ Add Comment
                          </button>
                          <button
                            onClick={() => handleDeletePost(post._id)}
                            className="text-red-600 hover:underline text-sm"
                          >
                            🗑️ Delete Post
                          </button>
                        </div>
                      </div>

                      <div
                        className={`mt-4 pl-4 border-l-4 border-blue-400 transition-all duration-300 ease-in-out ${
                          expandedPostId === post._id ? "block" : "hidden"
                        }`}
                      >
                        {post.comments.length > 0 ? (
                          post.comments.map((comment) => (
                            <div
                              key={comment._id}
                              className="bg-white p-3 rounded-md text-sm shadow-inner mb-3"
                            >
                              <p className="text-gray-700">{comment.content}</p>
                              <div className="text-xs text-gray-500 mt-1 flex justify-between">
                                <span>
                                  💬 {comment.created_by} (
                                  {comment.created_by_model})
                                </span>
                                <button
                                  onClick={() =>
                                    handleDeleteComment(comment._id)
                                  }
                                  className="text-red-500 hover:underline text-xs"
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-400 italic">
                            No comments yet.
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {showModal && <AddForumModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Community;
