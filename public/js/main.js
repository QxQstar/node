/**
 * Created by star on 2017/1/10.
 */
$(function(){
    $('.del')
        .click(function(e){
            var $target,id,tr;
            $target= $(e.target);
            id = $target.attr('data-id');
            tr = $target.parents('tr');
            $.ajax({
                type:'DELETE',
                url:'/admin/movie/list?id='+id,
                success:function(result){
                    if(result.status === 1){
                        if(tr.length > 0){
                            tr.remove();
                        }
                    }
                }
            });
        });

    $("#douban").blur(function(){
        var douban = $(this);
        var id = douban.val();
        if(id){
            $.ajax({
                url:'https://api.douban.com/v2/movie/subject/'+id,
                cache:true,
                type:'get',
                dataType:'jsonp',
                crossDomain:true,
                jsonp:'callback',
                success:function(data){
                    $('#movieName').val(data.title);
                    $('#directorName').val(data.directors[0].name);
                    $('#makeCountry').val(data.countries[0]);
                    $('#time').val(data.year);
                    $('#pic').val(data.images.large);
                    $('#brief').val(data.summary);

                }
            });
        }

    });
});

