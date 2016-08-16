# CROPSHOP
## Small Image Cropper

WARNING: ALPHA RELEASE IN ACTIVE DEVELOPMENT. MOST OF THE FEATURES BELOW WORK, BUT SOME ARE STILL UNDER CONSTRUCTION. USE AT YOUR OWN RISK. BREAKING CHANGES WILL OCCUR UNTIL BETA RELEASE – WHICH WILL BE SOON

This module does only one thing. It makes your images 40px wide. Why does it do this? So that you can use that image as a placeholder for a lazy-loading solution and not have to bother with Photoshop actions. If you stretch a 40px wide image, it makes it look hazy and blurry, which is very cool. It pairs very well with [Phlegm]() for a lazy-loading lifestyle.

### Setting up a CROPSHOP

You need ImageMagick + GraphicsMagick installed

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

You will then get a prompt asking you to enter how many px wide you want your image. You can provide this information.

If you do nothing, it will default to 40px.

Hit enter.





*Cool logo by Stephanie Davidson*

