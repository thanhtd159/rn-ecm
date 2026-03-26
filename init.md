Mình sẽ hướng dẫn bạn **setup + config React Native với Expo (chuẩn 2025)** và cách build **Expo Dev Client + EAS** theo hướng enterprise (phù hợp với dự án bạn đang làm 👍).

---

# 🚀 1. Tổng quan kiến trúc

Bạn sẽ dùng:

- **Expo (managed + prebuild)** → dễ dev + vẫn custom native được
- **Expo Dev Client** → thay thế Expo Go (quan trọng)
- **EAS (Expo Application Services)** → build app thật (.apk/.ipa)

👉 Flow chuẩn:

```
Code → expo start (dev client)
     → npx expo run:android / ios
     → eas build (build app thật)
```

---

# 🧱 2. Setup môi trường

## Cài tools

```bash
npm install -g expo-cli
npm install -g eas-cli
```

👉 Login Expo:

```bash
expo login
```

---

# 📦 3. Tạo project Expo (chuẩn enterprise)

```bash
npx create-expo-app myApp
cd myApp
```

👉 Nên chọn:

- blank (TypeScript)

---

# ⚙️ 4. Cấu hình project

## Cài các lib cần thiết

```bash
npx expo install expo-dev-client
npx expo install expo-constants expo-device expo-updates
```

---

## Tạo file config `app.config.ts` (rất quan trọng)

```ts
import { ExpoConfig } from "@expo/config";

const IS_DEV = process.env.APP_ENV === "development";

const config: ExpoConfig = {
  name: "MyApp",
  slug: "my-app",
  version: "1.0.0",
  orientation: "portrait",
  scheme: "myapp",

  extra: {
    API_URL: IS_DEV ? "https://dev-api.com" : "https://prod-api.com",
  },

  ios: {
    bundleIdentifier: "com.myapp.mobile",
  },

  android: {
    package: "com.myapp.mobile",
  },

  plugins: ["expo-dev-client"],
};

export default config;
```

👉 Đây là chỗ bạn config:

- env
- bundleId
- deep link
- plugin native

---

# 🔥 5. Prebuild (generate native code)

```bash
npx expo prebuild
```

👉 Sau bước này sẽ có:

```
/android
/ios
```

👉 Lúc này bạn đang ở **Hybrid (managed + bare)**

---

# 📱 6. Build Expo Dev Client

## Android

```bash
npx expo run:android
```

## iOS

```bash
npx expo run:ios
```

👉 Kết quả:

- App custom cài vào máy (không phải Expo Go)
- Có thể dùng native module (MMKV, camera, v.v.)

---

## Start dev

```bash
npx expo start --dev-client
```

👉 Mở app Dev Client → connect metro

---

# ☁️ 7. Setup EAS Build

## Init EAS

```bash
eas init
```

---

## Tạo file `eas.json`

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  }
}
```

---

# 🏗️ 8. Build bằng EAS

## Build Dev Client trên cloud

```bash
eas build --profile development --platform android
```

👉 Kết quả:

- File `.apk` hoặc `.ipa`
- Dùng thay Expo Go

---

## Build production

```bash
eas build --platform android
```

---

# 🔑 9. Config ENV (rất quan trọng)

## Dùng `.env`

```bash
npm install react-native-dotenv
```

Hoặc dùng Expo built-in:

```bash
APP_ENV=development npx expo start
```

👉 Access:

```ts
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;
```

---

# 🧠 10. Best Practice (quan trọng với project của bạn)

## ✅ Nên dùng Dev Client thay Expo Go

Vì bạn đang dùng:

- redux-saga
- async-storage / mmkv
- native modules

👉 Expo Go sẽ bị giới hạn

---

## ✅ Kiến trúc chuẩn

```
src/
 ├── app/
 ├── features/
 ├── services/
 ├── store/
 ├── hooks/
 ├── utils/
