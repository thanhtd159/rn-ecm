/** @format */

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { I18nManager, Image, ScrollView, View } from "react-native";

// import { Accordion, Empty, Text } from '@components';
import { toast } from "@lib/Omni";
import { Color, Config, Icons, Languages, Tools } from "@lib/common";
// import { ROUTER } from '@app/navigation/constants';
// import { useAppSelector, useAppDispatch } from '@redux/hooks';

import { selectAuth } from "@/features/auth/store/auth-selector";
import { selectCategories } from "@/features/categories/store/category-selector";
import {
  Category,
  CategoryState,
} from "@/features/categories/store/category-type";
import { ROUTER } from "@/lib/constants/constants";
import { useAppDispatch, useAppSelector } from "@/lib/store/useRedux";
import Accordion from "../../Accordion";
import Empty from "../../Empty";
import Text from "../../Text/index";
import { DrawerButton, DrawerButtonChild } from "../DrawerButton";
import styles from "./styles";

// ================= TYPES =================
interface DrawerMultiChildProps {
  backgroundMenu?: string;
  colorTextMenu?: string;
  goToScreen: (route: string, params?: any, isPush?: boolean) => void;
}

// ================= HELPERS =================
const getButtonList = (user?: any) => {
  if (user) {
    return [...Config.menu.listMenu, ...Config.menu.listMenuLogged];
  }
  return [...Config.menu.listMenu, ...Config.menu.listMenuUnlogged];
};

// ================= COMPONENT =================
const DrawerMultiChild: React.FC<DrawerMultiChildProps> = ({
  backgroundMenu = "#FFF",
  colorTextMenu = Color.blackTextPrimary,
  goToScreen,
}) => {
  const dispatch = useAppDispatch();

  const userProfile = useAppSelector(selectAuth);
  const netInfo = useAppSelector((state) => state.netInfo);
  const categories = useAppSelector(selectCategories);

  const user = userProfile?.user;

  // ================= STATE =================
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const buttonList = useMemo(() => {
    return getButtonList(user);
  }, [user]);

  // ================= EFFECT =================
  useEffect(() => {
    if (!netInfo.isConnected) {
      toast(Languages.noConnection);
      return;
    }

    // TODO: dispatch fetch categories
    // dispatch(fetchCategories())
  }, []);

  useEffect(() => {
    if (categories?.error) {
      toast(categories.error);
    }
  }, [categories?.error]);

  // ================= METHODS =================
  const getCategories = useCallback(
    (cats: CategoryState, section?: Category) => {
      if (!cats?.list?.length) return [];

      return cats.list.filter((cate) =>
        section ? cate.parent === section.id : cate.parent === 0,
      );
    },
    [],
  );

  const handlePress = useCallback(
    (item: any, section?: Category) => {
      if (section) {
        const params = { ...item, mainCategory: section };
        setSelectedCategory(params);
        goToScreen(ROUTER.CATEGORY, params, false);
        return;
      }

      goToScreen(item.routeName, item.params, false);
    },
    [goToScreen],
  );

  // ================= RENDER =================
  const renderHeader = useCallback(
    (section: Category, index: number, isActive: boolean) => (
      <DrawerButtonChild
        key={index}
        iconRight={isActive ? Icons.Ionicons.Remove : Icons.Ionicons.Add}
        text={section.name}
        uppercase
        colorText={colorTextMenu}
        {...section}
      />
    ),
    [colorTextMenu],
  );

  const renderContent = useCallback(
    (section: Category) => {
      const subCategories = getCategories(categories, section);

      return (
        <View>
          <View style={{ marginLeft: 20 }}>
            <DrawerButton
              {...section}
              onPress={() => handlePress(section, section)}
              text={Languages.seeAll}
              textStyle={styles.textItem}
              colorText={colorTextMenu}
            />
          </View>

          {subCategories.map((cate) => (
            <View key={cate.id} style={{ marginLeft: 20 }}>
              <DrawerButton
                {...section}
                onPress={() => handlePress(cate, section)}
                text={cate.name.replace(/&amp;/g, "&")}
                textStyle={styles.textItem}
                colorText={colorTextMenu}
                isActive={selectedCategory?.id === cate.id}
              />
            </View>
          ))}
        </View>
      );
    },
    [categories, getCategories, handlePress, colorTextMenu, selectedCategory],
  );

  const renderRowCategories = () => {
    const mainCategories = getCategories(categories);

    if (!categories || categories.error) {
      return <Empty />;
    }

    if (!mainCategories.length) return null;

    return (
      <View>
        <View style={styles.headerCategory}>
          <Text style={styles.textHeaderCategory}>
            {Languages.Category?.toUpperCase()}
          </Text>
        </View>

        <Accordion
          underlayColor={Color.lightTextDisable}
          sections={mainCategories}
          renderHeader={renderHeader}
          renderContent={renderContent}
        />
      </View>
    );
  };

  // ================= USER INFO =================
  const avatar = Tools.getAvatar(user);
  const name = Tools.getName(user);

  // ================= UI =================
  return (
    <View style={[styles.container, { backgroundColor: backgroundMenu }]}>
      <View
        style={[styles.avatarBackground, { backgroundColor: backgroundMenu }]}
      >
        <Image
          source={avatar}
          style={[styles.avatar, I18nManager.isRTL && { left: -20 }]}
        />

        <View style={styles.textContainer}>
          <Text style={[styles.fullName, { color: colorTextMenu }]}>
            {name}
          </Text>
          <Text style={[styles.email, { color: colorTextMenu }]}>
            {user && user["email"] ? user["email"] : ""}
          </Text>
        </View>
      </View>

      <ScrollView>
        {buttonList.map((item, index) => (
          <DrawerButton
            key={index}
            {...item}
            onPress={() => handlePress(item)}
            icon={null}
            uppercase
            colorText={colorTextMenu}
            textStyle={styles.textItem}
          />
        ))}

        {renderRowCategories()}
      </ScrollView>
    </View>
  );
};

export default DrawerMultiChild;
