/** @format */

import React, { useEffect, useRef, useState } from "react";

import { Events } from "@lib/common";
// import {ModalBox, Review} from '@components';
import ModalBox from ".";
import Review from "../Review";
import styles from "./styles";

const ReviewModal = () => {
  const [post, setPost] = useState("");
  const modalRef = useRef(null);

  const open = (newPost: any) => {
    setPost(newPost);
    // modalRef.current && modalRef.current?.openModal();
  };

  const close = () => {
    // modalRef.current && modalRef.current?.closeModal();
  };

  useEffect(() => {
    const sub = Events.onOpenModalReview(open);
    Events.onCloseModalReview(close);
    return () => {
      sub && sub.remove();
    };
  }, []);

  return (
    <ModalBox css={styles.boxComment} ref={modalRef}>
      {/* <Review post={{post}} /> */}
      <Review post={{ id: post, title: "title" }} />
    </ModalBox>
  );
};

export default ReviewModal;
