import React, { useState } from 'react';
import CommentBox from './CommentBox/CommentBox';
import CommentList from './CommentList/CommentList';

const Comment = ({postId,type}) => {
    const [commentReload,setCommentReload] = useState(null);
    return (
        <div className='mt-5'>
            <CommentBox setCommentReload={setCommentReload} postId={postId} type={type}/>
            <CommentList commentReload={commentReload} postId={postId} type={type} />
        </div>
    );
};

export default Comment;