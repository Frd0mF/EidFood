import Link from "next/link";
import Comment from "./Comment";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

function Comments({ dbComments, parentId }) {
    const [comments, setComments] = useState(dbComments || {});
    const [comment, setComment] = useState("");
    const [showReply, setShowReply] = useState();
    const [reply, setReply] = useState("");
    const context = useRouter();
    const { data: session } = useSession();

    const AddComment = async (e, parentId, isReply) => {
        e.preventDefault();
        const recipeId = context.query.recipeId;
        const newComments = await fetch(`/api/comments/addComment/${recipeId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                comment: isReply ? reply : comment,
                parentId
            }),
        });
        const newCommentsJson = await newComments.json();
        // group comments by parent
        let groupedComments = {};
        newCommentsJson.forEach(comment => {
            groupedComments[comment.parentId] = groupedComments[comment.parentId] || [];
            groupedComments[comment.parentId].push(comment);
        });
        setComments(groupedComments);
        setComment("");
        setReply("");
        setShowReply(false);
    }




    return (
        <div className="flex flex-col space-y-4">
            {
                session?.user ? (
                    <div className="flex space-x-4 mt-6">
                        <div className="flex flex-col space-y-2">
                            <img
                                className="w-10 h-10 rounded-full"
                                src={session.user.image}
                                alt=""
                            />
                            <p className="text-sm text-font-color-light font-semibold">{session.user.name}</p>
                        </div>
                        <form
                            onSubmit={AddComment}
                            className="w-full flex flex-col items-end">
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                                placeholder="Add a comment..."
                            ></textarea>
                            <button
                                disabled={!comment}
                                className="w-32 p-2 mt-2 text-white bg-primary rounded-lg hover:bg-primary-hover disabled:bg-font-color focus:outline-none focus:bg-primary-hover"
                                type="submit"
                            >
                                Comment
                            </button>
                        </form>
                    </div>) :
                    (
                        <div className="flex space-x-4 mt-6">
                            <h1 className="text-2xl font-semibold text-font-color-light">Please
                                <Link href="/register" className="underline mx-1">sign in</Link> to comment</h1>
                        </div>
                    )
            }
            <Comment comments={comments} parentId={parentId} AddComment={AddComment} reply={reply} setReply={setReply} showReply={showReply} setShowReply={setShowReply} />
        </div>
    );
}

export default Comments;

