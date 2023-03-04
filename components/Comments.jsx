import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

function Comments({ dbComments, dbReplies }) {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(dbComments || []);
    const [reply, setReply] = useState("");
    const context = useRouter();
    const { data: session } = useSession();

    const AddComment = async (e) => {
        e.preventDefault();
        const recipeId = context.query.recipeId;
        const newComment = await fetch(`/api/comments/addComment/${recipeId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                comment,
            }),
        });
        const data = await newComment.json();
        setComments([data, ...comments]);
        setComment("");
    }

    const AddReply = async (e, commentId) => {
        e.preventDefault();
        const newReply = await fetch(`/api/comments/addReply/${commentId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reply,
            }),
        });
        const data = await newReply.json();
        setComments(comments.map((comment) => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: [data, ...comment.replies]
                }
            }
            return comment;
        }))
        setReply("");
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
            {
                comments.map((comment) => (
                    <div className="flex flex-col space-y-2">
                        <div className="flex space-x-4 items-center" key={comment.id}>
                            <img
                                className="w-10 h-10 rounded-full"
                                src={comment.user?.image}
                                alt=""
                            />
                            <div className="flex-1 p-2 border border-gray-300 rounded-lg">
                                <p className="font-semibold">{comment.user?.name}</p>
                                <p className="text-sm">{comment.text}</p>
                            </div>
                        </div>
                        {comment.replies?.map((reply) => (
                            <div className="flex space-x-4 ml-24" key={reply.id}>
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={reply.user?.image}
                                    alt=""
                                />
                                <div className="flex-1 p-2 border border-gray-300 rounded-lg">
                                    <p className="font-semibold">{reply.user?.name}</p>
                                    <p className="text-sm">{reply.text}</p>

                                </div>
                            </div>
                        ))}
                        <div className="flex w-1/2 ml-24 space-x-4">
                            <div className="flex flex-col space-y-2">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={session?.user?.image}
                                    alt=""
                                />
                                <p className="text-sm text-font-color-light font-semibold">{session?.user?.name}</p>
                            </div>
                            <form
                                onSubmit={(e) => AddReply(e, comment.id)}
                                className="w-full flex flex-col items-end">
                                <textarea
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                                    placeholder="Add a reply..."
                                ></textarea>
                                <button
                                    disabled={!reply}
                                    className="w-32 p-2 mt-2 text-white bg-primary rounded-lg hover:bg-primary-hover disabled:bg-font-color focus:outline-none focus:bg-primary-hover"
                                    type="submit"
                                >
                                    Reply
                                </button>
                            </form>
                        </div>
                    </div>
                ))

            }
        </div>
    );
}

export default Comments;

