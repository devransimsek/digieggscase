# Digieggs Case

## _Bu proje Digieggs firmasının test projesidir._

#

# Video

## --- Projeyi Çalıştırmak için Yapılması Gerekenler. ---

### Genel

```sh
git clone https://github.com/devransimsek/digieggscase
cd digieggscase
npm i
```

### Android

```sh
yarn android
```

bazen local.properties hatası alabilirsiniz. böyle bir durumda android klasörü içerisine local.properties dosyasını oluşturup
aşağıda ki kodu yapıştırın.

```sh
sdk.dir= your android sdk path
```

### iOS

```sh
cd ios
pod install
cd ..
yarn ios
```

Projeyi çalıştırmak için (iOS) xcode ile çalıştırmanızı öneririm.
