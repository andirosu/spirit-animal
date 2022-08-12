import $ from "jquery";

$(window).on('load',function () {
  $( ".loading-mask" ).fadeOut(1000, function() {
    $( ".loading-mask" ).remove();
    $("body").toggleClass('loading');
  });
});

window.map = {
  1: {
    1: {
      1: {
        key: "Relaxare + Oraș + Dimineața", value: 'pisica', text: "o Pisica"
      }, 2: {
        key: "Relaxare + Oraș + La apus", value: 'porumbel', text: "un Porumbel"
      }, 3: {
        key: "Relaxare + Oraș + Noaptea", value: 'bufnita', text: 'o Bufnita'
      }
    }, 2: {
      1: {
        key: "Relaxare + Pădure + Dimineața", value: 'cerb', text: 'un Cerb'
      }, 2: {
        key: "Relaxare + Pădure + La apus", value: 'Bursuc', text: 'un Bursuc'
      }, 3: {
        key: "Relaxare + Pădure + Noaptea ", value: 'bufnita', text:'o Bufnita'
      }
    }, 3: {
      1: {
        key: "Relaxare + Șosea + Dimineața", value: 'randunica', text:'o Randunica'
      }, 2: {
        key: "Relaxare + Șosea + La apus", value: 'calut', text:'un Calut'
      }, 3: {
        key: "Relaxare + Șosea + Noaptea", value: 'bufnita', text: 'o Bufnita'
      }
    }
  }, 2: {
    1: {
      1: {
        key: "Aventură + Oraș + Dimineața", value: 'catel', text:'un Catel'
      }, 2: {
        key: "Aventură + Oraș + La apus", value: 'veverita', text:'o Veverita'
      }, 3: {
        key: "Aventură + Oraș + Noaptea", value: 'raton', text:'un Raton'
      }
    }, 2: {
      1: {
        key: "Aventură + Pădure + Dimineața", value: 'iepure', text:'un Iepure'
      }, 2: {
        key: "Aventură + Pădure + La apus", value: 'vulpe', text:'o Vulpe'
      }, 3: {
        key: "Aventură + Pădure + Noaptea ", value: 'lup', text:'un Lup'
      }
    }, 3: {
      1: {
        key: "Aventură + Șosea + Dimineața", value: 'antilopa', text:'o Antilopa'
      }, 2: {
        key: "Aventură + Șosea + La apus", value: 'calut', text:'un Calut'
      }, 3: {
        key: "Aventură + Șosea + Noaptea", value: 'ponei', text:'un Ponei'
      }
    }
  }, 3: {
    1: {
      1: {
        key: "Explorare + Oraș + Dimineața", value: 'catel', text:'un Catel'
      }, 2: {
        key: "Explorare + Oraș + La apus", value: 'veverita', text:'o Veverita'
      }, 3: {
        key: "Explorare + Oraș + Noaptea", value: 'raton', text:'un Raton'
      }
    }, 2: {
      1: {
        key: "Explorare + Pădure + Dimineața", value: 'caprioara', text:'o Caprioara'
      }, 2: {
        key: "Explorare + Pădure + La apus", value: 'vulpe', text:'o Vulpe'
      }, 3: {
        key: "Explorare + Pădure + Noaptea", value: 'liliac', text: 'un Liliac'
      }
    }, 3: {
      1: {
        key: "Explorare + Șosea + Dimineața", value: 'antilopa', text:'o Antilopa'
      }, 2: {
        key: "Explorare + Șosea + La apus", value: 'calut', text:'un Calut'
      }, 3: {
        key: "Explorare + Șosea + Noaptea", value: 'unicorn', text:'un Unicorn'
      }
    }
  }
}
window.MODE = 'dev'

$(form).on('submit', function (e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());

  if (Object.keys(data).length !== 9) {
    window.alert('alo, inputuri!');
    return false;
  }
  data.apikey  ="722b8d2f1f8fedc321b06c4813e215d3-us6";
  var isRacoonVisible = false;
  var $form = $(form);

  var formdata = new URLSearchParams(data).toString();

  debugger;
  if(window.MODE !== 'dev') {
    $.ajax({
      type: "POST",
      url: $form.attr('action'),
      data: formdata,
      cache: false,
      dataType: 'jsonp',
      // contentType: "application/json; charset=utf-8",

      error: function (err) {
        console.log('error');
        console.log(err)
      },
      success: function (data) {
        console.log(data);
        if (data.euid != "success") {
          console.log('Error: ' + data.msg);
        } else {
          console.log("Success");
          isRacoonVisible = true;
          // $($form).find("div#subscribe-result").html("<p class='success-message'>Almost finished... We need to confirm your email address. To complete the subscription process, please click the link in the email we just sent you!</p>");
          // setTimeout(function() {  $($form).find("div#subscribe-result").hide(); }, 7000);
        }
      }
    });
  }else{
    isRacoonVisible = true;
  }
  if(isRacoonVisible){

  var image_name = window.map[data.grupa1][data.grupa2][data.grupa3].value;
  var animal_name = window.map[data.grupa1][data.grupa2][data.grupa3].text;

  var img = $('<img />', {
    id: 'spirit', class: 'img-fluid', src: "/quiz/" + image_name + '.png', alt: image_name
  });

  img.attr('id', 'spirit');
  img.attr('style','max-width:375px');
  img.appendTo($('#valueInput'));

  $("#valueText").text(animal_name);
  $(".surpriza").show();

  }



});


window.fbShare = function () {
  let u = $('#spirit').attr('src');
  let t = "Am ca spirit animal:" + $("#valueText").text() + "!";
  window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(u) + '&quote=' + encodeURIComponent(t), 'sharer', 'toolbar=0,status=0,width=626,height=436');
  return false;
}
const shareButton = document.querySelector('.share-button');
const shareDialog = document.querySelector('.share-dialog');
const closeButton = document.querySelector('.close-button');

shareButton.addEventListener('click', event => {
  if (navigator.share) {
    navigator.share({
      title: 'WebShare API Demo', url: 'https://codepen.io/ayoisaiah/pen/YbNazJ'
    }).then(() => {
      console.log('Thanks for sharing!');
    })
      .catch(console.error);
  } else {
    shareDialog.classList.add('is-open');
  }
});

closeButton.addEventListener('click', event => {
  shareDialog.classList.remove('is-open');
});
