/*
 *
 * A Gallery and Imageviewer library
 * Author: Marcel Bohland Copyright 2021
 * Version: 0.2.0
 * url: https://github.com/marcelbohland
 * License: Apache License 2.0:
 *
 *
 * Copyright 2021 Marcel Bohland
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
//Variablen
monoImageView = 0;
monoImageViewURL = "";
AutoWidth = 0;
//Masaic
array = [30];
className = "";
gallerySlideArray = [2000];

class JavaScriptGallery {
  //Variablen
  added = 0;
  ImageIndex = 0;
  viewerPosition = 0;
  transition = "opacity";
  enableViewOriginalPictureVal = 0;
  zoomVal = 0;
  share = 0;
  backgroundcolor = "#000000e8";
  galleryStyle = "normal";
  //Masaic
  GalleryWidth = 0;
  imageWidth = 0;
  galleryPos = 1;
  disabelInitMove = false;
  //Galery Slide
  speed = 300;
  animation = true;
  dots = true;
  constructor() {}
  enableDoubleClick() {
    var self = this;
    $(".ViewerImage").dblclick(function () {
      self.zoom();
    });
  }

  backgroundColor(color) {
    this.backgroundcolor = color;
  }

  enableAutoWidth() {
    AutoWidth = 1;
  }

  mosaic() {
    $(".Gallery").show();

    let row = 0;
    let column = 0;
    let x = 5;
    let y = 3;
    let xminus = 4;
    let yminus = 4;
    let imageWidth = 0;

    this.GalleryWidth = $(".Gallery").width();
    for (i = 0; i < this.ImageIndex; i++) {
      if (this.GalleryWidth > 1500) {
        x = 6;
        y = 4;
      }

      if (this.GalleryWidth > 2000) {
        x = 7;
        y = 5;
      }

      if (this.GalleryWidth < 700) {
        x = 4;
        y = 2;
      }
      if (this.GalleryWidth < 500) {
        x = 2;
        y = 1;
      }

      if (row % 2 == 0) {
        imageWidth = this.GalleryWidth / x - xminus;
        $(".Gallery #" + i).css("max-width", imageWidth + "px");
        $(".Gallery #" + i).css("min-width", imageWidth + "px");
        $(".Gallery #" + i).css("width", imageWidth + "px");
        $(".Gallery #" + i).css("max-height", "175px");
        $(".Gallery #" + i).css("min-height", "175px");
        if (column == x - 1) {
          row++;
          column = -1;
        }
        if ($(".Gallery #" + i).length) {
          column++;
        }
      } else {
        imageWidth = this.GalleryWidth / y - yminus;
        $(".Gallery #" + i).css("max-width", imageWidth + "px");
        $(".Gallery #" + i).css("min-width", imageWidth + "px");
        $(".Gallery #" + i).css("width", imageWidth + "px");
        $(".Gallery #" + i).css("max-height", "200px");
        $(".Gallery #" + i).css("min-height", "200px");
        if (column == y - 1) {
          row++;
          column = -1;
        }
        if ($(".Gallery #" + i).length) {
          column++;
        }
      }
    }
  }

  addGallery(Data) {
    // Adds images and a headline to the Gallery

    var obj = jQuery.parseJSON(Data);
    var self = this;
    $.each(obj, function (i, item) {
      if (self.galleryStyle == "tiles") {
        className = "tiles";
      }
      if (self.galleryStyle == "full") {
        className = "full";
      }
      if (self.galleryStyle == "center") {
        className = "center";
      }
      if (self.galleryStyle == "Circles") {
        className = "Circles";
      }
      if (self.galleryStyle == "mosaic") {
        className = "mosaic";
      }

      if (className != "mosaic") {
        $(".Gallery").append("<p>" + obj.Entry.Title + "</p>");
      } else {
        $(".Gallery").hide();
      }
      length = Object.keys(obj.Entry.Image).length;

      $(".addToGallery").each(function () {
        $(this).attr("id", self.ImageIndex);
        $(this).addClass("addedToGallery");
        self.ImageIndex++;
      });

      for (i = 0; i < length; i++) {
        // Check if preview Image exsits
        let x = 1;
        if (obj.Entry.Image[i].includes(".jpeg#preview")) {
          x = 2;
        } else if (obj.Entry.Image[i].includes(".jpg#preview")) {
          x = 2;
        } else if (obj.Entry.Image[i].includes(".png#preview")) {
          x = 2;
        } else if (obj.Entry.Image[i].includes(".webp#preview")) {
          x = 2;
        } else {
          x = 1;
        }
        if (x == 1) {
          $(".Gallery").append(
            '<img loading="lazy" class="' +
              className +
              '" alt="Image' +
              self.ImageIndex +
              '" width="300px" height="169px" class="fadein" id="' +
              self.ImageIndex +
              '" onClick="JavaScriptGallery.openViewer(this.id)" src="' +
              obj.Entry.Image[i] +
              '"/>'
          );
          self.ImageIndex++;
        } else {
          let split;
          let newURL;
          if (obj.Entry.Image[i].includes(".jpeg")) {
            split = obj.Entry.Image[i].split(".jpeg");
            newURL = split[0] + "-preview.jpeg#preview";
          } else if (obj.Entry.Image[i].includes(".jpg")) {
            split = obj.Entry.Image[i].split(".jpg");
            newURL = split[0] + "-preview.jpg#preview";
          } else if (obj.Entry.Image[i].includes(".png")) {
            split = obj.Entry.Image[i].split(".png");
            newURL = split[0] + "-preview.png#preview";
          } else if (obj.Entry.Image[i].includes(".webp")) {
            split = obj.Entry.Image[i].split(".webp");
            newURL = split[0] + "-preview.webp#preview";
          }
          $(".Gallery").append(
            '<img loading="lazy" class="' +
              className +
              '" alt="Image' +
              self.ImageIndex +
              '" width="300px" height="169px" class="fadein" id="' +
              self.ImageIndex +
              '" onClick="JavaScriptGallery.openViewer(this.id)" src="' +
              newURL +
              '"/>'
          );
          self.ImageIndex++;
        }
      }
    });
    this.addPlayer();
  }

  //Check if preview Image Exsists
  AjaxCall(obj, i) {
    if (obj.Entry.Image[i].includes(".jpeg#preview")) {
      return 2;
    } else if (obj.Entry.Image[i].includes(".jpg#preview")) {
      return 2;
    } else if (obj.Entry.Image[i].includes(".png#preview")) {
      return 2;
    } else if (obj.Entry.Image[i].includes(".webp#preview")) {
      return 2;
    } else {
      return 1;
    }
  }

  //Check if a Image is only a Preview
  checkPreviewState(url) {
    let newURL = url;
    if (url.includes("-preview.jpeg#preview")) {
      split = url.split("-preview.jpeg#preview");
      newURL = split[0] + ".jpeg";
    } else if (url.includes("-preview.jpg#preview")) {
      split = url.split("-preview.jpg#preview");
      newURL = split[0] + ".jpg";
    } else if (url.includes("-preview.png#preview")) {
      split = url.split("-preview.png#preview");
      newURL = split[0] + ".png";
    } else if (url.includes("-preview.webp#preview")) {
      split = url.split("-preview.webp#preview");
      newURL = split[0] + ".webp";
    }
    return newURL;
  }

  addImageViewer() {
    // Adds player HTML code to GalleryViewer Div container
    var self = this;
    if (this.added == 0) {
      $("body").append(
        '<div style="background-color:' +
          self.backgroundcolor +
          ';" class="GalleryViewer"></div>'
      );
      $(".GalleryViewer").append(
        '<img class="ViewerImage" id="ViewerImage" src="" />'
      );
      $(".GalleryViewer").append(
        '<svg onClick="JavaScriptGallery.left()" class="ArrowLeft" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>'
      );
      $(".GalleryViewer").append(
        '<svg onClick="JavaScriptGallery.right()" class="Arrowright"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>'
      );
      // $('.GalleryViewer').append('<img onClick="closeViewer()" class="GalleryViewerClose" src="https://static.thenounproject.com/png/2341854-200.png" />');
      $(".GalleryViewer").append(
        '<svg onClick="JavaScriptGallery.closeViewer()" class="GalleryViewerClose" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>'
      );
      if (this.enableViewOriginalPictureVal == 1) {
        $(".GalleryViewer").append(
          '<svg onClick="JavaScriptGallery.openImage()" class="GalleryViewerOpen"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>'
        );
        $(".GalleryViewer").append(
          '<svg onClick="JavaScriptGallery.zoom()" class="GalleryViewerZoom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/></svg>'
        );
      }
      if (this.share == 1) {
        $(".GalleryViewer").append(
          '<svg onClick="JavaScriptGallery.Share()" class="GalleryViewerShare" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0z" fill="none"/><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>'
        );
        $(".GalleryViewer").append('<div class="sharebuttons"></div>');
        $(".sharebuttons").append(
          '<p onClick="JavaScriptGallery.shareFacebook()">Facebook</p>'
        );
        $(".sharebuttons").append(
          '<p onClick="JavaScriptGallery.shareTwitter()">Twitter</p>'
        );
        $(".sharebuttons").append(
          '<p onClick="JavaScriptGallery.shareGetLink()">Get the Link</p>'
        );
      }
      this.added = 1;
      $(".GalleryViewer").hide();
    }
  }
  addPlayer() {
    // Adds player HTML code to GalleryViewer Div container
    var self = this;
    if (this.added == 0) {
      $("body").append(
        '<div style="background-color:' +
          self.backgroundcolor +
          ';" class="GalleryViewer"></div>'
      );
      $(".GalleryViewer").append(
        '<img class="ViewerImage" id="ViewerImage" src="" />'
      );
      $(".GalleryViewer").append(
        '<video class="ViewerVideo" id="ViewerVideo" autoplay="" muted="" loop="" controls> <source src="" type="video/mp4"> </video>'
      );
      $(".GalleryViewer").append(
        '<svg onClick="JavaScriptGallery.left()" class="ArrowLeft" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>'
      );
      $(".GalleryViewer").append(
        '<svg onClick="JavaScriptGallery.right()" class="Arrowright"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>'
      );
      // $('.GalleryViewer').append('<img onClick="closeViewer()" class="GalleryViewerClose" src="https://static.thenounproject.com/png/2341854-200.png" />');
      $(".GalleryViewer").append(
        '<svg onClick="JavaScriptGallery.closeViewer()" class="GalleryViewerClose" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>'
      );
      if (this.enableViewOriginalPictureVal == 1) {
        $(".GalleryViewer").append(
          '<svg onClick="JavaScriptGallery.openImage()" class="GalleryViewerOpen"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>'
        );
        $(".GalleryViewer").append(
          '<svg onClick="JavaScriptGallery.zoom()" class="GalleryViewerZoom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/></svg>'
        );
      }
      if (this.share == 1) {
        $(".GalleryViewer").append(
          '<svg onClick="JavaScriptGallery.Share()" class="GalleryViewerShare" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0z" fill="none"/><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>'
        );
        $(".GalleryViewer").append('<div class="sharebuttons"></div>');
        $(".sharebuttons").append(
          '<p onClick="JavaScriptGallery.shareFacebook()">Facebook</p>'
        );
        $(".sharebuttons").append(
          '<p onClick="JavaScriptGallery.shareTwitter()">Twitter</p>'
        );
        $(".sharebuttons").append(
          '<p onClick="JavaScriptGallery.shareGetLink()">Get the Link</p>'
        );
      }
      this.added = 1;
      $(".GalleryViewer").hide();
      $(".ViewerVideo").hide();
    }
  }
  closeViewer() {
    $("body").css("overflow", "unset");
    $(".GalleryViewer").hide();
    $(".Arrowright").show();
    $(".ArrowLeft").show();
    $(".sharebuttons").hide();
    $(".ViewerImage").css("object-fit", "contain");
    $(".ViewerImage").animate({ height: "55%", "max-height": "80%" }, 0);
    $(".ViewerImage").css("height", "unset");
    $(".ViewerImage").css({
      width: "",
      "max-height": "80%",
      top: "0",
      right: "0",
      left: "0",
    });
    $(".ViewerImage").draggable({ disabled: true });
    this.zoomVal = 0;
    monoImageView = 0;
    monoImageViewURL = "";
  }

  checkPreviewState(url) {
    let newURL = url;
    let split;
    if (url.includes("-preview.jpeg#preview")) {
      split = url.split("-preview.jpeg#preview");
      newURL = split[0] + ".jpeg";
    } else if (url.includes("-preview.jpg#preview")) {
      split = url.split("-preview.jpg#preview");
      newURL = split[0] + ".jpg";
    } else if (url.includes("-preview.png#preview")) {
      split = url.split("-preview.png#preview");
      newURL = split[0] + ".png";
    } else if (url.includes("-preview.webp #preview")) {
      split = url.split("-preview.webp #preview");
      newURL = split[0] + ".webp ";
    }
    return newURL;
  }

  openViewer(clicked_id) {
    let type = this.CheckRessourceType(clicked_id);

    if (type == "VIDEO") {
      $("body").css("overflow", "hidden");
      this.viewerPosition = parseInt(clicked_id);
      var url = $("#" + clicked_id + " source").attr("src");

      url = this.checkPreviewState(url);

      $(".ViewerVideo > source").attr("src", url);
      $(".ViewerVideo")[0].load();

      $(".ViewerImage").hide();
      $(".ViewerVideo").show();
      $(".GalleryViewer").show();
    } else {
      $("body").css("overflow", "hidden");
      this.viewerPosition = parseInt(clicked_id);
      var url = document.getElementById(clicked_id).src;

      url = this.checkPreviewState(url);

      $(".ViewerImage").attr("src", url);

      // Check the aspect ratio and set params
      this.setParamsByRatioOfImage(url);

      $(".GalleryViewer").show();
      $(".ViewerImage").show();
      $(".ViewerVideo").hide();
    }
  }
  left() {
    $(".ViewerImage").css({
      width: "80%",
      "max-height": "80%",
      top: "0",
      right: "0",
      left: "0",
    });
    //Image
    $(".ViewerImage").draggable({ disabled: true });
    $(".ViewerImage").css("object-fit", "contain");
    $(".ViewerImage").animate({ height: "55%", "max-height": "80%" }, 1);
    $(".ViewerImage").css("height", "unset");
    //Video
    $(".ViewerVideo").css({
      width: "80%",
      "max-height": "80%",
      top: "0",
      right: "0",
      left: "0",
    });
    $(".ViewerVideo").draggable({ disabled: true });
    $(".ViewerVideo").animate({ height: "55%", "max-height": "80%" }, 1);
    $(".ViewerVideo").css("height", "unset");
    this.zoomVal = 0;
    this.viewerPosition = this.viewerPosition - 1;
    if (this.viewerPosition >= 0) {
      let new_type = this.CheckRessourceType(this.viewerPosition);

      //Video
      if (new_type == "VIDEO") {
        var url = $("#" + this.viewerPosition + " source").attr("src");

        $(".ViewerVideo > source").attr("src", url);
        $(".ViewerVideo")[0].load();

        //Run transition animation
        this.transitionLeft(this.transition, "ViewerVideo");

        $(".ViewerImage").hide();
        $(".ViewerVideo").show();
        $(".GalleryViewer").show();
      } else {
        //Image
        var url = document.getElementById(this.viewerPosition).src;

        url = this.checkPreviewState(url);

        $(".ViewerImage").attr("src", url);

        // Check the aspect ratio and set params
        this.setParamsByRatioOfImage(url);

        //Run transition animation
        this.transitionLeft(this.transition, "ViewerImage");
        $(".ViewerImage").show();
        $(".ViewerVideo").hide();
      }
    } else {
      this.viewerPosition = this.viewerPosition + 1;
    }
  }

  right() {
    //Image
    $(".ViewerImage").css({
      width: "80%",
      "max-height": "80%",
      top: "0",
      right: "0",
      left: "0",
    });
    $(".ViewerImage").draggable({ disabled: true });
    $(".ViewerImage").css("object-fit", "contain");
    $(".ViewerImage").animate({ height: "55%", "max-height": "80%" }, 1);
    $(".ViewerImage").css("height", "unset");
    //Video
    $(".ViewerVideo").css({
      width: "80%",
      "max-height": "80%",
      top: "0",
      right: "0",
      left: "0",
    });
    $(".ViewerVideo").draggable({ disabled: true });
    $(".ViewerVideo").animate({ height: "55%", "max-height": "80%" }, 1);
    $(".ViewerVideo").css("height", "unset");
    this.zoomVal = 0;
    this.viewerPosition = this.viewerPosition + 1;
    if (this.viewerPosition < this.ImageIndex) {
      //Video
      let new_type = this.CheckRessourceType(this.viewerPosition);

      //Video
      if (new_type == "VIDEO") {
        var url = $("#" + this.viewerPosition + " source").attr("src");

        $(".ViewerVideo > source").attr("src", url);
        $(".ViewerVideo")[0].load();

        //Run transition animation
        this.transitionRight(this.transition, "ViewerVideo");

        $(".ViewerImage").hide();
        $(".ViewerVideo").show();
        $(".GalleryViewer").show();
      } else {
        //Images
        var url = document.getElementById(this.viewerPosition).src;

        url = this.checkPreviewState(url);

        $(".ViewerImage").attr("src", url);

        // Check the aspect ratio and set params
        this.setParamsByRatioOfImage(url);

        //Run transition animation
        this.transitionRight(this.transition, "ViewerImage");
        $(".ViewerImage").show();
        $(".ViewerVideo").hide();
      }
    } else {
      this.viewerPosition = this.viewerPosition - 1;
    }
  }

  transitionLeft(transition, classname) {
    if (transition == "opacity") {
      $("." + classname).css("opacity", "0.4");
      $("." + classname).animate({ opacity: "1" }, 200);
    }
    if (transition == "zoomin") {
      $("." + classname).css("width", "40%");
      $("." + classname).animate({ width: "80%" }, "slow");
    }
    if (transition == "slide") {
      $("." + classname).css("left", "-500px");
      $("." + classname).animate({ left: "0" }, 200);
    }
    if (transition == "slideAndZoom") {
      $("." + classname).css("left", "-500px");
      $("." + classname).animate({ left: "0" }, 200);
      $("." + classname).css("left", "500px");
      $("." + classname).css("opacity", "0.4");
      $("." + classname).css("width", "150px");
      $("." + classname).animate({
        left: "0",
        opacity: "1",
        width: "80%",
      });
    }
    if (transition == "slideZoom") {
      $("." + classname).css("left", "-500px");
      $("." + classname).css("opacity", "0.4");
      $("." + classname).css("width", "150px");
      $("." + classname).animate({
        left: "0",
        opacity: "1",
        width: "80%",
      });
    }
    if (transition == "ZoominFast") {
      $("." + classname).css("width", "0");
      $("." + classname).animate({
        width: "100%",
      });
    }
    if (transition == "bounce") {
      $("." + classname).css("top", "-100");
      $("." + classname).animate({ top: "100" }, 150);
      $("." + classname).animate({ top: "-100" }, 150);
      $("." + classname).animate({ top: "100" }, 150);
      $("." + classname).animate({ top: "0" }, 150);
    }
    if (transition == "puffzoom") {
      $("." + classname).css("width", "10%");
      $("." + classname).css("opacity", "0.2");
      $("." + classname).animate({ width: "80%" }, 300);
      $("." + classname).animate({ opacity: "1" }, 100);
    }
  }

  transitionRight(transition, classname) {
    if (transition == "opacity") {
      $("." + classname).css("opacity", "0.4");
      $("." + classname).animate({ opacity: "1" }, 200);
    }
    if (transition == "zoomin") {
      $("." + classname).css("width", "40%");
      $("." + classname).animate({ width: "80%" }, "slow");
    }
    if (transition == "slide") {
      $("." + classname).css("left", "500px");
      $("." + classname).animate({ left: "0" }, 200);
    }
    if (transition == "slideAndZoom") {
      $("." + classname).css("left", "500px");
      $("." + classname).animate({ left: "0" }, 200);
      $("." + classname).css("left", "500px");
      $("." + classname).css("opacity", "0.4");
      $("." + classname).css("width", "150px");
      $("." + classname).animate({
        left: "0",
        opacity: "1",
        width: "80%",
      });
    }
    if (transition == "slideZoom") {
      $("." + classname).css("left", "500px");
      $("." + classname).css("opacity", "0.4");
      $("." + classname).css("width", "150px");
      $("." + classname).animate({
        left: "0",
        opacity: "1",
        width: "80%",
      });
    }
    if (transition == "ZoominFast") {
      $("." + classname).css("width", "0");
      $("." + classname).animate({
        width: "100%",
      });
    }
    if (transition == "bounce") {
      $("." + classname).css("top", "-100");
      $("." + classname).animate({ top: "100" }, 150);
      $("." + classname).animate({ top: "-100" }, 150);
      $("." + classname).animate({ top: "100" }, 150);
      $("." + classname).animate({ top: "0" }, 150);
    }
    if (transition == "puffzoom") {
      $("." + classname).css("width", "10%");
      $("." + classname).css("opacity", "0.2");
      $("." + classname).animate({ width: "80%" }, 300);
      $("." + classname).animate({ opacity: "1" }, 100);
    }
  }

  setGalleryTransition(getTransition) {
    this.transition = getTransition;
  }
  openImage() {
    if (monoImageView == 1) {
      window.location = monoImageViewURL;
    } else {
      let new_type = this.CheckRessourceType(this.viewerPosition);

      //Video
      if (new_type == "VIDEO") {
        var url = $("#" + this.viewerPosition + " source").attr("src");
        window.location = url;
      } else {
        var url = document.getElementById(this.viewerPosition).src;
        window.location = url;
      }
    }
  }
  zoom() {
    if (this.zoomVal == 1) {
      // Check the aspect ratio and set params
      $(".ViewerVideo").animate(
        {
          width: "80%",
          "max-height": "80%",
          top: "0",
          right: "0",
          left: "0",
        },
        250
      );
      $(".ViewerVideo").css("height", "unset");

      $(".ViewerVideo").draggable({ disabled: true });

      // Check the aspect ratio and set params
      var url = $(".ViewerImage").attr("src");
      this.setParamsByRatioOfImage(url, true);

      $(".ViewerImage").draggable({ disabled: true });
    } else {
      var url = $("#" + this.viewerPosition + " source").attr("src");

      $(".ViewerVideo").animate(
        { width: "130%", right: "-15%", left: "-15%" },
        250
      );
      $(".ViewerVideo").css("max-height", "130%");
      $(".ViewerVideo").css("height", "unset");
      $(".ViewerVideo").css("max-width", "unset");

      $(".ViewerVideo").draggable({ disabled: false, scroll: false });
      $(".ViewerVideo").draggable({ cursor: "pointer" });

      // Check the aspect ratio and set params
      var url = $(".ViewerImage").attr("src");
      this.setParamsByRatioOfImage(url, true);

      $(".ViewerImage").draggable({ disabled: false, scroll: false });
      $(".ViewerImage").draggable({ cursor: "pointer" });
    }
  }
  enableExtraButtons() {
    this.share = 1;
    this.enableViewOriginalPictureVal = 1;
  }
  Share() {
    $(".sharebuttons").toggle();
    $(".sharebuttons").css("height", "0px");
    $(".sharebuttons").animate({ height: "60px" }, "slow");
  }
  shareFacebook() {
    if (monoImageView == 1) {
      var url = document.getElementById(this.viewerPosition).src;
      window.open(
        "https://www.facebook.com/sharer/sharer.php?u=" + monoImageViewURL,
        "_blank"
      );
    } else {
      let new_type = this.CheckRessourceType(this.viewerPosition);

      //Video
      if (new_type == "VIDEO") {
        var url = $("#" + this.viewerPosition + " source").attr("src");
        window.open(
          "https://www.facebook.com/sharer/sharer.php?u=" + url,
          "_blank"
        );
      } else {
        var url = document.getElementById(this.viewerPosition).src;
        window.open(
          "https://www.facebook.com/sharer/sharer.php?u=" + url,
          "_blank"
        );
      }
    }
  }
  shareTwitter() {
    if (monoImageView == 1) {
      window.open(
        "https://twitter.com/intent/tweet?text=" + monoImageViewURL,
        "_blank"
      );
    } else {
      let new_type = this.CheckRessourceType(this.viewerPosition);

      //Video
      if (new_type == "VIDEO") {
        var url = $("#" + this.viewerPosition + " source").attr("src");
        window.open("https://twitter.com/intent/tweet?text=" + url, "_blank");
      } else {
        var url = document.getElementById(this.viewerPosition).src;
        window.open("https://twitter.com/intent/tweet?text=" + url, "_blank");
      }
    }
  }
  shareGetLink() {
    if (monoImageView == 1) {
      const el = document.createElement("textarea");
      el.value = monoImageViewURL;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    } else {
      let new_type = this.CheckRessourceType(this.viewerPosition);

      //Video
      if (new_type == "VIDEO") {
        var url = $("#" + this.viewerPosition + " source").attr("src");
        const el = document.createElement("textarea");
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      } else {
        var url = document.getElementById(this.viewerPosition).src;
        const el = document.createElement("textarea");
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
    }
  }
  setGalleryStyle(style) {
    this.galleryStyle = style;
  }

  CheckRessourceType(id) {
    return document.getElementById(id).tagName;
  }

  /*
   * Get aspect ratio of an Image and set parameters to .ViewerImage
   */
  setParamsByRatioOfImage(url, zoom = false) {
    var tmpImg = new Image();
    tmpImg.src = url;
    var self = this;
    $(tmpImg).on("load", function () {
      var widthValue = tmpImg.width;
      var heightValue = tmpImg.height;
      // For Debug
      //alert(widthValue+"x"+heightValue);

      let calc = widthValue / heightValue;

      if (zoom) {
        if (self.zoomVal == 0) {
          if (calc < 1.25) {
            $(".ViewerImage").animate({ height: "130%" }, "slow");
            $(".ViewerImage").css("max-height", "130%");
            self.zoomVal = 1;
          } else {
            $(".ViewerImage").animate(
              { width: "130%", right: "-15%", left: "-15%" },
              250
            );
            $(".ViewerImage").css("max-height", "130%");
            $(".ViewerImage").css("height", "unset");
            $(".ViewerImage").css("max-width", "unset");
            self.zoomVal = 1;
          }
        } else {
          if (calc < 1.25) {
            $(".ViewerImage").animate(
              { "max-height": "80%", top: "0", left: "0" },
              "slow"
            );
            self.zoomVal = 0;
          } else {
            $(".ViewerImage").animate(
              {
                width: "80%",
                "max-height": "80%",
                top: "0",
                right: "0",
                left: "0",
              },
              250
            );
            $(".ViewerImage").css("height", "unset");

            self.zoomVal = 0;
          }
        }
      } else {
        if (calc < 1.25) {
          $(".ViewerImage").css("width", "unset");
        } else {
          $(".ViewerImage").css("object-fit", "contain");
        }
      }
    });
  }
  /*
   * Call all Settings Function
   */
  setAllSettings() {
    enableExtraButtons();
    enableDoubleClick();
  }

  // Add Galery Slide Support
  initGallerySlide(speedValue, animationValue, dotsValue) {
    this.speed = speedValue;
    this.animation = animationValue;
    this.dots = dotsValue;
    // For each image in .GallerySlide div, add to gallerySlideArray and hide
    // the Images abouve the first one.
    var self = this;
    $(".GallerySlide img").each(function (index) {
      gallerySlideArray.push($(this));
      if (gallerySlideArray.length > 2) {
        $(this).hide();
        if (this.animation == false) {
          $(this).css({ right: "0%" });
        }
      } else {
        $(this).css({ right: "0%" });

        // fill right/left arrows black if the class addFill was added
        const classes = $(this).attr("class");
        if (classes.includes("addFill")) {
          $(".nav_left").addClass("fillForGallerySlide");
          $(".nav_right").addClass("fillForGallerySlide");
        }
      }

      if (self.dots) {
        //Add dots to gallery slide
        $(".GallerySlideDots").append('<p class="dot"></p>');

        // select bottom Dots
        let id = self.galleryPos;
        self.selectDot(id);
      }
    });
  }

  selectDot(id) {
    if (this.dots) {
      $(".GallerySlideDots .dot").css({
        "background-color": "rgb(173, 173, 173)",
      });
      $(".GallerySlideDots .dot:nth-of-type(" + id + ")").css({
        "background-color": "rgb(49, 49, 49);",
      });
    }
  }

  // Slide Left
  gallerySlideLeft() {
    if (this.galleryPos <= 1) {
    } else {
      if (this.animation == true) {
        $(gallerySlideArray[this.galleryPos]).animate(
          { right: "-100%" },
          this.speed
        );
      } else {
        $(gallerySlideArray[this.galleryPos]).hide();
      }

      this.galleryPos--;

      // fill right/left arrows black if the class addFill was added
      const classes = $(gallerySlideArray[this.galleryPos]).attr("class");
      if (classes.includes("addFill")) {
        $(".nav_left").addClass("fillForGallerySlide");
        $(".nav_right").addClass("fillForGallerySlide");
      } else {
        $(".nav_left").removeClass("fillForGallerySlide");
        $(".nav_right").removeClass("fillForGallerySlide");
      }

      $(gallerySlideArray[this.galleryPos]).show();

      // select bottom Dots
      this.selectDot(this.galleryPos);

      if (this.animation == true) {
        $(gallerySlideArray[this.galleryPos]).animate(
          { right: "0%" },
          this.speed
        );
      }
    }
  }

  // Slide Right
  gallerySlideRight() {
    if (this.galleryPos == gallerySlideArray.length - 1) {
    } else {
      if (this.animation == true) {
        $(gallerySlideArray[this.galleryPos]).animate(
          { right: "100%" },
          this.speed
        );
      } else {
        $(gallerySlideArray[this.galleryPos]).hide();
      }

      this.galleryPos++;

      // fill right/left arrows black if the class addFill was added
      const classes = $(gallerySlideArray[this.galleryPos]).attr("class");
      if (classes.includes("addFill")) {
        $(".nav_left").addClass("fillForGallerySlide");
        $(".nav_right").addClass("fillForGallerySlide");
      } else {
        $(".nav_left").removeClass("fillForGallerySlide");
        $(".nav_right").removeClass("fillForGallerySlide");
      }

      $(gallerySlideArray[this.galleryPos]).show();

      // select bottom Dots
      this.selectDot(this.galleryPos);

      if (this.animation == true) {
        $(gallerySlideArray[this.galleryPos]).animate(
          { right: "0%" },
          this.speed
        );
      }
    }
  }

  // Function to break a image into a div on a responsive website
  initMove() {
    if (this.disabelInitMove == false) {
      $("move").each(function (index) {
        const id = $(this).attr("id");
        const media = $(this).attr("mediaquery");
        var width = $(window).width();
        if (width < media) {
          const elementID = id.split("move_");
          if (!$("unmove#un" + id).length) {
            $("#element_" + elementID[1]).after(
              "<unmove id=un" + id + " mediaquery=" + media + "></unmove>"
            );
          }
          $("#element_" + elementID[1]).appendTo("#" + id);
        }
      });

      $("unmove").each(function (index) {
        const id = $(this).attr("id");
        const media = $(this).attr("mediaquery");
        var width = $(window).width();
        if (width > media) {
          const elementID = id.split("unmove_");
          $("#element_" + elementID[1]).appendTo("#" + id);
        }
      });

      var self = this;

      $(window).resize(function () {
        self.initMove();
        self.disabelInitMove = true;
        setTimeout(function () {
          self.disabelInitMove = false;
        }, 400);
      });
    }
  }

  // function to use html istead of js to init the Gallery
  initGallery() {
    // Adds images and a headline to the Gallery

    if (this.galleryStyle == "tiles") {
      className = "tiles";
    }
    if (this.galleryStyle == "full") {
      className = "full";
    }
    if (this.galleryStyle == "center") {
      className = "center";
    }
    if (this.galleryStyle == "Circles") {
      className = "Circles";
    }
    if (this.galleryStyle == "mosaic") {
      className = "mosaic";
    }

    if (className != "mosaic") {
    } else {
      $(".Gallery").hide();
    }

    var self = this;

    $(".addToGallery").each(function () {
      $(this).attr("id", self.ImageIndex);
      $(this).addClass("addedToGallery");
      self.ImageIndex++;
    });

    $(".Gallery img,.Gallery video").each(function (index) {
      // add id and onClick to images/Videos
      $(this).attr("id", self.ImageIndex);
      $(this).attr("class", className);
      $(this).attr("onClick", "JavaScriptGallery.openViewer(this.id);");
      self.ImageIndex++;
    });

    this.addPlayer();
  }

  //Add Listner for keydown event ESCAPE

  enableKeydownESC() {
    $(document).keydown(function (e) {
      // ESCAPE key pressed
      if (e.keyCode == 27) {
        this.closeViewer();
      }
    });
  }

  //Function for debug information

  Debug() {
    const output = {
      added: this.added,
      ImageIndex: this.ImageIndex,
      viewerPosition: this.viewerPosition,
      transition: this.transition,
      enableViewOriginalPictureVal: this.enableViewOriginalPictureVal,
      zoomVal: this.zoomVal,
      share: this.share,
      monoImageView: monoImageView,
      monoImageViewURL: monoImageViewURL,
      backgroundcolor: this.backgroundcolor,
      galleryStyle: this.galleryStyle,
      AutoWidth: AutoWidth,
    };

    console.log(output);
  }
}

