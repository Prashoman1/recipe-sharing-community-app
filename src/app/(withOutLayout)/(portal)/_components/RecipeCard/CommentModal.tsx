/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Modal from "@/app/_components/shared/Modal/Modal";
import {
  createCommentByRecipe,
  getCommentsByRecipe,
} from "@/services/CommentApi";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface CommentModalProps {
  modalRef: any;

  setRefetch: any;
  refetch: any;
  recipeId: any;
}

const CommentModal = ({
  modalRef,

  refetch,
  setRefetch,
  recipeId,
}: CommentModalProps) => {
  const [commentText, setCommentText] = useState<any>("");
  const [commentsData, setCommentsData] = useState<any[]>([]);
  const [commentFetch, setCommentFetch] = useState(false);
//   const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    
    try {
      const response = await getCommentsByRecipe(recipeId);
      if (response?.success) {
        setCommentsData(response.data);
       
      } 
    } catch (error) {
      
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [recipeId, commentFetch]);

  const handleAddComment = async () => {
    // console.log(commentText);
    const insertComment = {
      recipe: recipeId,
      comment: commentText,
    };
    try {
      const res = await createCommentByRecipe(insertComment);
      console.log({ res });

      if (res?.success) {
        toast.success(res?.message);
        setCommentText("");
        setRefetch(!refetch);
        setCommentFetch(!commentFetch);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  return (
    <div>
      <Modal modalRef={modalRef}>
        <>
          <div className="w-full max-h-[200px] overflow-y-scroll">
            {commentsData && commentsData.length > 0 ? (
              <ul>
            
                {commentsData.map((comment: any, index: number) => (
                  <li key={index} className="border-b py-2 text-gray-700">
                    <Link
                      href={`/profile/${comment.user._id}`}
                      className="flex items-center space-x-2"
                    >
                      <Image
                        src={
                          comment?.user?.profileImage ||
                          "https://i.ibb.co/K0wG22V/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg"
                        }
                        alt="User Image"
                        width={30}
                        height={30}
                        className="w-7 h-7 rounded-full"
                      />
                      <p className="font-bold">{comment.user.userName}</p>
                    </Link>
                    <span className="ps-7 py-1">{comment.comment}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 text-center">No comments found</p>
            )}
          </div>
          <div className="mt-2">
            <textarea
              className="w-full border p-2 rounded-md"
              placeholder="Leave a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <button
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={handleAddComment}
            >
              Add Comment
            </button>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default CommentModal;
