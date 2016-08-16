![cropshop logo](https://raw.githubusercontent.com/edweena/cropshop/master/logo.png)


# CROPSHOP

WARNING: ALPHA RELEASE IN ACTIVE DEVELOPMENT. BREAKING CHANGES MAY OCCUR UNTIL BETA RELEASE – WHICH WILL BE SOON


This is a command line module that simply searches a given folder for images (currently **.png, .jpg, .jpeg, and .gif**) and renders those images in a number of different sizes (currently **40px, 240px, 360px, 640px, 960px, 1280px, 1920px**). Why? Because now you have various options that can be loaded programmatically for a lazy load lifestyle. The module also pipes images through `imagemin` for compression. Also, all images maintain aspect ratio, so *technically* nothing is actually being cropped – just resized. 


### Setting up a CROPSHOP

You need ImageMagick + GraphicsMagick installed. This is a downer, but I can't find another viable method that relies on simply Node. Sorry. However, if you are on Mac and have `hombrew` installed, the operation is trivial.

```
brew install imagemagick
brew install graphicsmagick
```

Now use npm:
```
npm install -g cropshop
```

###Usage

Get into your image directory

```
cd mysite/somedirectory/images
```

And run the command

```
cropshop
```

You now have a bunch of other images.


