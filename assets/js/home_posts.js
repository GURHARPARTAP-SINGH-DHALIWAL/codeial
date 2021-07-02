{   let showNoti=function(data)
    {
        if(data.flash.success && data.flash.success.length>0){
            new Noty({
                    type: 'success',
                    layout: 'topRight',
                    text: data.flash.success,
                    theme:'relax',
                    timeout:1500
                }).show();
        }
        if(data.flash.error && data.flash.error.length>0){
            new Noty({
                    theme:'relax',
                    type: 'error',
                    layout: 'topRight',
                    text: data.flash.error,
                    timeout:1500
                }).show();
        }
          
    }
    //Apply to all functions
    let deleteAllComments=function(){
      let links=document.querySelectorAll('.comment-delete');
      for( i of links)
      {  
        //   console.log(i);
          deleteComment(i);
      }
    }
    let deleteAll=function()
    {
        let deletButtons=document.querySelectorAll('.delete-post-button');
        for(i of deletButtons)
        {  
            //  console.log(i);
            deletePost(i);

        }
    }

    let comentAll=function()
    {
        let posts=document.querySelectorAll('.post');
        for(i of posts)
        {
            commentCreate($(' .comment-form',i),i);
        }
    }
    //Comment AJAX
    let commentCreate=function(commentForm,post)
    {    
        console.log("hello");
        console.log(commentForm);
        console.log("hello");
        console.log($(commentForm));
        $(commentForm).submit(function(e){
            e.preventDefault();
           $.ajax({
            type:'post',
            url:'/comment/create',
            data:commentForm.serialize(),
            success:function(data){
                // console.log(data);
                let newComment=newCommentDOM(data.data.comment);
                // console.log(  $(' .comment-list',post));
                $(' .comment-list',post).prepend(newComment);
                deleteComment($(` .comment-delete`,newComment));
                // console.log($(` .comment-delete`,newComment));
                showNoti(data);
                $(commentForm)[0].reset();
            },
            error:function(err)
            {
                console.log(error.responseText);
            }
           });
        });
    }
    let deleteComment=function(link)
    {      //Use & in front of it
        
         $(link).click(function(e){
             e.preventDefault();
             $.ajax({
                 type:'get',
                 url:$(link).prop('href'),
                 success:function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                    // console.log( $(`#comment-${data.data.comment_id}`));
                    showNoti(data);
                 },
                 error:function(err)
                 {
                     console.log(err.responseText);
                 }
             });
         });
    }

    //POST AJAX
   let createPost=function(){
   // to prevent reloading we are using ajax to collect form data 
   let newPostFrom=$('#post-form');
   newPostFrom.submit(function(e){
       e.preventDefault();
       $.ajax({
           type:'post',
           url:'/post/create',
           data:newPostFrom.serialize(),
           success:function(data)
           {   
               //New Post will conatina html object correspinding to that psot
               let newPost=newPostDOM(data.data.post);
               deletePost($(' .delete-post-button',newPost)); // passing only class without newPost will not work also put space
               commentCreate($(' .comment-form',newPost),newPost);
             
             
            //    console.log($(' .delete-post-button',newPost));
            //    console.log($(' .comment-form',newPost));
               $('#post-list').prepend(newPost);
            //    console.log(data);
               showNoti(data);
               $(newPostFrom)[0].reset();
               
           },
           error:function(error)
           {
               console.log(error.responseText);
           }

           
       });
   });
    }
    let deletePost=function(deletelink)
    {    // delete link will  contain query selecter corresponding to that
        $(deletelink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deletelink).prop('href'),//not /post/delte as it contains the param so prop gives the href
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    showNoti(data);

                } , //gets the data from server 
             error:   function(err){
                 console.log(err.responseText);
             }
            });

        });
    }
     //return post list item
    let newPostDOM=function(i){
        return $(`  <li id="post-${i._id}">
       
            <a class="delete-post-button" href="/post/destroy/${i._id}" style="display: inline;">X</a>
            
    
    <h2>${i.content} By ${i.user.name}</h2>
    <div class="post-comments">
    
    <form action="/comment/create" method="POST" class="comment-form" autocomplete="off" >
    <input type="text" name="comment" id="comment" placeholder="Add Comment" required>
    <input type="hidden" name="post" value="${i._id}">
    <input type="submit" value="Add Comment">
    
    </form>
    
    <h3>Comments</h3>
    <section>
    <ul class="comment-list">
   
    </ul>
    </section>
    </li>
    
    
    `);
    }
    // return comment list item
    let newCommentDOM=function(j)
    {
        return $(`<li id="comment-${j._id}">
        <h4><u>${j.user.name}</u></h4>
        <p>${j.content}
        
        <span>
    
           
                <a href="/comment/destroy/${j._id}" class="comment-delete" style="display: inline;">delete</a>
                
        </span>
        
        
        </p>
        </li>`);
    }

   
    createPost();
    deleteAll();
    comentAll();
    deleteAllComments();

    
}
// See in create post there is always one form to be taken care of 
// so we call the function and it detects the click of it
// but this is not the case in delete
// we have to call it after every post is created
//but on reloading everything is rendered again so we have to call for every delete link again