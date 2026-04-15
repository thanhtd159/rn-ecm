/** @format */

import { Constants, Styles, Tools } from "@/lib/common";
import { getProductImage } from "@/lib/Omni";
import React, { useCallback } from "react";

import CardLayout from "./Card";
import ColumnLayout from "./Column";
import _ReadMoreLayout from "./ReadMore";
import SimpleLayout from "./Simple";
import ThreeColumn from "./ThreeColumn";
const ReadMoreLayout = _ReadMoreLayout as any;

export interface PostLayoutProps {
  post: any;
  layout?: string;
  type?: string;
  navigate?: (screen: string) => void;
  onViewPost?: (post: any) => void;
  categories?: Record<string | number, any>;
  currency?: { symbol: string };
}

const PostLayout: React.FC<PostLayoutProps> = (props) => {
  const { navigate } = props;

  const viewCategoryDetail = useCallback(
    (id) => {
      Tools.viewCateDetail(id);
      navigate("Default");
    },
    [navigate],
  );

  const data = props.post;
  const { onViewPost, type, currency } = props;
  const isProduct = type == "undefined";

  let image_width = 0;
  let imageURL = "";

  const categories = props.categories ? props.categories : 1;
  const cate = typeof data.categories !== "undefined" ? data.categories[0] : 1;
  let postTitle = typeof data.name === "undefined" ? "" : data.name;

  if (typeof type !== "undefined") {
    // news type
    imageURL = Tools.getImage(data, Constants.PostImage.large);
    postTitle =
      typeof data.title !== "undefined"
        ? Tools.getDescription(data.title.rendered, 300)
        : "";
  } else {
    // product type
    image_width = Constants.Layout.card
      ? Styles.width
      : Styles.width * 0.45 - 2;
    imageURL =
      data.images && data.images.length
        ? getProductImage(data.images[0].src, image_width)
        : "";
  }

  switch (props.layout) {
    case Constants.Layout.simple:
      return (
        <SimpleLayout
          imageURL={imageURL}
          title={Tools.getDescription(postTitle, 100)}
          viewPost={onViewPost}
          post={data}
          type={type}
          category={categories[cate]}
          date={type ? data.date : data.date_created}
          currency={currency}
        />
      );

    case Constants.Layout.card:
      return (
        <CardLayout
          imageURL={imageURL}
          title={Tools.getDescription(postTitle, 300)}
          viewPost={onViewPost}
          post={data}
          type={type}
          date={type ? data.date : data.date_created}
          currency={currency}
        />
      );

    case Constants.Layout.twoColumn:
      return (
        <ColumnLayout
          imageURL={imageURL}
          title={Tools.getDescription(postTitle)}
          viewPost={onViewPost}
          post={data}
          type={type}
          date={type ? data.date : data.date_created}
          currency={currency}
        />
      );

    case Constants.Layout.threeColumn: {
      const threeColImageURL = isProduct
        ? getProductImage(data.images[0].src, Styles.width / 3)
        : imageURL;
      return (
        <ThreeColumn
          imageURL={threeColImageURL}
          title={Tools.getDescription(postTitle)}
          viewPost={onViewPost}
          post={data}
          type={type}
          date={type ? data.date : data.date_created}
          currency={currency}
        />
      );
    }

    case Constants.Layout.list:
      return (
        <ReadMoreLayout
          imageURL={imageURL}
          title={Tools.getDescription(postTitle)}
          viewPost={onViewPost}
          post={data}
          type={type}
          date={type ? data.date : data.date_created}
          currency={currency}
        />
      );

    default: {
      const defaultImageURL = isProduct
        ? getProductImage(data.images[0].src, Styles.width / 3)
        : imageURL;
      return (
        <ThreeColumn
          imageURL={defaultImageURL}
          title={Tools.getDescription(postTitle)}
          viewPost={onViewPost}
          post={data}
          type={type}
          date={type ? data.date : data.date_created}
          currency={currency}
        />
      );
    }
  }
};

export default PostLayout;
