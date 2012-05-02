$.fn.paginate = function(options) {
          var options = jQuery.extend({
               content: 'TBODY TR',
               limit: 5
          },options);

     return this.each(function() {

          var page = {};
               page.parent = $(this),
               page.content = (page.parent.is('TABLE')) ? page.parent.find(options.content) : page.parent.children(options.content),
               page.total = Math.ceil(page.content.size() / options.limit),
               page.display = page.content.css('display'),
               page.prev = 0,
               page.next = 2;

          page.content.slice(options.limit).css('display', 'none').addClass('ui-helper-hidden');

          $(document.createElement("DIV")).addClass("link-container")[(page.parent.is('TABLE')) ? 'insertAfter' : 'appendTo'](this);

          page.linkContainer = (page.parent.is('TABLE')) ? page.parent.next('.link-container:first') : page.parent.find('.link-container:first');

         $(document.createElement("A")).addClass("pagination-link previous ui-state-default").attr('href', 'previous').attr('title', 'Previous page').attr('rel', 'nofollow').text('<').appendTo(page.linkContainer);

          for(var num=0;  num < page.total;   num++){
               var offset = num + 1,
                     min = (offset * options.limit) - (options.limit),
                     max = (offset * options.limit);

               $(document.createElement("A")).addClass("pagination-link numeric ui-state-default").attr('href', offset).attr('title', 'Page '+offset+'').attr('rel', 'nofollow').text(offset).appendTo(page.linkContainer);

               page[offset] = page.content.slice(min, [max]);
          };

          $(document.createElement("A")).addClass("pagination-link next ui-state-default").attr('href', 'next').attr('title', 'Next page').attr('rel', 'nofollow').text('>').appendTo(page.linkContainer);

          page.wraps =  page.linkContainer.find('.paginationWrap');
          page.anchors = page.linkContainer.find('A');

          page.anchors.bind('mouseenter mouseleave', function(e){

               this.self = $(this);
               (e.type === 'mouseenter') ? this.self.addClass('ui-state-hover') : this.self.removeClass('ui-state-hover');
           }).eq(1).addClass('ui-state-active');

         page.anchors.bind('click', function(e){
               e.preventDefault();

               if($(this).is('.ui-state-active')){
                    return false;
               }

               this.siblings = $(this).siblings('.ui-state-active:first');

               if($(this).is('.previous')) {

                    if(page.prev === 0){
                         return false;
                    };

                    this.link = $(this).siblings('A[href= ' + page.prev + ']');
                    this.link.add(this.siblings).toggleClass('ui-state-active');

                    page.content.css('display', 'none').addClass('ui-helper-hidden');
                    page[page.prev].css('display', page.display).removeClass('ui-helper-hidden');

                    page.prev--,
                    page.next--;

               } else if($(this).is('.next')) {

                    if(page.next === (page.total + 1)){
                         return false;
                    };

                    this.link = $(this).siblings('A[href= ' + page.next + ']');
                    this.link.add(this.siblings).toggleClass('ui-state-active');

                    page.content.css('display', 'none').addClass('ui-helper-hidden');
                    page[page.next].css('display', page.display).removeClass('ui-helper-hidden');

                    page.prev++,
                    page.next++;

               } else {

                    this.link = $(this);
                    this.link.add(this.siblings).toggleClass('ui-state-active');

                    this.offset = parseInt(this.link.attr('href'));

                    page.content.css('display', 'none').addClass('ui-helper-hidden');
                    page[this.offset].css('display', page.display).removeClass('ui-helper-hidden');

                    page.prev = this.offset - 1,
                    page.next = this.offset + 1;
               }

           });
           return this;
      });
};