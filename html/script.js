$(document).ready(function() {
  $(window).resize(refreshAsides);
  refreshAsides();

  $(".dismiss").show().click(function() {
    $(".in-progress").hide();
    refreshAsides();
  });

  // Since we may not have the height correct for the images, adjust the asides
  // too when an image is loaded.
  $('img').load(function() {
    refreshAsides();
  });

  // On the off chance the browser supports the new font loader API, use it.
  if (document.fontloader) {
    document.fontloader.notifyWhenFontsReady(function() {
      refreshAsides();
    });
  }
});

function refreshAsides() {
  // TODO(bob): What should the cutoff be?
  if ($(document).width() > 640) {
    sidebarAsides();
  } else {
    inlineAsides();
  }
}

// Moves the asides into the main content column.
function inlineAsides() {
  $(".content").removeClass("sidebar");
  $("aside").removeClass("sidebar");
}

// Moves the asides to a second column on the right.
function sidebarAsides() {
  $(".content").addClass("sidebar");
  $("aside").each(function() {
    var aside = $(this);

    // Find the span the aside should be anchored next to.
    var name = aside.attr("name");
    var span = $("span[name='" + name + "']");
    if (span == null) {
      window.console.log("Could not find span for '" + name + "'");
      return;
    }

    aside.addClass("sidebar");
    aside.offset({top: span.position().top + 21});
  });
}