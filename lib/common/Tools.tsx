import { Config, Constants, Images, Languages } from "@lib/common";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import currencyFormatter from "currency-formatter";
import { decode } from "html-entities";
import truncate from "lodash/truncate";
import { ImageSourcePropType, PixelRatio } from "react-native";
import URI from "urijs";

/** ================= TYPES ================= */

export type MediaSize = {
  source_url: string;
};

export type MediaDetails = {
  sizes?: Record<string, MediaSize>;
};

export type FeaturedImage = {
  source_url: string;
  media_details?: MediaDetails;
};

export type ProductImage = {
  src: string;
};

export type Variation = {
  id: number;
  price?: number | string;
  image: {
    id: number;
    src: string;
  };
};

export type Product = {
  price?: number | string;
  regular_price?: number | string;
  images?: ProductImage[];
  tax_status?: string;
  tax_class?: string;
  ["multi-currency-prices"]?: Record<string, { price: number }>;
};

export type Currency = {
  code: string;
};

export type User = {
  first_name?: string;
  last_name?: string;
  name?: string;
  avatar_url?: string;
  picture?: {
    data?: {
      url?: string;
    };
  };
};

export type CartItem = {
  product: { id: number };
  quantity: number;
  variation?: { id: number } | null;
};

/** ================= UTILS ================= */

const toNumber = (value: unknown): number => {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value) || 0;
  return 0;
};

export default class Tools {
  /** ================= IMAGE ================= */

  static getImage(
    data?: { better_featured_image?: FeaturedImage | null },
    imageSize: string = "medium",
  ): string {
    if (!data?.better_featured_image) {
      return Constants.PlaceHolder;
    }

    const media = data.better_featured_image;

    const getImageSize = (mediaDetail?: MediaDetails): string => {
      if (!mediaDetail?.sizes) return media.source_url;

      return (
        mediaDetail.sizes[imageSize]?.source_url ||
        mediaDetail.sizes.medium?.source_url ||
        mediaDetail.sizes.full?.source_url ||
        media.source_url
      );
    };

    return getImageSize(media.media_details) || Constants.PlaceHolderURL;
  }

  static getProductImage(uri?: string, containerWidth = 100): string {
    const DPI_NUMBER = 0.5;

    if (!Config.ProductSize.enable || !uri) {
      return uri || Images.PlaceHolderURL;
    }

    const index = uri.lastIndexOf(".");
    if (index === -1) return uri;

    let base = uri.slice(0, index);
    const ext = uri.slice(index);

    const pixelWidth = PixelRatio.getPixelSizeForLayoutSize(containerWidth);

    if (pixelWidth * DPI_NUMBER < 300) {
      base += "-small";
    } else if (pixelWidth * DPI_NUMBER < 600) {
      base += "-medium";
    } else if (pixelWidth * DPI_NUMBER < 1400) {
      base += "-large";
    }

    return `${base}${ext}`;
  }

  static getImageVariation(
    product?: Product,
    variation?: Variation | null,
  ): string {
    if (!product?.images?.length) {
      return Images.PlaceHolderURL;
    }

    const defaultImage = this.getProductImage(product.images[0].src, 100);

    if (!variation) return defaultImage;

    return variation.image?.id === 0
      ? defaultImage
      : this.getProductImage(variation.image.src, 100);
  }

  /** ================= TEXT ================= */

  static getDescription(description?: string, limit = 50): string {
    if (!description) return "";

    const cleaned = description.replace("<p>", "");
    return decode(truncate(cleaned, { length: limit, separator: " " }));
  }

  /** ================= VIDEO ================= */

  static getLinkVideo(content?: string): string {
    if (!content) return "";

    const regExp =
      /^.*((youtube\.com\/)|(v\/)|(embed\/)|(watch\?v=))([^#&?\s]*).*/;

    let youtubeUrl = "";

    URI.withinString(content, (url: string) => {
      const match = url.match(regExp);
      if (match?.[6]?.length === 11) {
        youtubeUrl = `https://www.youtube.com/embed/${match[6]}`;
      }
      return url;
    });

    return youtubeUrl;
  }

  /** ================= STORAGE ================= */

  static async getFontSizePostDetail(): Promise<number> {
    try {
      const data = 16; // await AsyncStorage.getItem("@setting_fontSize");
      return data ? Number(data) : Constants.fontText.size;
    } catch {
      return Constants.fontText.size;
    }
  }

  /** ================= USER ================= */

  static getName(user?: User | null): string {
    if (!user) return Languages.Guest;

    if (user.first_name || user.last_name) {
      return `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim();
    }

    return user.name ?? Languages.Guest;
  }

  static getAvatar(user?: User | null): ImageSourcePropType {
    if (user?.avatar_url) {
      return { uri: user.avatar_url };
    }

    if (user?.picture?.data?.url) {
      return { uri: user.picture.data.url };
    }

    return Images.defaultAvatar;
  }

  /** ================= PRICE ================= */

  static getCurrencyFormatted(price?: number | string, currency?: any): string {
    if (price == null || price === "") return "";

    return currencyFormatter.format(toNumber(price), {
      ...(currency
        ? { ...Config.DefaultCurrency, ...currency }
        : Config.DefaultCurrency),
    });
  }

  static getRegularPrice({
    product,
    currency,
    isSale = false,
  }: {
    product: Product;
    currency?: Currency | null;
    isSale?: boolean;
  }): number | string | undefined {
    return currency && product["multi-currency-prices"]?.[currency.code]
      ? product["multi-currency-prices"][currency.code].price
      : product.price !== "" || isSale
        ? product.price
        : product.regular_price;
  }

  static getPriceIncludedTaxAmount(
    product?: Product,
    variation?: Variation | null,
    noFormat = false,
    currency?: Currency | null,
  ): number | string | null {
    if (!product) return null;

    const basePrice = toNumber(this.getRegularPrice({ product, currency }));

    const productPrice = variation?.price
      ? toNumber(variation.price)
      : basePrice;

    if (product.tax_status === "taxable" && product.tax_class) {
      const tax = toNumber(product.tax_class);
      const included = productPrice * ((100 + tax) / 100);

      return noFormat
        ? included
        : this.getCurrencyFormatted(included, currency);
    }

    return noFormat
      ? productPrice
      : this.getCurrencyFormatted(productPrice, currency);
  }

  static getMultiCurrenciesPrice(
    product?: Product,
    currency?: Currency,
  ): number {
    if (!product || !currency) return 0;

    return (
      product["multi-currency-prices"]?.[currency.code]?.price ??
      toNumber(product.price)
    );
  }

  /** ================= CART ================= */

  static getItemsToCheckout(cartItems: CartItem[]) {
    return cartItems.map((item) => ({
      product_id: item.product.id,
      quantity: item.quantity,
      ...(item.variation && {
        variation_id: item.variation.id,
      }),
    }));
  }
}
