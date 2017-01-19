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
});

