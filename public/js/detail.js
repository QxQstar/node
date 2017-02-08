/**
 * Created by star on 2017/2/8.
 */
$('.comment').click(function(e){
    var target,toId,commentId,form;
    form = $('form');
    target = $(this);
    toId = target.attr('data-tid');
    commentId = target.attr('data-cid');
    if($('#toId').length > 0){
        $('#toId').val(toId);
    }else{
        $('<input/>')
            .attr({
                type:'hidden',
                id:'toId',
                name:'tid',
                value:toId
            })
            .appendTo(form);
    }
    if($('#cId').length > 0){
        $('#cId').val(commentId);
    }else{
        $('<input/>')
            .attr({
                type:'hidden',
                id:'cId',
                name:'cid',
                value:commentId
            })
            .appendTo(form);
    }

});