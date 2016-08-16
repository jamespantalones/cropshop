# CROPSHOP
## Small Image Cropper

WARNING: ALPHA RELEASE IN ACTIVE DEVELOPMENT. MOST OF THE FEATURES BELOW WORK, BUT SOME ARE STILL UNDER CONSTRUCTION. USE AT YOUR OWN RISK. BREAKING CHANGES WILL OCCUR UNTIL BETA RELEASE – WHICH WILL BE SOON

This is a command line module that simply searches a given folder for images (currently .png, .jpg, .jpeg, and .gif) and renders those images in a number of different sizes. Why? Because now you have various options that can be loaded programmatically for a lazy load lifestyle. The module also pipes images through `imagemin` for compression.

### Setting up a CROPSHOP

You need ImageMagick + GraphicsMagick installed. I know. This is a downer. But I can't find another viable method that relies on simply Node. Sorry. However, if you are on Mac and have `hombrew` installed, the operation is trivial.

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


