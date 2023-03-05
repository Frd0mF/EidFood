import React, { useRef, useState } from 'react'
import { useSession } from "next-auth/react";
import { BsHeart, BsHeartFill } from 'react-icons/bs';



function Comment({ comments, parentId, AddComment, reply, setReply, showReply, setShowReply }) {
    const { data: session } = useSession();
    const replyRef = useRef(null);
    const [isLiked, setIsLiked] = useState(false)
    const [numLikes, setNumLikes] = useState(0)
    const [heartIconHover, setHeartIconHover] = useState(false);

    const likeComment = async (commentId) => {
        await fetch(`/api/comments/likeComment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                commentId
            })
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                }
            }).then(data => {
                comments = comments[parentId].map((comment) => {
                    if (comment.id === commentId) {
                        if (data.message === 'Comment liked') {
                            comment.isLiked = true
                            comment.numLikes = data.numberOfLikes
                        } else {
                            comment.isLiked = false
                            comment.numLikes = data.numberOfLikes
                        }
                    }
                })
            })
            .catch(err => console.log(`Error: ${err}`)
            )
    };

    return (
        comments[parentId]?.map((comment) => (
            <div className="flex flex-col space-y-2 ml-4 pl-4 divide-x-2 divide-primary divide-opacity-40">
                <div className="flex space-x-4 items-center" key={comment.id}>
                    <img
                        className="w-10 h-10 rounded-full"
                        src={comment.user?.image}
                        alt=""
                    />
                    <div className="flex-1 p-2 border border-font-color-light border-opacity-20 rounded-lg">
                        <p className="font-semibold">{comment.user?.name}</p>
                        <p className="text-sm">{comment.text}</p>
                        {
                            comment.isLiked ?
                                (
                                    heartIconHover === comment?.id ?
                                        <>
                                            <p className="inline text-sm text-font-color-light font-semibold p-1">{comment?.numLikes}</p>
                                            <BsHeart
                                                onMouseLeave={() => setHeartIconHover(false)}
                                                onClick={() => likeComment(comment?.id)}
                                                className="inline w-4 h-4  text-primary" />
                                        </>
                                        :
                                        <>
                                            <p className="inline text-sm text-font-color-light font-semibold p-1">{comment?.numLikes}</p>
                                            <BsHeartFill
                                                onMouseEnter={() => setHeartIconHover(comment?.id)}
                                                onClick={() => likeComment(comment?.id)}
                                                className="inline w-4 h-4  text-primary" />
                                        </>
                                )
                                :
                                (
                                    heartIconHover === comment?.id ?
                                        <>
                                            <p className="inline text-sm text-font-color-light font-semibold p-1">{comment?.numLikes}</p>
                                            <BsHeartFill
                                                onMouseLeave={() => setHeartIconHover(false)}
                                                onClick={() => likeComment(comment?.id)}
                                                className="inline w-4 h-4  text-primary" />
                                        </>
                                        :
                                        <>
                                            <p className="inline text-sm text-font-color-light font-semibold p-1">{comment?.numLikes}</p>
                                            <BsHeart
                                                onMouseEnter={() => setHeartIconHover(comment?.id)}
                                                onClick={() => likeComment(comment?.id)}
                                                className="inline w-4 h-4  text-primary" />
                                        </>
                                )
                        }
                        <button
                            onClick={() => { showReply === comment?.id ? setShowReply(false) : setReply(''); setShowReply(comment?.id); replyRef.current?.focus() }}
                            className="text-sm text-primary ml-1.5 font-semibold hover:underline">Like</button>
                        <button
                            onClick={() => { showReply === comment?.id ? setShowReply(false) : setReply(''); setShowReply(comment?.id); replyRef.current?.focus() }}
                            className="text-sm text-primary ml-1.5 font-semibold hover:underline">Reply</button>
                        {
                            showReply === comment?.id && (
                                <div className="flex w-1/3 space-x-2">
                                    <div className="flex items-center flex-col space-y-2">
                                        <img
                                            className="w-6 h-6 rounded-full"
                                            src={session?.user?.image}
                                            alt=""
                                        />
                                        <p className="text-xs text-font-color-light font-semibold">{session?.user?.name}</p>
                                    </div>
                                    <form
                                        onSubmit={(e) => AddComment(e, comment.id, true)}
                                        className="w-full flex flex-col items-end">
                                        <textarea
                                            ref={replyRef}
                                            rows={1}
                                            value={reply}
                                            onChange={(e) => setReply(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                                            placeholder="Add a reply..."
                                        ></textarea>
                                        <button
                                            disabled={!reply}
                                            className="w-16 p-2 mt-2 text-white bg-primary text-xs rounded-lg hover:bg-primary-hover disabled:bg-font-color focus:outline-none focus:bg-primary-hover"
                                            type="submit"
                                        >
                                            Reply
                                        </button>
                                    </form>
                                </div>
                            )
                        }
                    </div>
                </div>
                <Comment comments={comments} parentId={comment.id} AddComment={AddComment} reply={reply} setReply={setReply} showReply={showReply} setShowReply={setShowReply} />
            </div>
        ))
    )
}

export default Comment