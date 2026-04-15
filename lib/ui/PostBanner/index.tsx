/** @format */

// import { WishListIcon } from ".../WishListIcon/index/index";
import { Constants, Images, Tools } from "@/lib/common";
import { getProductImage } from "@/lib/Omni";
import { LinearGradient } from "expo-linear-gradient";
import React, { memo, useEffect } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TimeAgo from "react-native-timeago";
// import {useAppSelector} from '@redux/hooks';

import { useAppSelector } from "@/lib/store/useRedux";
import WishListIcon from "../WishListIcon";
import styles from "./styles";

const { width } = Dimensions.get("window");

const LIMIT = 4;
const PAGE = 1;

export interface PostBannerProps {
  type?: string;
  onViewItem?: (item: any) => void;
  animate?: boolean;
  animateOpacity?: boolean;
  fetchStickyNews?: (limit: number, page: number) => void;
  fetchStickyProducts?: (limit: number, page: number) => void;
}

const PostBanner = memo<PostBannerProps>(
  ({
    type,
    onViewItem,
    animate,
    animateOpacity,
    fetchStickyNews,
    fetchStickyProducts,
  }) => {
    const isProductList = type === undefined;
    const productsSticky = useAppSelector(
      (state: any) => state.products?.productSticky ?? [],
    );
    const newsSticky = useAppSelector((state: any) => state.news?.sticky ?? []);
    const list = isProductList ? productsSticky : newsSticky;

    useEffect(() => {
      if (typeof type !== "undefined") {
        fetchStickyNews?.(LIMIT, PAGE);
      } else {
        fetchStickyProducts?.(LIMIT, PAGE);
      }
    }, [type, fetchStickyNews, fetchStickyProducts]);

    const price = { top: 10, right: 15 };
    const priceRTL = { top: 10, left: 10 };

    const renderBanner = (post: any, i = 0) => {
      let imageUrl =
        typeof post.images !== "undefined"
          ? getProductImage(post.images[0].src, width)
          : Images.PlaceHolder;

      let postName =
        typeof post.name !== "undefined"
          ? Tools.getDescription(post.name, 300)
          : "";
      let postPrice = `${Tools.getPriceIncludedTaxAmount(post)} `;
      let postPriceSale = post.on_sale
        ? `${Tools.getCurrencyFormatted(post.price, "")} `
        : null;

      if (typeof type !== "undefined") {
        imageUrl = Tools.getImage(
          post,
          (Constants.PostImage as any).medium_large,
        );
        postName =
          typeof post.title !== "undefined"
            ? Tools.getDescription(post.title.rendered, 300)
            : "";
        postPrice = "";
        postPriceSale = "";
      }

      return (
        <Animated.View style={styles.bannerView} key={`sticky${i}`}>
          {typeof type === "undefined" && (
            <WishListIcon
              product={post}
              style={Constants.RTL ? priceRTL : price}
            />
          )}
          <Image
            style={styles.bannerImage}
            defaultSource={Images.PlaceHolder}
            source={{ uri: imageUrl as any }}
          />

          <TouchableOpacity
            onPress={() => onViewItem?.(post)}
            activeOpacity={1}
            style={styles.bannerText}
          >
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0, 0.7)"]}
              style={styles.bannerGradient}
            >
              <Animated.Text
                style={[
                  styles.bannerTitle,
                  { opacity: animateOpacity as any },
                  { transform: [{ translateY: animate as any }] },
                ]}
              >
                {postName}
              </Animated.Text>

              <Animated.View
                style={[
                  styles.bannerDate,
                  { opacity: animateOpacity as any },
                  { transform: [{ translateY: animate as any }] },
                ]}
              >
                {typeof type === "undefined" ? (
                  <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.price]}>{postPrice}</Text>
                    <Text
                      style={[post.on_sale && styles.sale_price, styles.price]}
                    >
                      {postPriceSale}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.time}>
                    <TimeAgo time={post.date} />
                  </View>
                )}
              </Animated.View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      );
    };

    if (list === null) {
      return (
        <View style={{ height: 200 }}>
          <Image
            style={styles.bannerImage}
            source={require("@images/placeholderImage.png")}
          />
        </View>
      );
    }

    return (
      <ScrollView
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {(list ?? []).map((post: any, i: number) => renderBanner(post, i))}
      </ScrollView>
    );
  },
  (prevProps, nextProps) =>
    prevProps.type === nextProps.type &&
    (prevProps.type === undefined ? (prevProps as any) : (nextProps as any)) ===
      (nextProps.type === undefined ? (nextProps as any) : (prevProps as any)),
);

PostBanner.displayName = "PostBanner";

export default PostBanner;
