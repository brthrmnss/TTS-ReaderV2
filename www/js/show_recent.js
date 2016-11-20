
$( document ).ready(function() {
    console.log( "ready" );



    function P(){

        var p = this;
        var self = p;
        p.getRecentList = function getRecentList() {
            var list = Cookies.getJSON('epub_recent_list')
            $.each(list, function unescapeName(k,v) {
                v.orignalName = v.name;
                v.name = unescape(v.name)
            })
            if ( list == null ) list = [];
            return list;
        }
        p.onRecentList = function onRecentList() {
             var y = self.getRecentList()
            // console.log(y)

            $('#col2_recentList').html('' +
                '' +
                '<div id="users">' +

                '<input class="search" placeholder="Search" />' +
                '<button class="sort" data-sort="name">' +
                'Sort' +
                '</button>' +

                '<ul class="list"></ul>' +

                '</div>')

            var options = {
                valueNames: [ 'name', 'born',
                    { name: 'url', attr: 'href' },
                ],
                item: '<li>' +
                '<span class="name"></span> ' +
                '<a href="http://javve.com" class="link url">link</a>'+
                '<p class="born"></p>' +
                '</li>'
            };

            var values = [
                {
                    name: 'Jonny Strömberg',
                    born: 1986
                },
                {
                    name: 'Jonas Arnklint',
                    born: 1985
                },
                {
                    name: 'Martina Elm',
                    born: 1986
                }
            ];

            var userList = new List('users', options, y);

            /* userList.add({
             name: 'Gustaf Lindqvist',
             born: 1983
             });*/
        }
    }

    var p = new P();
    // var list = p.getRecentList();
    p.onRecentList();
});