JavaScriptGallery = new JavaScriptGallery();

$(document).ready(function () {
  for (i = 0; i <= 30; i++) {
    array[i] = 0;
  }

  $(".galleryJS").click(function () {
    if ($(this).hasClass("addToGallery")) {
      JavaScriptGallery.openViewer($(this).attr("id"));
    } else {
      url = $(this).attr("src");
      if (url == null && $(this).find("source").length > 0) {
        var url = $(this).find("source").attr("src");

        JavaScriptGallery.addImageViewer();

        $(".ViewerVideo > source").attr("src", url);
        $(".ViewerVideo")[0].load();

        $(".ViewerImage").hide();
        $(".ViewerVideo").show();
        $(".GalleryViewer").show();

        if ($(this).hasClass("addedToGallery")) {
          $(".Arrowright").show();
          $(".ArrowLeft").show();
        } else {
          $(".Arrowright").hide();
          $(".ArrowLeft").hide();
        }
        monoImageView = 1;
        monoImageViewURL = url;
      } else {
        JavaScriptGallery.addImageViewer();
        $(".ViewerImage").attr("src", url);
        $(".GalleryViewer").show();
        if ($(this).hasClass("addedToGallery")) {
          $(".Arrowright").show();
          $(".ArrowLeft").show();
        } else {
          $(".Arrowright").hide();
          $(".ArrowLeft").hide();
        }
        $(".ViewerImage").show();
        $(".ViewerVideo").hide();
        monoImageView = 1;
        monoImageViewURL = url;
      }
    }
  });
});