```

---

## ✅ Navigation

Dùng:

```bash
npx expo install expo-router
```

👉 Tự động routing như NextJS

---

## ✅ Storage

Bạn đang dùng:

- AsyncStorage → OK
- MMKV → cần Dev Client

---

# ⚠️ 11. Các lỗi hay gặp

## ❌ Không connect được Dev Client

👉 Fix:

```bash
npx expo start --dev-client --clear
```

---

## ❌ Lỗi native sau khi install lib

👉 Fix:

```bash
npx expo prebuild --clean
```

---

## ❌ Hermes error

👉 Check:

```bash
android/app/build.gradle
```

---

# 🎯 12. Flow chuẩn team lớn (rất quan trọng)

👉 Dev:

```
git pull
npm install
npx expo prebuild
npx expo run:android
npx expo start --dev-client
```

👉 CI/CD:

```
eas build
eas submit
```

---

# 🚀 Kết luận

Bạn nên dùng stack:

- Expo + Dev Client ✅
- EAS Build ✅
- Redux Toolkit / Saga ✅
- AsyncStorage / MMKV ✅

👉 Đây là chuẩn production 2025 (thay vì Expo Go).

---

# 👉 Nếu bạn muốn

Mình có thể build cho bạn:

- ✅ Boilerplate Expo + Redux Saga (enterprise)
- ✅ Auth flow + refresh token queue
- ✅ API layer chuẩn (giống Angular bạn đang dùng)
- ✅ Navigation + feature-based architecture

Chỉ cần nói:
👉 _“build full template Expo enterprise cho tôi”_

git pull
npm install
npx expo prebuild
npx expo run:android
npx expo run:ios
npx expo start --dev-client --clear

CI/CD
eas build
eas submit

---

Navigation
npx expo install expo-router

Storage
AsyncStorage → OK
MMKV → cần Dev Client: npx expo install react-native-mmkv

multiple language
npx expo install expo-localization
npm install i18next react-i18next

Cache kết quả function (tránh tính lại nhiều lần)
npm install lodash.memoize
npm i --save-dev @types/lodash.memoize

Restart app (reload toàn bộ app)
npm install react-native-restart

UI & Styling

Library Mô tả Vai trò
uniwind Tailwind cho RN Styling
npm install nativewind
npm install --save-dev tailwindcss
npx tailwindcss init

tailwind-merge Merge class Tránh conflict class
npm install tailwind-merge

tailwind-variants Variant system Design system
npm i tailwind-variants

expo-image Image optimize Load ảnh nhanh
npx expo install expo-image

react-native-svg SVG Icon/vector
npx expo install react-native-svg

@expo-google-fonts/inter Font Typography
npx expo install @expo-google-fonts/inter expo-font

| Lib                          | Vai trò        |
| ---------------------------- | -------------- |
| react-native-reanimated      | animation mượt |
| react-native-gesture-handler | xử lý swipe    |

npx expo install react-native-reanimated react-native-gesture-handler
npm install @gorhom/bottom-sheet

Form & Validation
Library Mô tả Vai trò
@tanstack/react-form Form state Quản lý form
zod Schema validation Validate dữ liệu
@tanstack/zod-form-adapter Kết nối form + zod Validate tự động
npm install zod@^3.23.8
npm install @tanstack/react-form @tanstack/zod-form-adapter

Mình sẽ giải thích bộ **Form & Validation stack hiện đại (TanStack + Zod)** theo đúng hướng bạn đang build (Redux + enterprise UI) 👇

---

# 🧠 Tổng quan

| Library                    | Vai trò                   |
| -------------------------- | ------------------------- |
| @tanstack/react-form       | quản lý state form        |
| zod                        | validate dữ liệu          |
| @tanstack/zod-form-adapter | kết nối form + validation |

👉 Bộ này = **React Hook Form + Yup (phiên bản mới, mạnh hơn)**

---

# 🚀 1. Có nên dùng không?

👉 **CÓ (rất đáng dùng cho project lớn)**

### Ưu điểm:

- Type-safe 100% (TypeScript)
- Validate mạnh (Zod)
- Performance tốt (TanStack)
- Tách logic rõ (form ≠ validation)

---

# 📦 2. Cài đặt

```bash
npm install @tanstack/react-form zod @tanstack/zod-form-adapter
```

👉 Expo dùng OK (không cần native)

---

# 🧩 3. Ví dụ cơ bản

## 🔹 Bước 1: Tạo schema (Zod)

```ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Tối thiểu 6 ký tự"),
});
```

---

## 🔹 Bước 2: Tạo form

```ts
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";

const form = useForm({
  defaultValues: {
    email: "",
    password: "",
  },
  validatorAdapter: zodValidator(),
  validators: {
    onChange: loginSchema,
  },
  onSubmit: async ({ value }) => {
    console.log(value);
  },
});
```

---

## 🔹 Bước 3: Bind vào UI

```tsx
import { TextInput, Text, Button, View } from "react-native";

export const LoginScreen = () => {
  const form = useForm(...); // như trên

  return (
    <View>
      {/* Email */}
      <form.Field
        name="email"
        children={(field) => (
          <>
            <TextInput
              value={field.state.value}
              onChangeText={field.handleChange}
            />
            {field.state.meta.errors?.[0] && (
              <Text>{field.state.meta.errors[0]}</Text>
            )}
          </>
        )}
      />

      {/* Password */}
      <form.Field
        name="password"
        children={(field) => (
          <>
            <TextInput
              secureTextEntry
              value={field.state.value}
              onChangeText={field.handleChange}
            />
            {field.state.meta.errors?.[0] && (
              <Text>{field.state.meta.errors[0]}</Text>
            )}
          </>
        )}
      />

      <Button title="Login" onPress={form.handleSubmit} />
    </View>
  );
};
```

---

# 🔥 4. Flow hoạt động

```txt
User input
   ↓
TanStack Form (state)
   ↓
Zod validate
   ↓
Error trả về UI
```

---

# 🧠 5. Ưu điểm so với cách cũ

| Cách cũ             | Cách mới   |
| ------------------- | ---------- |
| FormGroup (Angular) | useForm    |
| Validator riêng     | Zod schema |
| Không type-safe     | Type-safe  |

---

# 🚀 6. Best Practice (rất quan trọng)

## ✅ 1. Tách schema riêng

```txt
features/auth/
 ├── login.schema.ts
 ├── login.form.ts
 ├── login.screen.tsx
```

---

## ✅ 2. Reuse schema cho API

```ts
type LoginRequest = z.infer<typeof loginSchema>;
```

👉 dùng luôn cho:

- form
- API request
- backend contract

---

## ✅ 3. Validate theo event

```ts
validators: {
  onChange: schema,
  onBlur: schema,
  onSubmit: schema,
}
```

---
