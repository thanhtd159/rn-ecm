/** @format */

import EventEmitter from "@lib/services/app-event-emitter";

const closeModalLayout = () => EventEmitter.emit("modal.layout.close");

const openModalLayout = () => EventEmitter.emit("modal.layout.open");
const onOpenModalLayout = (func: any) =>
  EventEmitter.addListener("modal.layout.open", func);

// revemo
const openModalReview = (product: any) =>
  EventEmitter.emit("modal.review.open", product);
const closeModalReview = () => EventEmitter.emit("modal.review.close");
const onOpenModalReview = (func: any) =>
  EventEmitter.addListener("modal.review.open", func);
const onCloseModalReview = (func: any) =>
  EventEmitter.addListener("modal.review.close", func);

export default {
  openModalLayout,
  closeModalLayout,
  onOpenModalLayout,
  // review
  openModalReview,
  closeModalReview,
  onOpenModalReview,
  onCloseModalReview,
};
