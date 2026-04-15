/** @format */

import React, { memo, useCallback, useEffect, useRef } from "react";
import { Animated, FlatList, RefreshControl, Text, View } from "react-native";

import { Constants, Layout, withTheme } from "@/lib/common";

import { useAppSelector } from "@/lib/store/useRedux";
import PostBanner from "../PostBanner";
import PostLayout from "../PostLayout";
import styles from "./styles";

const HEADER_MIN_HEIGHT = 40;
const HEADER_SCROLL_DISTANCE =
  Constants.Window.headerHeight - HEADER_MIN_HEIGHT;

export interface PostListProps {
  type?: string;
  headerLabel?: string;
  parentLayout?: string;
  fetchProducts?: (limit: number, page: number) => void;
  fetchNews?: (limit: number, page: number) => void;
  initProduct?: () => void;
  initNews?: () => void;
  onViewProductScreen?: (product: any) => void;
  onViewNewsScreen?: (news: any) => void;
  theme?: { colors: { background: string; text: string } };
}

const PostList = memo<PostListProps>((props) => {
  const {
    type,
    headerLabel,
    parentLayout,
    fetchProducts,
    fetchNews,
    initProduct,
    initNews,
    onViewProductScreen,
    onViewNewsScreen,
    theme,
  } = props;

  const {
    colors: { background, text },
  } = theme ?? { colors: { background: "", text: "" } };

  const list = useAppSelector((state: any) =>
    typeof type === "undefined" ? state.products.listAll : state.news.list,
  );
  const isFetching = useAppSelector(
    (state: any) => state.products.isFetching || state.news.isFetching,
  );
  const layoutHome = useAppSelector((state: any) => state.products.layoutHome);
  const currency = useAppSelector((state: any) => state.currency);

  const scrollY = useRef(new Animated.Value(0)).current;
  const page = useRef(1);
  const limit = useRef(Constants.pagingLimit);
  const isProductList = useRef(type === undefined);

  const fetchData = useCallback(
    (reload = false) => {
      if (reload) {
        page.current = 1;
      }
      if (isProductList.current) {
        initProduct?.();
        fetchProducts?.(limit.current, page.current);
      } else {
        initNews?.();
        fetchNews?.(limit.current, page.current);
      }
    },
    [fetchProducts, fetchNews, initProduct, initNews],
  );

  useEffect(() => {
    if (page.current === 1) {
      fetchData();
    }
  }, [fetchData]);

  const nextPosts = useCallback(() => {
    page.current += 1;
    if (isProductList.current) {
      fetchProducts?.(limit.current, page.current);
    } else {
      fetchNews?.(limit.current, page.current);
    }
  }, [fetchProducts, fetchNews]);

  const onRowClickHandle = useCallback(
    (item: any, _type?: string) => {
      if (isProductList.current) {
        onViewProductScreen?.({ product: item });
      } else {
        onViewNewsScreen?.({ post: item });
      }
    },
    [onViewProductScreen, onViewNewsScreen],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      if (item == null) return <View />;

      let layout = null;

      if (typeof layoutHome !== "undefined") {
        layout = layoutHome;
      }

      if (
        layout === null ||
        (layout === Constants.Layout.horizon &&
          typeof parentLayout !== "undefined")
      ) {
        layout = parentLayout;
      }

      if (layout === Constants.Layout.advance) {
        layout = Layout[index % Layout.length];
      }

      return (
        <PostLayout
          post={item}
          type={type}
          key={`key-${index}`}
          onViewPost={() => onRowClickHandle(item, type)}
          layout={layout}
          currency={currency}
        />
      );
    },
    [type, parentLayout, layoutHome, currency, onRowClickHandle],
  );

  const animateOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: "clamp",
  });

  const titleTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -50, -150],
    extrapolate: "clamp",
  });

  const headerComponent = useCallback(() => {
    if (typeof headerLabel != "undefined") {
      return (
        <View style={styles.headerLabel}>
          <View style={styles.headerLeft}>
            <Text style={[styles.tagHeader, { color: text }]}>
              {headerLabel}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <PostBanner
        onViewItem={onRowClickHandle}
        type={type}
        animateOpacity={animateOpacity as unknown as boolean}
        animate={titleTranslate as unknown as boolean}
      />
    );
  }, [
    headerLabel,
    text,
    type,
    onRowClickHandle,
    animateOpacity,
    titleTranslate,
  ]);

  let numColumns = 1;
  let styless = {};

  if (typeof parentLayout !== "undefined") {
    if (parentLayout === Constants.Layout.twoColumn) {
      numColumns = 2;
      styless = {};
    } else if (parentLayout === Constants.Layout.threeColumn) {
      numColumns = 3;
      styless = {};
    } else {
      styless = { flexWrap: "wrap", flexDirection: "row" };
    }
  }
  if (!isProductList.current) {
    numColumns = 3;
    styless = {};
  }

  return (
    <FlatList
      overScrollMode="never"
      style={{ backgroundColor: background }}
      contentContainerStyle={[
        styles.flatlist,
        { backgroundColor: background },
        styless,
      ]}
      data={list}
      key={numColumns === 1 ? "1" : numColumns === 2 ? "2" : "3"}
      keyExtractor={(item, index) => `post_${item.id}_${index}`}
      renderItem={renderItem}
      scrollEventThrottle={1}
      numColumns={numColumns}
      refreshing={isFetching}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={() => fetchData(true)}
        />
      }
      ListHeaderComponent={headerComponent}
      onEndReachedThreshold={10}
      onEndReached={nextPosts}
    />
  );
});

PostList.displayName = "PostList";

export default withTheme(PostList);
