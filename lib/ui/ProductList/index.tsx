/** @format */

import { Constants, Languages, withTheme } from "@/lib/common";
import { useAppSelector } from "@/lib/store/useRedux";
import React, { memo, useCallback, useEffect, useRef } from "react";
import {
  Animated,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AdMob from "../AdMob";
import AnimatedHeader from "../AnimatedHeader";
import PostLayout from "../PostLayout";
import Spinkit from "../Spinkit";
import styles from "./styles";

// const HEADER_MIN_HEIGHT = 40;
// const HEADER_SCROLL_DISTANCE =
//   Constants.Window.headerHeight - HEADER_MIN_HEIGHT;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export interface ProductListProps {
  config?: { category?: any; tag?: any; name?: string; [key: string]: any };
  index?: number;
  page?: number;
  type?: string;
  headerImage?: any;
  fetchProductsByCollections?: (
    category: any,
    tag: any,
    page: number,
    index: number,
  ) => void;
  onViewProductScreen?: (product: any) => void;
  onViewNewsScreen?: (news: any) => void;
  navigation?: any;
  theme?: { colors: { background: string } };
}

const ProductListComponent: React.FC<ProductListProps> = (props) => {
  const {
    config = {},
    index = 0,
    fetchProductsByCollections,
    page: pageProp,
    type,
    headerImage,
    navigation,
    onViewProductScreen,
    onViewNewsScreen,
    theme,
  } = props;

  const background = theme?.colors?.background ?? "transparent";

  const list = useAppSelector((state: any) => {
    const layout = state?.layouts?.layout?.[index];
    return layout ? layout.list : [];
  });
  const isFetching = useAppSelector((state: any) => {
    const layout = state?.layouts?.layout?.[index];
    return layout ? layout.isFetching : false;
  });
  const currency = useAppSelector((state: any) => state?.currency);

  const scrollY = useRef(new Animated.Value(0)).current;
  const page = useRef(pageProp ? pageProp : 0);
  const isProductList = useRef(type === undefined);

  const fetchData = useCallback(
    (reload = false) => {
      if (reload) {
        page.current = 1;
      }
      fetchProductsByCollections?.(
        config.category,
        config.tag,
        page.current,
        index,
      );
    },
    [config.category, config.tag, fetchProductsByCollections, index],
  );

  useEffect(() => {
    if (page.current === 0) {
      fetchData();
    }
  }, [fetchData]);

  const handleLoadMore = useCallback(() => {
    page.current += 1;
    fetchData();
  }, [fetchData]);

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
    ({ item, index: itemIndex }: { item: any; index: number }) => {
      if (item == null) return <View />;

      const layout = Constants.Layout.twoColumn;

      return (
        <PostLayout
          post={item}
          type={type}
          key={`key-${itemIndex}`}
          onViewPost={() => onRowClickHandle(item, type)}
          layout={layout}
          currency={currency}
        />
      );
    },
    [type, currency, onRowClickHandle],
  );

  const headerComponent = useCallback(
    () => (
      <View style={styles.headerView}>
        <AdMob />
        {headerImage && (
          <Image style={styles.bannerImage} source={headerImage} />
        )}
      </View>
    ),
    [headerImage],
  );

  const renderFooter = () => {
    return isFetching ? (
      <Spinkit />
    ) : (
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleLoadMore} style={styles.footerBtn}>
          {isFetching ? (
            <Spinkit />
          ) : (
            <Text style={styles.footerBtnText}>{Languages.LoadMore}</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.listView, { backgroundColor: background }]}>
      {config.name && (
        <AnimatedHeader
          scrollY={scrollY}
          hideIcon
          label={config.name}
          navigation={navigation}
        />
      )}

      <AnimatedFlatList
        contentContainerStyle={styles.flatlist}
        data={list}
        keyExtractor={(item: any, index) => `${item.id} || ${index}`}
        renderItem={renderItem}
        ListHeaderComponent={headerComponent}
        ListFooterComponent={renderFooter()}
        refreshing={isFetching}
        numColumns={2}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => fetchData(true)}
          />
        }
        onEndReachedThreshold={0.5}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: Platform.OS !== "android" },
        )}
      />
    </View>
  );
};

const ProductList = memo<ProductListProps>(
  ProductListComponent,
  (prevProps, nextProps) => prevProps.index === nextProps.index,
);

ProductList.displayName = "ProductList";

export default withTheme(ProductList);
