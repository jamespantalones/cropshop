![cropshop logo](https://raw.githubusercontent.com/edweena/cropshop/master/logo.png)


# CROPSHOP

DISCLAIMER: BETA RELEASE IN ACTIVE DEVELOPMENT

**UPDATE 0.0.61 / AUG 18 2016: SPECIFY CUSTOM CROP WIDTHS VIA COMMAND LINE**

This is a command line module that simply searches a given folder for images (currently **.png, .jpg, .jpeg, and .gif**) and renders those images in a number of specified sizes. Why? Because now you have various options that can be loaded programmatically for a lazy load lifestyle. The module also pipes images through `imagemin` for compression. Also, all images maintain aspect ratio, so *technically* nothing is actually being cropped – just resized. Although cropping options in the works for social media sharing.


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

And run the command, with a space separated list of widths you want to size to ala:

```
cropshop 1280 960 640 360
```

The above command will create images at that width for each valid image in the directory with a naming convention like so: `myimage_crop_1280.png, myimage_crop_960.png, etc`

The original file will not be modified in size or name.

Alternatively, you can specify a flag `--image` (or `i` for short) that will only run resizes on the specified image. Like:

```
cropshop 512 666 --image myimage.jpg
```

You now have a bunch of other images to play with.


*UPCOMING FEATURES*
*- Allow users to specify using _ or - as delineator.*
*- Allow actual 2D crop sizes to be passed in for specific images like `666x100`*
*- Offer more compression options*