$(window).on("resize", function () {
  if (AutoWidth == 1) {
    this.GalleryWidth = $(".Gallery").width();

    if (this.GalleryWidth > 1920) {
      galleryWidth4 = 300;
    }
    if (this.GalleryWidth < 1920) {
      galleryWidth4 = this.GalleryWidth / 5 - 20;
    }
    if (this.GalleryWidth < 1400) {
      galleryWidth4 = this.GalleryWidth / 4 - 20;
    }
    if (this.GalleryWidth < 1024) {
      galleryWidth4 = this.GalleryWidth / 3 - 20;
    }
    if (this.GalleryWidth < 786) {
      galleryWidth4 = this.GalleryWidth / 2 - 20;
    }
    if (this.GalleryWidth < 450) {
      galleryWidth4 = this.GalleryWidth / 1 - 20;
    }

    $(".Gallery img").width(galleryWidth4);
  }

  if (className == "mosaic") {
    JavaScriptGallery.mosaic();
  }
});

$(document).ready(function () {
  if (AutoWidth == 1) {
    this.GalleryWidth = $(".Gallery").width();

    if (this.GalleryWidth > 1920) {
      galleryWidth4 = 300;
    }
    if (this.GalleryWidth < 1920) {
      galleryWidth4 = this.GalleryWidth / 5 - 20;
    }
    if (this.GalleryWidth < 1400) {
      galleryWidth4 = this.GalleryWidth / 4 - 20;
    }
    if (this.GalleryWidth < 1024) {
      galleryWidth4 = this.GalleryWidth / 3 - 20;
    }
    if (this.GalleryWidth < 786) {
      galleryWidth4 = this.GalleryWidth / 2 - 20;
    }
    if (this.GalleryWidth < 450) {
      galleryWidth4 = this.GalleryWidth / 1 - 20;
    }

    $(".Gallery img").width(galleryWidth4);
  }

  if (className == "mosaic") {
    JavaScriptGallery.mosaic();
  }
});
