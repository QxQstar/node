/**
 * Created by star on 2017/2/9.
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
                url:'/admin/catetory/list?id='+id,
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